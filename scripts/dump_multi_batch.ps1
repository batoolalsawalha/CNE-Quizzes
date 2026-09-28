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
$langAr = New-Object Windows.Globalization.Language('ar-SA')
$ocrAr = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($langAr)

function DumpPdf($folder, $filter, $lang='en', $start=0, $max=2) {
    $dir = Join-Path "qu" $folder
    $file = Get-ChildItem -Path $dir -Filter $filter -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $file) { Write-Host "Not found: $folder / $filter"; return }
    $storageFile = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($file.FullName)) ([Windows.Storage.StorageFile])
    $pdf = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) ([Windows.Data.Pdf.PdfDocument])
    Write-Host "`n>>> DUMP: $folder / $($file.Name) (Pages: $($pdf.PageCount)) <<<"
    $engine = if ($lang -eq 'ar') { $ocrAr } else { $ocrEn }
    $end = [Math]::Min($pdf.PageCount - 1, $start + $max - 1)
    for ($i = $start; $i -le $end; $i++) {
        $p = $pdf.GetPage($i)
        $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
        AwaitAction ($p.RenderToStreamAsync($stream))
        $dec = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $bmp = Await ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $res = Await ($engine.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
        Write-Host "--- PAGE $($i+1) ---"
        Write-Host $res.Text
    }
}

DumpPdf "معمارية" "*Mid T1*.pdf" 'en' 0 2
DumpPdf "الكترونيات" "*Final Electro*.pdf" 'en' 0 2
DumpPdf "سيركت 2" "*Circuit 2 Mid*.pdf" 'en' 0 2
DumpPdf "فيزياء 2" "*mid term exam 2d Sem 2026*.pdf" 'en' 0 2
DumpPdf "احصاء" "*Final .pdf*" 'en' 0 2
DumpPdf "تقنيات عددية" "*Numerical-final 2*.pdf" 'en' 0 2
DumpPdf "كلاود" "*cloud mid 2*.pdf" 'en' 0 2
DumpPdf "ثقافة" "*أسئلة_الثقافة_الإسلامية*.pdf" 'ar' 0 2
DumpPdf "وطنية" "*Mid 2025*.pdf" 'ar' 0 2
DumpPdf "عسكريه" "*تست بانك عسكرية شامل*.pdf" 'ar' 0 2
DumpPdf "خلفاء" "*اسئلة سنوات ميد اونلاين*.pdf" 'ar' 0 2
DumpPdf "ريادة" "*بنك اسئلة ريادة*.pdf" 'ar' 0 2
