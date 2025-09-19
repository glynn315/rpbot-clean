import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interviewevaluation',
  imports: [],
  templateUrl: './interviewevaluation.html',
  styleUrl: './interviewevaluation.scss'
})
export class Interviewevaluation implements OnInit {
  constructor(private Router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.Router.navigate(['/complete']);
    }, 10000);
  }
}
