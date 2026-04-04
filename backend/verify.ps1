$toolsDir = "$PSScriptRoot\.tools"
$env:JAVA_HOME = "$toolsDir\jdk"
$env:PATH = "$env:JAVA_HOME\bin;$toolsDir\mvn\bin;$env:PATH"

Write-Host "Starting Spring Boot..."
$backendProcess = Start-Process -FilePath "mvn.cmd" -ArgumentList "spring-boot:run" -PassThru

Write-Host "Waiting for port 8080 to be active..."
$portReady = $false
for ($i=0; $i -lt 30; $i++) {
    $conn = Test-NetConnection -ComputerName localhost -Port 8080 -WarningAction SilentlyContinue
    if ($conn.TcpTestSucceeded) {
        $portReady = $true
        break
    }
    Start-Sleep -Seconds 1
}

if (-not $portReady) {
    Write-Host "Backend failed to start."
    exit
}

Write-Host "`nServer active! Testing HTTP Endpoints:`n"

try {
    Write-Host "--> Sending POST Request to save a new Todo"
    $body = @{ title = "Review and submit Todo app"; description = "Final test to ensure 100% completion" } | ConvertTo-Json
    $postResponse = Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/todos" -Body $body -ContentType "application/json"
    $postResponse | ConvertTo-Json

    Write-Host "`n--> Sending GET Request to read all Todos"
    $getResponse = Invoke-RestMethod -Method Get -Uri "http://localhost:8080/api/todos"
    $getResponse | ConvertTo-Json
} catch {
    Write-Host "Error during API calls: $_"
}
