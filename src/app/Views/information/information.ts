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
import { FormSubmission } from '../../Services/form-submission';
import { AnyARecord } from 'dns';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideAngularModule, LoaderComponent],
  templateUrl: './information.html',
  styleUrls: ['./information.scss'],
  providers: [AddressServices, FormSubmission]
})
export class Information implements OnInit {
  readonly back = ChevronLeft;
  readonly close = CircleX;

  activeLoader: boolean = false;
  collegeGraduate: boolean = false;
  collegeSelectorValue: boolean = true;
  marriage: boolean = false;
  marriageValue: boolean = false;
  displayForm: number = 0;
  informationID: number = 0;
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
    civilStatus: '---Select Status---',
    contactnumber: '',
    birthdate: '',
    religion: '',
    province: '',
    cities: '',
    barangay: '',
    zipcode: 0,
    expectedSalary: 0,
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

  constructor(private AddressServices: AddressServices , private InformationServices: FormSubmission) {}

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
  collegeSelector(){
    if(this.collegeSelectorValue == false){
      this.collegeGraduate = false;
    }
    else{
      this.collegeGraduate = true;
    }
  }
  marriageSelector(){
    if(this.marriageValue == false){
      this.marriage = false;
    }
    else{
      this.marriage= true;
    }
  }
  previousForm(){
    this.displayForm--
    sessionStorage.setItem('form', this.displayForm.toString());
  }
  selected() {
    this.activeLoader = true;
    this.AddressServices.displayCities(this.provinceField.code!).subscribe({
      next: (data) => {
        this.displayCity = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.activeLoader = false;
      }
    });
  }

  citiesSelected(){
    this.activeLoader = true;
    this.AddressServices.displayBarangay(this.municipalityField.code!).subscribe({
      next: (data) => {
        this.displayBarangay= data;
      },
      complete: () => {
        this.activeLoader = false;
      }
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
    sessionStorage.setItem('civilstatus', this.applicantinformation.civilStatus!);
    sessionStorage.setItem('contactnumber', this.applicantinformation.contactnumber!);
    sessionStorage.setItem('birthdate', this.applicantinformation.birthdate!);
    sessionStorage.setItem('religion', this.applicantinformation.religion!);
    sessionStorage.setItem('province', this.applicantinformation.province!);
    sessionStorage.setItem('cities', this.applicantinformation.cities!);
    sessionStorage.setItem('barangay', this.applicantinformation.barangay!);
    sessionStorage.setItem('zipcode', this.applicantinformation.zipcode?.toString()!);
    sessionStorage.setItem('expectedsalary', this.applicantinformation.expectedSalary?.toString()!);
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
  applicationConfirmation() {
    if (confirm("Are you sure you want to save this information?")) {
      this.applicationConfirmationField();
    } else {
      alert("Save cancelled.");
    }
  }
  applicationConfirmationField() {
    sessionStorage.setItem('dateAvailability', this.ApplicationStatusField.dateAvailability!);
    sessionStorage.setItem('question', this.ApplicationStatusField.question!);
    sessionStorage.setItem('technicalSkills', this.ApplicationStatusField.technicalSkills!);
    const applicant: InformationModel = {
      firstname: sessionStorage.getItem('firstname') || '',
      middlename: sessionStorage.getItem('middlename') || '',
      lastname: sessionStorage.getItem('lastname') || '',
      email: sessionStorage.getItem('email') || '',
      civilStatus: sessionStorage.getItem('civilstatus') || '',
      contactnumber: sessionStorage.getItem('contactnumber') || '',
      birthdate: sessionStorage.getItem('birthdate') || '',
      religion: sessionStorage.getItem('religion') || '',
      province: sessionStorage.getItem('province') || '',
      cities: sessionStorage.getItem('cities') || '',
      barangay: sessionStorage.getItem('barangay') || '',
      zipcode: Number(sessionStorage.getItem('zipcode')) || 0,
      expectedSalary: Number(sessionStorage.getItem('expectedsalary')) || 0,
      positionSelected: sessionStorage.getItem('applicantPosition') || '',
      applicantName: sessionStorage.getItem('applicantName') || '',
    };

    const eligibility: Eligibility = {
      eligibility: sessionStorage.getItem('eligibility') || '',
    };

    const education: Education = {
      college: sessionStorage.getItem('college') || '',
      course: sessionStorage.getItem('course') || '',
      yeargraduate: Number(sessionStorage.getItem('yeargraduate')) || 0,
      graduateschool: Number(sessionStorage.getItem('graduateschool')) || 0,
      boardexam: sessionStorage.getItem('boardexam') || '',
    };

    const marriage: Marriage = {
      partnerReligion: sessionStorage.getItem('partnerReligion') || '',
      dateMarried: sessionStorage.getItem('dateMarried') || '',
      child: sessionStorage.getItem('child') || '',
      numberofchildren: Number(sessionStorage.getItem('numberofchildren')) || 0,
      ageofchildren: sessionStorage.getItem('ageofchildren') || '',
      guardianofchildren: sessionStorage.getItem('guardianofchildren') || '',
    };

    const workingList: WorkExperience[] = JSON.parse(sessionStorage.getItem('workingList') || '[]');

    const applicationStatus: ApplicationStatus = {
      contribution: sessionStorage.getItem('contribution') || '',
      pendingapplication: sessionStorage.getItem('pendingapplication') || '',
      lockincontract: sessionStorage.getItem('lockincontract') || '',
      motorcycle: sessionStorage.getItem('motorcycle') || '',
      license: sessionStorage.getItem('license') || '',
      technicalSkills: sessionStorage.getItem('technicalSkills') || '',
      question: sessionStorage.getItem('question') || '',
      dateAvailability: sessionStorage.getItem('dateAvailability') || '',
    };
    this.InformationServices.storeInformation(applicant).subscribe((info: any) => {
      const infoId = info[1].applicant_i_information_id;
      sessionStorage.setItem('applicantID', infoId.toString())
      eligibility.applicant_i_information_id = infoId;
      education.applicant_i_information_id = infoId;
      marriage.applicant_i_information_id = infoId;
      applicationStatus.applicant_i_information_id = infoId;
      workingList.forEach(w => w.applicant_i_information_id = infoId);

      this.InformationServices.storeEligibility(eligibility).subscribe();
      this.InformationServices.storeApplicantEducation(education).subscribe();
      this.InformationServices.storeMarriageInformation(marriage).subscribe();
      this.InformationServices.storeApplicationStatus(applicationStatus).subscribe();

      workingList.forEach(work =>
        this.InformationServices.storeExperience(work).subscribe()
      );
    });
    sessionStorage.setItem('DataStored', 'true');
  }

}
