import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Information } from '../information/information';
import { InformationServices } from '../../Services/Information/information';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  imports: [CommonModule,FormsModule],
  templateUrl: './test.html',
  styleUrl: './test.scss',
  providers: [Information]
})
export class Test implements OnInit {

  constructor(public InformationModule: InformationServices, private Router : Router) {}
  wpm = sessionStorage.getItem('wpm') || 0;
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

}
