import { ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { GoogleAuth } from '../../service/google/google-auth';
import { GoogleGenAI } from '@google/genai';
import { UploadImage } from "./upload-image/upload-image";
import { NhtsaService } from '../../service/nhtsa-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-photo',
  imports: [UploadImage],
  templateUrl: './photo.html',
  styleUrl: './photo.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Photo implements OnInit {
  private googleAuthSrv: GoogleAuth = inject(GoogleAuth);
  private nhtsaSrv: NhtsaService = inject(NhtsaService);
  private static prompt = "Describe the car (make, model, approximate year, version) from the next image. Respond only with four lines, no extra words or explanations or unnecessary tokens. {\"Make\": \"<value>\", \"Model\": \"<value>\",  \"Year\": \"<four-digit year, e.g. 2005>\", \"Version\": \"<value>\"}. If you are not sure, write the mst probable as the value. Do not add any other text."
  
  image: InputSignal<string | undefined> = input<string>();
  ai: GoogleGenAI;
  results: WritableSignal<any[]>;

  constructor() {
    const token: string = 'AIzaSyBRc0V7cRYMYOMEdEaT16n_3h7ODlfJg78';
    this.ai = new GoogleGenAI({ apiKey: token });

    this.results = signal([]);
  }

  async ngOnInit(): Promise<void> {
    await this.googleAuthSrv.checkIfTokenExists();
  }

  async getCarDetails(image: string) {
    return this.ai.models.generateContent({
      model: "gemini-2.5-flash",
        contents: [
          {
            inlineData: {
              "mimeType": "image/jpeg",
              "data": image
            }
          }, 
          {
            text: Photo.prompt
          }
        ]
    });
  }

  async getImage(image: any) {
    this.results.set([]);
    image = image.split(',');
    
    const details = await this.getCarDetails(image[1]);
    let text = details.candidates![0].content?.parts![0].text;
    if (text !== undefined && text !== "") {
      const parsedText = JSON.parse(text);

      this.nhtsaSrv.getDetailsByModel(parsedText.Make, parsedText.Model, parsedText.Year).pipe(
        switchMap((res: any)=> {  
          const data: number = res.Results[0].VehicleId;
          if (!data) {
            throw new Error('No s\'han trobat dades del vehicle amb els paràmetres proporcionats.');
          }
          return this.nhtsaSrv.getDetailsById(data);
        })
      ).subscribe({
        next: (res: any) => {
          const newValues: string[]= [
            res.Results[0].FrontCrashPicture,
            res.Results[0].FrontCrashPassengersideRating, 
            res.Results[0].FrontCrashDriversideRating, 
            res.Results[0].OverallRating,
            res.Results[0].OverallFrontCrashRating,
            res.Results[0].FrontCrashVideo,              
          ];
          this.results.update((vals) => [
            ...vals, newValues             
          ]);
        },
        error: (err: any) => {
          console.error('S\'ha produït un error:', err);
        }
      });

    } else {
      console.error('No s\'han formatjetat bé les dades. Torna a intentar-ho.');
    }
  }

  get getResults() {
    return this.results.asReadonly();
  }
}
