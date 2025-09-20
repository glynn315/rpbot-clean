import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InformationServices } from '../../Services/Information/information';
import { LucideAngularModule , ChevronLeft } from 'lucide-angular';
import { AddressServices } from '../../Services/Address/address';
import { AddressModel } from '../../Model/Address/address.model';
import { CitiesModel } from '../../Model/Address/cities/cities.model';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './information.html',
  styleUrls: ['./information.scss'],
  providers: [AddressServices]
})
export class Information implements OnInit {
  readonly back = ChevronLeft;
  displayForm: number = 0;
  applicantinformation: any ={
    fname: '',
    mname: '',
    lname: '',
  }
  displayAddress : AddressModel[] = [];
  provinceField : AddressModel = {
    code: 0 ,
    name: '',
  };
  displayCity : CitiesModel[] = [];

  constructor(public InformationServices: InformationServices, private AddressServices: AddressServices) {}

  async ngOnInit(): Promise<void> {
    const savedForm = sessionStorage.getItem('form');
    this.displayForm = savedForm ? parseInt(savedForm, 10) : 1;
    sessionStorage.setItem('form', this.displayForm.toString());
    this.displayProvince();
  }

  displayProvince(){
    this.AddressServices.displayProvinces().subscribe((data) => {
      this.displayAddress = data;
    });
  }
  previousForm(){
    this.displayForm--
    sessionStorage.setItem('form', this.displayForm.toString());
  }
  selected(){
    console.log(this.provinceField.code);
    this.AddressServices.displayCities(this.provinceField.code!).subscribe((data) => {
      this.displayCity = data;
    });
  }
  nextStep() {
    this.displayForm++;
    sessionStorage.setItem('form', this.displayForm.toString());
    this.InformationServices.InfoField.applicantName = this.applicantinformation.fname + ' ' + this.applicantinformation.mname + ' ' + this.applicantinformation.lname;
    if (this.displayForm == 1) {
      this.InformationServices.SubmitInformation();
    }
  }
}
