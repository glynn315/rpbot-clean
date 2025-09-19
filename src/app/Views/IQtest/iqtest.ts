import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IqtestService } from '../../Services/IQtest/iqtest';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Question {
  text: string;
  choices: string[];
  answer: string;
}

@Component({
  selector: 'app-iqtest',
  standalone: true,
  templateUrl: './iqtest.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./iqtest.scss']
})
export class IqtestComponent implements OnInit {
  questions: Question[] = [];
  currentStep = 0;
  answers: string[] = [];
  score: number | null = null;
  loading = true;

  constructor(
    private IqtestService: IqtestService,
    private Router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const data: Question[] = await this.IqtestService.generateQuestions();
      this.questions = data;
      this.answers = new Array(this.questions.length).fill(null);
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();   // 👈 force update
    }
  }

  next() { if (this.currentStep < this.questions.length - 1) this.currentStep++; }
  prev() { if (this.currentStep > 0) this.currentStep--; }

  submit() {
    let correct = 0;
    this.questions.forEach((q, i) => {
      if (this.answers[i] === q.answer) correct++;
    });
    this.score = correct;
  }

  resetQuiz() {
    if (this.score !== null) {
      sessionStorage.setItem('score', this.score.toString());
      this.Router.navigate(['/home']);
    }
  }
}
