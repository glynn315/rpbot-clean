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
  answers: (string | null)[] = [];
  score: number | null = null;
  loading = true;

  constructor(
    private iqtestService: IqtestService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const data: Question[] = await this.iqtestService.generateQuestions();
      this.questions = data;
      this.answers = new Array(this.questions.length).fill(null);
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  next() {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    }
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  selectAnswer(choice: string) {
    this.answers[this.currentStep] = choice[0];
  }

  submit() {
    let correct = 0;
    this.questions.forEach((q, i) => {
      const correctIndex = q.choices.findIndex(c => c.includes(q.answer));
      const correctLetter = String.fromCharCode(65 + correctIndex);

      if (this.answers[i] === correctLetter) correct++;
    });
    this.score = correct;

    sessionStorage.setItem('score', JSON.stringify({
      correct: this.score,
      total: this.questions.length
    }));
  }
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  resetQuiz() {
    if (this.score !== null) {
      sessionStorage.setItem('score', this.score.toString());
      this.router.navigate(['/home']);
    }
  }
}
