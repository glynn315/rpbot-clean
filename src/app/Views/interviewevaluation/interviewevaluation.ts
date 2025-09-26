import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailServices } from '../../Services/Email/email-services';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-interviewevaluation',
  imports: [HttpClientModule],
  templateUrl: './interviewevaluation.html',
  styleUrl: './interviewevaluation.scss',
  providers:[EmailServices]
})
export class Interviewevaluation implements OnInit {
  constructor(private Router: Router, private EmailServices: EmailServices) {}

  EmailFields: any;

  ngOnInit(): void {
    const raw = sessionStorage.getItem('evaluationRatings');
    const ratings = JSON.parse(raw!);

    this.EmailFields = {
      name: 'Yvert Glynn Soriano',
      email: 'yggs.drive@gmail.com',
      message: ratings.commentary,
      care: ratings.care,
      discipline: ratings.discipline,
      mastery: ratings.mastery,
    };

    setTimeout(() => {
      this.EmailServices.sendEmail(this.EmailFields).subscribe(() => {
      });
      this.Router.navigate(['/complete']);
    }, 10000);
  }
}
