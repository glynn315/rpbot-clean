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

  }
}
