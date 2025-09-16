import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Status = 'correct' | 'wrong' | 'pending';

@Component({
  selector: 'app-typing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typing.html',
  styleUrl: './typing.scss'
})
export class Typing implements OnInit {
  textToType: string = '';
  sentences: string[] = [];
  currentLine: string = '';
  currentIndex: number = 0;
  userInput: string = '';
  allUserInput: string = '';
  startTime: number | null = null;
  wpm: number | null = null;
  accuracy: number | null = null;
  timer: number = 60;
  interval: any;
  testEnded: boolean = false;
  currentStatuses: Status[] = [];
  constructor(
    private Routes: Router
  ) {}
  phrases: string[] = [
    `Programming is not just about writing code; it is about solving problems. When you learn to program, you learn to think logically, to break down large problems into smaller ones, and to approach challenges with a clear strategy.`,
    `Technology continues to evolve at an astonishing pace, influencing nearly every aspect of human life. From artificial intelligence and machine learning to advances in medicine and renewable energy, innovation shapes the way we work, learn, and communicate.`,
    `Reading and writing are two of the oldest skills that humanity developed, yet they remain essential in today's digital landscape. A person who can read widely and type efficiently gains a competitive edge in almost every career.`
  ];
  ngOnInit(): void {
    this.generateText();
    this.resetStatuses();
  }
  generateText() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    this.textToType = this.phrases[randomIndex];
    this.sentences = this.textToType.split(/(?<=[.?!])\s+/);
    this.currentIndex = 0;
    this.currentLine = this.sentences[this.currentIndex] || '';
    this.resetStatuses();
  }
  resetStatuses() {
    this.currentStatuses = new Array(this.currentLine.length).fill('pending') as Status[];
  }
  startTimer() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          this.endTest();
        }
      }, 1000);
    }
  }
  onInputChange() {
    if (!this.startTime && this.userInput.length > 0) {
      this.startTime = Date.now();
      this.startTimer();
    }
    this.currentStatuses = this.computeWordStatuses(this.userInput, this.currentLine);
    const typedWords = this.userInput.trim().split(/\s+/);
    const targetWords = this.currentLine.trim().split(/\s+/);
    if (typedWords.length >= targetWords.length) {
      this.nextSentence();
    }
  }

  private computeWordStatuses(typed: string, target: string): Status[] {
    const typedWords = typed.split(" ");
    const targetWords = target.trim().split(/\s+/);

    const statuses: Status[] = [];

    for (let i = 0; i < targetWords.length; i++) {
      if (i < typedWords.length - 1) {
        statuses.push(
          typedWords[i] === targetWords[i] ? "correct" : "wrong"
        );
      } else if (i === typedWords.length - 1) {
        const typedWord = typedWords[i];
        if (!typedWord) {
          statuses.push("pending");
        } else if (targetWords[i].startsWith(typedWord)) {
          statuses.push("pending");
        } else {
          statuses.push("wrong");
        }
      } else {
        statuses.push("pending");
      }
    }
    return statuses;
  }
  nextSentence() {
    const typedLine = this.userInput;
    if (typedLine.length > 0) {
      this.allUserInput = (this.allUserInput + (this.allUserInput ? ' ' : '') + typedLine).trim();
    }
    this.currentIndex++;
    this.userInput = '';
    if (this.currentIndex < this.sentences.length) {
      this.currentLine = this.sentences[this.currentIndex];
      this.resetStatuses();
    } else {
      this.endTest();
    }
  }
  endTest() {
    clearInterval(this.interval);
    this.testEnded = true;

    if (!this.startTime) {
      this.wpm = 0;
      this.accuracy = 0;
      return;
    }
    const elapsedMinutes = (60 - this.timer) / 60 || 1 / 60;
    const fullTyped = (this.allUserInput + (this.allUserInput ? ' ' : '') + this.userInput).trim();
    const typedWords = fullTyped.split(/\s+/).filter(w => w.length > 0);
    const targetWords = this.textToType.split(/\s+/);
    let correctWords = 0;
    for (let i = 0; i < Math.min(typedWords.length, targetWords.length); i++) {
      if (typedWords[i] === targetWords[i]) {
        correctWords++;
      }
    }
    this.wpm = correctWords > 0 ? Math.round(correctWords / elapsedMinutes) : 0;
    this.accuracy = typedWords.length > 0 ? Math.round((correctWords / typedWords.length) * 100) : 0;
  }


  completeTest() {
    sessionStorage.setItem('accuracy',this.accuracy?.toString()!);
    sessionStorage.setItem('wpm',this.wpm?.toString()!);
    this.Routes.navigate(['/home']);
  }
}
