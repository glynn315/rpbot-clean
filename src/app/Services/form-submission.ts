import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InformationModel } from '../Model/Information/information.model';
import { Observable } from 'rxjs';
import { ApplicationStatus } from '../Model/Information/ApplicationStatus/application-status.model';
import { Education } from '../Model/Information/Education/education.model';
import { Eligibility } from '../Model/Information/Eligibility/eligibility.model';
import { Marriage } from '../Model/Information/Marriage/marriage.model';
import { WorkExperience } from '../Model/Information/WorkExperience/work-experience.model';
import { Wpm } from '../Model/wpm/wpm';
import { IqModel } from '../Model/iq/iq';

@Injectable({
  providedIn: 'root'
})
export class FormSubmission {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient){}

  displayApplicant():Observable<InformationModel[]>{
    return this.http.get<InformationModel[]>(`${this.apiUrl}applicant`)
  }

  displayApplicantEducation():Observable<Education[]>{
    return this.http.get<Education[]>(`${this.apiUrl}applicantEducation`)
  }

  displayApplicantionStatus():Observable<ApplicationStatus[]>{
    return this.http.get<ApplicationStatus[]>(`${this.apiUrl}applicantionStatus`)
  }

  displayApplicantEligibility():Observable<Eligibility[]>{
    return this.http.get<Eligibility[]>(`${this.apiUrl}applicantEligibility`)
  }

  displayApplicantMarriage():Observable<Marriage[]>{
    return this.http.get<Marriage[]>(`${this.apiUrl}applicantMarriage`)
  }

  displayApplicantExperience():Observable<WorkExperience[]>{
    return this.http.get<WorkExperience[]>(`${this.apiUrl}applicantExperience`)
  }

  storeInformation(post: InformationModel):Observable<InformationModel>{
    return this.http.post<InformationModel>(`${this.apiUrl}applicant`, post)
  }

  storeApplicantEducation(post: Education):Observable<Education>{
    return this.http.post<Education>(`${this.apiUrl}applicantEducation`, post)
  }

  storeApplicationStatus(post: ApplicationStatus):Observable<ApplicationStatus>{
    return this.http.post<ApplicationStatus>(`${this.apiUrl}applicantionStatus`, post)
  }

  storeEligibility(post: Eligibility):Observable<Eligibility>{
    return this.http.post<Eligibility>(`${this.apiUrl}applicantEligibility`, post)
  }

  storeMarriageInformation(post: Marriage):Observable<Marriage>{
    return this.http.post<Marriage>(`${this.apiUrl}applicantMarriage`, post)
  }

  storeExperience(post: WorkExperience):Observable<WorkExperience>{
    return this.http.post<WorkExperience>(`${this.apiUrl}applicantExperience`, post)
  }

  storeWpm(post: Wpm):Observable<Wpm>{
    return this.http.post<Wpm>(`${this.apiUrl}wpm`, post)
  }

  storeIq(post: IqModel):Observable<IqModel>{
    return this.http.post<IqModel>(`${this.apiUrl}IQ`, post)
  }


}
