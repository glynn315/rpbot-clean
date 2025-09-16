import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IqtestService } from '../../Services/IQtest/iqtest';
@Component({
  selector: 'app-iqtest',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './iqtest.html',
  styleUrl: './iqtest.scss'
})
export class Iqtest implements OnInit {
  currentIndex = 0;
  score = 0;
  submitted = false;
  loading = true;

  questions: { text: string; answer: string; userAnswer: string }[] = [];

  constructor(private ai: IqtestService) {}

  async ngOnInit() {
    this.questions = (await this.ai.generateQuestions()).map(q => ({
      ...q,
      userAnswer: ""
    }));
    this.loading = false;
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  submitTest() {
    this.score = 0;
    this.questions.forEach(q => {
      if (q.userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
        this.score++;
      }
    });
    this.submitted = true;
  }

  restartTest() {
    this.currentIndex = 0;
    this.score = 0;
    this.submitted = false;
    this.questions.forEach(q => (q.userAnswer = ""));
  }
}
