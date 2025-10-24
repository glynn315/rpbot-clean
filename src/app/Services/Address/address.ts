import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import rawAddressData from '../../../assets/address.json';
import { Province } from '../../Model/Address/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressServices {

  private flatAddress: Record<string, Province> = {};

  constructor() {
    // Safely treat JSON as Record<string, any>
    const addressJson: Record<string, any> = rawAddressData;

    for (const regionCode of Object.keys(addressJson)) {
      const provinces: Record<string, Province> = addressJson[regionCode].province_list;
      Object.assign(this.flatAddress, provinces);
    }
  }

  displayProvinces(): Observable<{ name: string; municipalities: string[] }[]> {
    return of(
      Object.keys(this.flatAddress).sort().map(prov => ({
        name: prov,
        municipalities: Object.keys(this.flatAddress[prov].municipality_list)
      }))
    );
  }

  displayCities(provinceName: string): Observable<{ name: string; barangays: string[] }[]> {
    const province = this.flatAddress[provinceName];
    if (!province) return of([]);
    return of(
      Object.keys(province.municipality_list).sort().map(muni => ({
        name: muni,
        barangays: province.municipality_list[muni].barangay_list
      }))
    );
  }

  displayBarangay(provinceName: string, municipalityName: string): Observable<{ name: string }[]> {
    const barangays = this.flatAddress[provinceName]?.municipality_list[municipalityName]?.barangay_list;
    if (!barangays) return of([]);
    return of(barangays.sort().map(brgy => ({ name: brgy })));
  }
}
