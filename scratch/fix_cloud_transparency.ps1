Add-Type -AssemblyName System.Drawing

function Clean-Checkerboard($filePath) {
    $fullPath = Resolve-Path $filePath
    $orig = [System.Drawing.Bitmap]::FromFile($fullPath)
    $w = $orig.Width
    $h = $orig.Height
    $clean = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $px = $orig.GetPixel($x, $y)
            # Check if this pixel is part of the Photoshop/canvas checkerboard (gray ~190-210 or white ~230-255)
            # Real cloud pixels are bright white / cream with subtle shading
            # If R, G, B are very close (neutral gray) and brightness is around checkerboard
            $diffRG = [Math]::Abs($px.R - $px.G)
            $diffGB = [Math]::Abs($px.G - $px.B)
            
            # If the pixel is pure gray square (199 or 235 with zero color tint)
            if (($px.R -eq 199 -and $px.G -eq 199 -and $px.B -eq 199) -or 
                ($px.R -eq 235 -and $px.G -eq 235 -and $px.B -eq 235) -or
                ($diffRG -lt 2 -and $diffGB -lt 2 -and (($px.R -ge 195 -and $px.R -le 205) -or ($px.R -ge 230 -and $px.R -le 240)))) {
                $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                # Keep pixel with soft alpha
                $clean.SetPixel($x, $y, $px)
            }
        }
    }
    $orig.Dispose()
    $clean.Save($fullPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $clean.Dispose()
    Write-Host "Cleaned: $filePath"
}

Clean-Checkerboard "assets\images\clouds-cumulus-transparent.png"
Clean-Checkerboard "assets\images\clouds-mist-transparent.png"
