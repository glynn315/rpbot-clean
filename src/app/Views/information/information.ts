import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule , ChevronLeft , CircleX } from 'lucide-angular';
import { AddressServices } from '../../Services/Address/address';
import { AddressModel } from '../../Model/Address/address.model';
import { CitiesModel } from '../../Model/Address/cities/cities.model';
import { InformationModel } from '../../Model/Information/information.model';
import { Eligibility } from '../../Model/Information/Eligibility/eligibility.model';
import { Education } from '../../Model/Information/Education/education.model';
import { Marriage } from '../../Model/Information/Marriage/marriage.model';
import { WorkExperience } from '../../Model/Information/WorkExperience/work-experience.model';
import { ApplicationStatus } from '../../Model/Information/ApplicationStatus/application-status.model';

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
  readonly close = CircleX;
  displayForm: number = 0;
  WorkExperienceFieldStatus: boolean = false;
  workingList: WorkExperience[] = [];
  educationalBackground: Education[] = [];
  marriageInformation: Marriage[] = [];
  ApplicationStatusField: ApplicationStatus ={
    contribution: '',
    pendingapplication: '',
    lockincontract: '',
    motorcycle: '',
    license: '',
    technicalSkills: '',
    question: '',
    dateAvailability: '',
  }
  applicantinformation: InformationModel ={
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    civilstatus: '---Select Status---',
    contactnumber: '',
    birthdate: '',
    religion: '',
    province: '',
    cities: '',
    barangay: '',
    zipcode: 0,
    expectedsalary: 0,
    positionSelected: '',
    applicantName: '',
  };
  WorkingInformation: WorkExperience ={
    previouscompensation: 0,
    companyname: '',
    workduration: '',
    reasonforleaving: '',
    position: '',
  }
  EducationalField: Education ={
    college: '',
    course: '',
    yeargraduate: 0,
    graduateschool: 0,
    boardexam: '',
  };
  MarriageField: Marriage = {
    partnerReligion: '',
    dateMarried: '',
    child: '',
    numberofchildren: 0,
    ageofchildren: '' ,
    guardianofchildren: '',
  };
  eligibilityField: Eligibility={
    eligibility: '',
  }
  displayAddress : AddressModel[] = [];
  displayBarangay : AddressModel[] = [];
  provinceField : AddressModel = {
    code: 0 ,
    name: '',
  };
  municipalityField: AddressModel ={
    code: 0 ,
    name: '',
  }
  barangayField: AddressModel ={
    code: 0 ,
    name: '',
  }
  displayCity : CitiesModel[] = [];

  constructor(private AddressServices: AddressServices) {}

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
  citiesSelected(){
    this.AddressServices.displayBarangay(this.municipalityField.code!).subscribe((data) => {
      this.displayBarangay = data;
    });
  }
  nextStep() {
    this.displayForm++;
    sessionStorage.setItem('form', this.displayForm.toString());
  }
  openExperience(){
    this.WorkExperienceFieldStatus = true;
  }
  closeExperience(){
    this.WorkExperienceFieldStatus = false;
  }
  submitInformation(){
    this.applicantinformation.province = this.provinceField.name!;
    this.applicantinformation.cities = this.municipalityField.name!;
    this.applicantinformation.barangay = this.barangayField.name!;
    this.applicantinformation.applicantName = this.applicantinformation.firstname + ' ' + this.applicantinformation.middlename + ' ' + this.applicantinformation.lastname;
    sessionStorage.setItem('applicantPosition',this.applicantinformation.positionSelected!);
    sessionStorage.setItem('applicantName',this.applicantinformation.applicantName!);
    sessionStorage.setItem('firstname', this.applicantinformation.firstname!);
    sessionStorage.setItem('middlename', this.applicantinformation.middlename!);
    sessionStorage.setItem('lastname', this.applicantinformation.lastname!);
    sessionStorage.setItem('email', this.applicantinformation.email!);
    sessionStorage.setItem('civilstatus', this.applicantinformation.civilstatus!);
    sessionStorage.setItem('contactnumber', this.applicantinformation.contactnumber!);
    sessionStorage.setItem('birthdate', this.applicantinformation.birthdate!);
    sessionStorage.setItem('religion', this.applicantinformation.religion!);
    sessionStorage.setItem('province', this.applicantinformation.province!);
    sessionStorage.setItem('cities', this.applicantinformation.cities!);
    sessionStorage.setItem('barangay', this.applicantinformation.barangay!);
    sessionStorage.setItem('zipcode', this.applicantinformation.zipcode?.toString()!);
    sessionStorage.setItem('expectedsalary', this.applicantinformation.expectedsalary?.toString()!);
  }
  workingExperience() {
    this.workingList.push({ ...this.WorkingInformation });
    sessionStorage.setItem('workingList', JSON.stringify(this.workingList));
    this.WorkExperienceFieldStatus = false;
  }
  EducationalInformation(){
    sessionStorage.setItem('college', this.EducationalField.college!);
    sessionStorage.setItem('course',  this.EducationalField.course!);
    sessionStorage.setItem('yeargraduate',  this.EducationalField.yeargraduate?.toString()!);
    sessionStorage.setItem('graduateschool',  this.EducationalField.graduateschool?.toString()!);
    sessionStorage.setItem('boardexam',  this.EducationalField.boardexam!);
  }
  MarriageInformation(){
    sessionStorage.setItem('partnerReligion', this.MarriageField.partnerReligion!);
    sessionStorage.setItem('dateMarried', this.MarriageField.dateMarried!);
    sessionStorage.setItem('child', this.MarriageField.child!);
    sessionStorage.setItem('numberofchildren', this.MarriageField.numberofchildren?.toString()!);
    sessionStorage.setItem('ageofchildren', this.MarriageField.ageofchildren!);
    sessionStorage.setItem('guardianofchildren', this.MarriageField.guardianofchildren!);
  }
  addEligibility(){
    sessionStorage.setItem('eligibility', this.eligibilityField.eligibility!);
  }
  applicationStatusInformation(){
    sessionStorage.setItem('contribution', this.ApplicationStatusField.contribution!);
    sessionStorage.setItem('pendingapplication', this.ApplicationStatusField.pendingapplication!);
    sessionStorage.setItem('lockincontract', this.ApplicationStatusField.lockincontract!);
    sessionStorage.setItem('motorcycle', this.ApplicationStatusField.motorcycle!);
    sessionStorage.setItem('license', this.ApplicationStatusField.license!);
  }
  applicationConfirmation(){
    sessionStorage.setItem('technicalSkills', this.ApplicationStatusField.technicalSkills!);
    sessionStorage.setItem('question', this.ApplicationStatusField.question!);
    sessionStorage.setItem('dateAvailability', this.ApplicationStatusField.dateAvailability!);
  }
}
