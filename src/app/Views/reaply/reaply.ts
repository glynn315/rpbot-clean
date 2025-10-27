import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormSubmission } from '../../Services/form-submission';
import { ActivatedRoute } from '@angular/router';
import { InformationModel } from '../../Model/Information/information.model';
import { Education } from '../../Model/Information/Education/education.model';
import { ApplicationStatus } from '../../Model/Information/ApplicationStatus/application-status.model';
import { Eligibility } from '../../Model/Information/Eligibility/eligibility.model';
import { Marriage } from '../../Model/Information/Marriage/marriage.model';
import { WorkExperience } from '../../Model/Information/WorkExperience/work-experience.model';
import { Wpm } from '../../Model/wpm/wpm';
import { IqModel } from '../../Model/iq/iq';
import { Conversation } from '../../Model/Conversation/conversation';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LucideAngularModule , SquarePen , CircleFadingPlus, CircleX } from 'lucide-angular';

@Component({
  selector: 'app-reaply',
  imports: [CommonModule, FormsModule, HttpClientModule , LucideAngularModule],
  templateUrl: './reaply.html',
  styleUrl: './reaply.scss',
  providers: [FormSubmission]
})
export class Reaply implements OnInit {
  readonly editPen = SquarePen;
  readonly addWork = CircleFadingPlus;
  readonly CircleX = CircleX;
  applicant?: InformationModel;
  education?: Education;
  status?: ApplicationStatus;
  eligibility?: Eligibility;
  marriage?: Marriage;
  work?: WorkExperience[] = [];
  wpm?: Wpm;
  iq?: IqModel;
  fromDate!: string;
  toDate!: string; 
  conversation?: Conversation;
  applicantID: number| null = null;

  WorkModal: boolean = false;
  modifyWorkExperience: boolean = false;

  workingID: number | null = null;
  loading = true;

  WorkingInformation: WorkExperience = {
    applicant_i_information_id:0,
    previouscompensation: 0,
    companyname: '',
    workduration: '',
    reasonforleaving: '',
    position: '',
    contribution: '',
  }

  constructor(private formService: FormSubmission, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.applicantID =  Number(this.route.snapshot.paramMap.get('id')) || 0

    this.displayWorkExperience();

    forkJoin({
      applicant: this.formService.displayApplicantInfo(this.applicantID),
      education: this.formService.displayApplicantEducationInfo(this.applicantID),
      status: this.formService.displayApplicationStatusInfo(this.applicantID),
      eligibility: this.formService.displayApplicantEligibilityInfo(this.applicantID),
      marriage: this.formService.displayApplicantMarriageInfo(this.applicantID),
      work: this.formService.displayApplicantExperienceInfoAll(this.applicantID),
      wpm: this.formService.displayWpmInfo(this.applicantID),
      iq: this.formService.displayIqInfo(this.applicantID),
      conversation: this.formService.displayConversationInfo(this.applicantID)
    }).subscribe({
      next: (res) => {
        this.applicant = res.applicant;
        this.education = res.education;
        this.status = res.status;
        this.eligibility = res.eligibility;
        this.marriage = res.marriage;
        this.wpm = res.wpm;
        this.iq = res.iq;
        this.conversation = res.conversation;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching applicant data:', err);
        this.loading = false;
      }
    });
  }
  calculateDuration() {
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);

      if (to < from) {
        this.WorkingInformation.workduration = 'Invalid dates';
        return;
      }
      let months = (to.getFullYear() - from.getFullYear()) * 12;
      months -= from.getMonth();
      months += to.getMonth();
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      this.WorkingInformation.workduration = `${years > 0 ? years + ' yr(s) ' : ''}${remainingMonths} mo(s)`;
    } else {
      this.WorkingInformation.workduration = '';
    }
  }

  addWorkExperience(){
    this.WorkModal = true;
  }
  closeWorking(){
    this.WorkModal = false;
    this.modifyWorkExperience = false;
  }
  modifyWork(work_i_information_id : number){
    if (work_i_information_id) {
      this.workingID = work_i_information_id;
      this.modifyWorkExperience = true;
    }
  }
  displayWorkExperience(){
    this.formService.displayApplicantExperienceInfoAll(this.applicantID!).subscribe((data) => {
      this.work = data;
    })
  }
  UpdateFormExperience(){
    this.formService.updateWorkExperience(this.workingID!, this.WorkingInformation).subscribe(() => {

    });
  }
  workingExperience(){
    this.WorkingInformation.applicant_i_information_id = this.applicantID!;
    this.formService.storeExperience(this.WorkingInformation).subscribe(() => {
      this.WorkModal = false;
      this.displayWorkExperience();
    });
  }

}
