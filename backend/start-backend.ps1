$ErrorActionPreference = "Stop"

$jdkUrl = "https://aka.ms/download-jdk/microsoft-jdk-17.0.10-windows-x64.zip"
$mvnUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"

$toolsDir = "$PSScriptRoot\.tools"
if (-not (Test-Path $toolsDir)) {
    New-Item -ItemType Directory -Path $toolsDir | Out-Null
}

$jdkZip = "$toolsDir\jdk.zip"
$jdkDir = "$toolsDir\jdk"
if (-not (Test-Path "$jdkDir\bin\java.exe")) {
    Write-Host "Downloading portable JDK 17..."
    Invoke-WebRequest -Uri $jdkUrl -OutFile $jdkZip
    Write-Host "Extracting JDK..."
    Expand-Archive -Path $jdkZip -DestinationPath $toolsDir -Force
    # Rename extracted folder to 'jdk'
    $extractedFolder = Get-ChildItem -Path $toolsDir -Directory | Where-Object { $_.Name -like "jdk-17*" }
    Rename-Item -Path $extractedFolder.FullName -NewName "jdk"
}

$mvnZip = "$toolsDir\mvn.zip"
$mvnDir = "$toolsDir\mvn"
if (-not (Test-Path "$mvnDir\bin\mvn.cmd")) {
    Write-Host "Downloading portable Maven 3.9..."
    Invoke-WebRequest -Uri $mvnUrl -OutFile $mvnZip
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $mvnZip -DestinationPath $toolsDir -Force
    $extractedFolder = Get-ChildItem -Path $toolsDir -Directory | Where-Object { $_.Name -like "apache-maven*" }
    Rename-Item -Path $extractedFolder.FullName -NewName "mvn"
}

Write-Host "Setting environment variables..."
$env:JAVA_HOME = "$toolsDir\jdk"
$env:PATH = "$env:JAVA_HOME\bin;$toolsDir\mvn\bin;$env:PATH"

Write-Host "Starting Spring Boot application..."
Set-Location -Path $PSScriptRoot
mvn spring-boot:run
