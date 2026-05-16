import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cookie } from './cookie';
import { VisitResponseModel } from '../models/visit-response-model';
import { CookieModel } from '../models/cookie-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScanQr {
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);
  private cookieSrv: Cookie = inject(Cookie);

  private _url: string;
  private _response: WritableSignal<{ status: number, error: string } | null>;
  public response: Signal<{ status: number, error: string } | null> = computed(() => this._response());


  constructor() {
    this._url = environment.endpoint + '/api';

    this._response = signal<{ status: number, error: string } | null>(null);
  }

  public async addVisitor(id: string) {
    try {
      const cookie: CookieModel | null = await this.cookieSrv.getCookie();

      if (cookie) {
        return await firstValueFrom(this.http.post(
          this._url + '/visits/' + id + '/' + cookie.userId, {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + cookie.token
            }
          }).pipe(map((data: any) => {
            const res: VisitResponseModel = data as VisitResponseModel

            this._response.set({ 'status': res.status, 'error': res.messages });
          })));
      } else {
        this._response.set({ 'status': 401, 'error': 'No hi ha cookie!!!! HAs de tornar a iniciar sessió.' });
        this.router.navigate(['/login']);
      }


    } catch (e: any) {
      this._response.set({ 'status': 500, 'error': e });
    }
  }
}
