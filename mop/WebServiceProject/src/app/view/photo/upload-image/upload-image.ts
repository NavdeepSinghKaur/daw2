import { ChangeDetectionStrategy, Component, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  imports: [],
  templateUrl: './upload-image.html',
  styleUrl: './upload-image.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadImage {
  encodedImage: OutputEmitterRef<string | null | ArrayBuffer> = output();
  
  onFileSelected(event: Event): void {
    const element: any = event.currentTarget;
    let fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      this.imgToBase64(fileList[0]);
    }
  }

  private imgToBase64(file: File) {
    return new Promise((res) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(this.encodedImage.emit(reader.result));
    });
  }
}
