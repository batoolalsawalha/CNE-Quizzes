Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { 
    $_.Name -eq 'AsTask' -and 
    $_.GetParameters().Count -eq 1 -and 
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' 
} | Select-Object -First 1

function Await($asyncOp, $type) {
    $m = $asTaskGeneric.MakeGenericMethod($type)
    $netTask = $m.Invoke($null, @($asyncOp))
    $netTask.Wait(-1) | Out-Null
    return $netTask.Result
}

$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and
    $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction'
} | Select-Object -First 1

function AwaitAction($asyncAction) {
    $netTask = $asTaskAction.Invoke($null, @($asyncAction))
    $netTask.Wait(-1) | Out-Null
}

[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType = WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
$langEn = New-Object Windows.Globalization.Language('en-US')
$ocrEn = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($langEn)

function InspectFile($folder, $filter, $maxPages=2) {
    $dir = Join-Path "qu" $folder
    $file = Get-ChildItem -Path $dir -Filter $filter -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $file) { Write-Host "Not found: $folder / $filter"; return }
    $storageFile = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($file.FullName)) ([Windows.Storage.StorageFile])
    $pdf = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) ([Windows.Data.Pdf.PdfDocument])
    Write-Host "`n========================================================"
    Write-Host "FOLDER: $folder | FILE: $($file.Name) | PAGES: $($pdf.PageCount)"
    Write-Host "========================================================"
    $limit = [Math]::Min($pdf.PageCount, $maxPages)
    for ($i = 0; $i -lt $limit; $i++) {
        $p = $pdf.GetPage($i)
        $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
        AwaitAction ($p.RenderToStreamAsync($stream))
        $dec = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $bmp = Await ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $res = Await ($ocrEn.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
        Write-Host "--- PAGE $($i+1) ---"
        Write-Host ($res.Text.Substring(0, [Math]::Min(500, $res.Text.Length)) -replace '\r?\n', ' ')
    }
}

InspectFile "معمارية" "*Mid Solutions*.pdf" 2
InspectFile "الكترونيات" "*Mid electronics*.pdf" 2
InspectFile "ماشين" "*Machines TEST BANK*.pdf" 2
InspectFile "اتصالات" "*Mid T1.2023*.pdf" 2
InspectFile "كونترول" "*Mid 2023-2024 Solved*.pdf" 2
InspectFile "اسمبلي" "*assembly-mid 2020*.pdf" 2
