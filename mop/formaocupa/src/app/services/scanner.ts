import { computed, effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerOptions, CapacitorBarcodeScannerScanOrientation, CapacitorBarcodeScannerScanResult, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Injectable({
  providedIn: 'root',
})
export class Scanner {
  private _scannedBarcode: WritableSignal<string> = signal<string>('');
  public scannedBarcode: Signal<string> = computed(() => {return this._scannedBarcode() })

  public async scanImage(): Promise<void> {
    const options: CapacitorBarcodeScannerOptions = {
      scanOrientation: CapacitorBarcodeScannerScanOrientation.PORTRAIT,
      hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
      scanButton: true,
      scanText: "Scan"
    };

    let res: CapacitorBarcodeScannerScanResult = await CapacitorBarcodeScanner.scanBarcode(options);

    if (res) {
      this._scannedBarcode.set(res.ScanResult);
    } 
    else {
      this._scannedBarcode.set('')
    }
  }
}
