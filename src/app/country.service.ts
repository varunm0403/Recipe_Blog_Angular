import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  country: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private jsonURL = 'assets/data/country.json';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.jsonURL);
  }
}
