import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NhtsaService {
  domain: string = 'https://api.nhtsa.gov';
  http: HttpClient = inject(HttpClient);

  constructor() {}

  getDetailsByVin(vin: string) {
    // for test 5J8TC2H31KL012420
    return this.http.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`)
  }

  getDetailsByModel(make: string, model: string, year: number) {
    const url = `https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}/model/${model}`;
    console.log(url);
    return this.http.get(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}/model/${model}`)
  }

  getDetailsById(vehicleId: number) {
    const url = `https://api.nhtsa.gov/SafetyRatings/VehicleId/${vehicleId}?format=json`;
    console.log(url);
    return this.http.get(url);
  }
}
