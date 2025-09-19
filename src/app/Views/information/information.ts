import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InformationServices } from '../../Services/Information/information';
import { LucideAngularModule , ChevronLeft } from 'lucide-angular';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './information.html',
  styleUrls: ['./information.scss'],
})
export class Information implements OnInit {
  readonly back = ChevronLeft;
  displayForm: number = 0;
  applicantinformation: any ={
    fname: '',
    mname: '',
    lname: '',
  }

  constructor(public InformationServices: InformationServices) {}

  ngOnInit(): void {
    const savedForm = sessionStorage.getItem('form');
    this.displayForm = savedForm ? parseInt(savedForm, 10) : 1;
    sessionStorage.setItem('form', this.displayForm.toString());
  }
  previousForm(){
    this.displayForm--
    sessionStorage.setItem('form', this.displayForm.toString());
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
