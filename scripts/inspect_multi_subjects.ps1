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
[Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null

$langEn = New-Object Windows.Globalization.Language('en-US')
$ocrEn = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($langEn)

function ReadPdfPattern($pattern) {
    $item = Get-ChildItem -Path "qu" -Filter $pattern -Recurse | Select-Object -First 1
    if (-not $item) { return }
    $storageFile = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($item.FullName)) ([Windows.Storage.StorageFile])
    $pdf = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) ([Windows.Data.Pdf.PdfDocument])
    Write-Host "=================================================="
    Write-Host "File: $($item.Name) | Pages: $($pdf.PageCount)"
    
    for ($i = 0; $i -lt [Math]::Min($pdf.PageCount, 3); $i++) {
        $p = $pdf.GetPage($i)
        $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
        AwaitAction ($p.RenderToStreamAsync($stream))
        $dec = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $bmp = Await ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $res = Await ($ocrEn.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
        Write-Host "--- Page $($i+1) ---"
        Write-Host ($res.Text -replace '\r?\n', ' ')
    }
}

ReadPdfPattern "*Mid cir*.pdf"
ReadPdfPattern "*Data Structuer Mid*.pdf"
ReadPdfPattern "*Diff Med*.pdf"
ReadPdfPattern "*Machines TEST BANK*.pdf"
