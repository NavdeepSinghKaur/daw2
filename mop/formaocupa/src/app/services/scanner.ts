import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Restriction } from '@angular/core/event_dispatcher.d';
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
      hint: [
        CapacitorBarcodeScannerTypeHint.QR_CODE,
        CapacitorBarcodeScannerTypeHint.EAN_13
      ],
      scanButton: true,
      scanText: "Scan"
    }

    let res: CapacitorBarcodeScannerScanResult = await CapacitorBarcodeScanner.scanBarcode(options);

    if (res) {
      this._scannedBarcode.set(res.ScanResult);
    } 
    else {
      this._scannedBarcode.set('')
    }
  }
}
