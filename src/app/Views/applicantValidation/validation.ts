import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FormSubmission } from '../../Services/form-submission';
import { Lookup } from '../../Model/Lookup/lookup.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './validation.html',
  styleUrl: './validation.scss',
  providers: [FormSubmission]
})
export class Validation implements OnInit {
  @Input() isVisible: boolean = true;
  @Output() confirmVerifier = new EventEmitter<void>();

  employmentStatus: string = '';
  disclaimerConfirmation: boolean = false;
  LookupField: Lookup = {
    fname: '',
    lname: '',
    bdate: '',
    number: null
  }
  applicantID: any;

  constructor(private LookupServices : FormSubmission){}
  ngOnInit() {
    const savedStatus = sessionStorage.getItem('EmployementStatus');
    if (savedStatus) {
      this.employmentStatus = savedStatus;
      this.isVisible = false;
      this.confirmVerifier.emit();
    }
  }

  confirm() {
    sessionStorage.setItem('EmployementStatus', this.employmentStatus);

    if (this.employmentStatus === 'New Applicant') {
      this.isVisible = false;
      this.confirmVerifier.emit();
    } else if (this.employmentStatus === 'Re-Apply') {
      if (this.LookupField.fname && this.LookupField.lname && this.LookupField.bdate && this.LookupField.number) {
        sessionStorage.setItem('fname', this.LookupField.fname);
        sessionStorage.setItem('lname', this.LookupField.lname);
        sessionStorage.setItem('bdate', this.LookupField.bdate);
        sessionStorage.setItem('number', this.LookupField.toString());

        this.isVisible = false;
        this.confirmVerifier.emit();
        this.LookupServices.lookup(this.LookupField).subscribe((data) => {
          this.applicantID = data;
          sessionStorage.setItem('reapplyID',this.applicantID.applicant.applicant_i_information_id);
          sessionStorage.setItem('step', '3');
          location.reload();
        });
      } else {
        alert('Please complete all fields.');
      }
    }
  }

  reset() {
    this.employmentStatus = '';
    this.LookupField.fname = '';
    this.LookupField.lname = '';
    this.LookupField.bdate = '';
    this.LookupField.number = null;
  }
}
