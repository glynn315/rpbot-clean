import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressModel } from '../../Model/Address/address.model';
import { CitiesModel } from '../../Model/Address/cities/cities.model';

@Injectable({
  providedIn: 'root'
})
export class AddressServices {

  private apiAddress = 'https://psgc.gitlab.io/api';

  constructor(private http : HttpClient){}

  displayProvinces():Observable<AddressModel[]>{
    return this.http.get<AddressModel[]>(`${this.apiAddress}/provinces`);
  }

  displayCities(code: number):Observable<CitiesModel[]>{
    return this.http.get<CitiesModel[]>(`${this.apiAddress}/provinces/${code}/cities-municipalities/`);
  }

  displayBarangay(code: number):Observable<CitiesModel[]>{
    return this.http.get<CitiesModel[]>(`${this.apiAddress}/cities-municipalities/${code}/barangays/`);
  }
  
}
