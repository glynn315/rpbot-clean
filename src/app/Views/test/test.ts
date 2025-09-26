import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Information } from '../information/information';
import { InformationServices } from '../../Services/Information/information';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule,Check , ClockArrowUp } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-test',
  imports: [CommonModule,FormsModule,LucideAngularModule],
  templateUrl: './test.html',
  styleUrl: './test.scss',
  providers: [Information]
})
export class Test implements OnInit {
  readonly Check = Check;
  readonly Pending = ClockArrowUp;
  constructor(public InformationModule: InformationServices, private Router : Router) {}
  currentStep: number = parseInt(sessionStorage.getItem('step') || '0', 10);
  
  wpm = sessionStorage.getItem('wpm') || 0;
  score = sessionStorage.getItem('score') || 0;
  generalInterview = sessionStorage.getItem('generalInterview') || 'Pending';
  accuracy = sessionStorage.getItem('accuracy') || 0;
  ngOnInit(): void {
    this.InformationModule.SubmitInformation();
  }

  TypingTest(){
    this.Router.navigate(['/typingTest']);
  }
  iqtest(){
    this.Router.navigate(['/iqtest']);
  }
  generalInterviewTest() {
    this.currentStep++;
    sessionStorage.setItem('step', this.currentStep.toString());
    location.reload();
  }

}
