$c = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)
$c = $c -replace '(?m)^\s*\r?\n\s*\r?\n\s*\r?\n\s*<!-- Bottom of the Page', ([Environment]::NewLine + '    <!-- Bottom of the Page')
[System.IO.File]::WriteAllText('index.html', $c, [System.Text.Encoding]::UTF8)
Write-Output "Cleaned blank lines."
