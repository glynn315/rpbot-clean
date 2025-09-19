import { Injectable } from '@angular/core';
import { InformationModel } from '../../Model/Information/information.model';

@Injectable({
  providedIn: 'root'
})
export class InformationServices {
  InfoField: InformationModel = {
    positionSelected: '',
    applicantName: '',
  };

  SubmitInformation() {
    sessionStorage.setItem('applicantPosition',this.InfoField.positionSelected!);
    sessionStorage.setItem('applicantName',this.InfoField.applicantName!);
  }
}
