import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { CookieModel } from '../models/cookie-model';

@Injectable({
  providedIn: 'root',
})
export class Cookie {

  constructor() {

  }

  async add(token: string, time: number, userId: string) {

    const data = JSON.stringify({
      token: token,
      time: time,
      userId: userId
    });

    await Preferences.set({
      key: 'accessToken',
      value: data
    })

  }

  async getCookie(): Promise<CookieModel | null> {
    const data = await Preferences.get({
      key: 'accessToken'
    })

    let parsedData: CookieModel | null = null;
    if (data.value) {
      parsedData = JSON.parse(data.value);
    }

    return parsedData;
  }

  async delete() {
    await Preferences.remove({
      key: 'accessToken'
    })
  }

  async getUserId(): Promise<string | null> {
    const data = await this.getCookie();
    return data?.userId || null;
  }
}
