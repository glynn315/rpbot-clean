import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailServices } from '../../Services/Email/email-services';

@Component({
  selector: 'app-interviewevaluation',
  imports: [],
  templateUrl: './interviewevaluation.html',
  styleUrl: './interviewevaluation.scss',
  providers:[EmailServices]
})
export class Interviewevaluation implements OnInit {
  constructor(private Router: Router, private EmailServices:EmailServices) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.Router.navigate(['/complete']);
    }, 10000);
  }
}
