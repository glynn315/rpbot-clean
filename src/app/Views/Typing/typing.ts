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
  styleUrl: './typing.scss',
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
  constructor(private Routes: Router) {}
  phrases: string[] = [
    `Programming is not merely the act of writing code; it is the art of problem-solving expressed through logic and structure. When someone learns programming, they are not just memorizing syntax or practicing commands; they are training their mind to think in steps, to divide large problems into smaller tasks, and to search for solutions with clarity and persistence. Each time a program is written, it reflects the effort to transform complexity into simplicity. The programmer must anticipate possible errors, consider different approaches, and refine the design until it is both efficient and reliable. Debugging becomes a valuable teacher, showing that mistakes are not failures but opportunities to learn more deeply. Every error message is a clue, every unexpected outcome a signal that thinking must be adjusted, and every correction a moment of growth. Algorithms, which form the backbone of programming, are not lifeless instructions but representations of human reasoning shaped into systematic form. A good algorithm demonstrates the balance between creativity and discipline, showing that imagination can indeed coexist with structured logic. Learning to program strengthens analytical thinking and also builds resilience. It encourages the idea that persistence pays off, because no meaningful solution is ever created without testing, failure, and eventual improvement. Beyond personal skill development, programming connects directly to the modern world. From banking systems to medical software, from educational platforms to entertainment applications, almost every service relies on programs written by individuals who once started with simple exercises. The journey from beginner to professional is marked by constant challenges, yet each solved problem becomes a foundation for solving more complex ones. In this way, programming is less about machines and more about human growth. It is about patience, persistence, and the willingness to keep learning. The discipline gained through programming extends beyond the screen. It improves problem-solving in everyday life, whether planning schedules, analyzing choices, or managing tasks. By teaching the mind to organize thoughts, to consider alternatives, and to predict outcomes, programming becomes a transferable skill that strengthens decision-making in any field. Ultimately, programming shows that problem-solving is not a one-time achievement but a continuous process of curiosity, analysis, and improvement. It is this mindset that empowers people to face challenges with confidence, knowing that every complex issue can be approached step by step until a solution emerges.`,

    `Technology continues to evolve at an astonishing pace, influencing nearly every aspect of human life. From artificial intelligence and machine learning to advances in medicine and renewable energy, innovation shapes the way we work, learn, and communicate. New tools and platforms emerge every year, redefining industries and creating opportunities for both businesses and individuals. The speed of change challenges us to adapt quickly, to learn continuously, and to remain open to possibilities we cannot yet imagine. At the same time, this evolution raises questions about ethics, responsibility, and the role of humanity in a highly digital world. Technology is not neutral; its use reflects the values and decisions of the people who create and apply it. As society depends more deeply on digital infrastructure, the ability to think critically about technology becomes as important as the ability to use it. The power of innovation lies not only in technical achievement but also in how it enhances human potential and well-being. Whether improving healthcare access, reducing environmental impact, or connecting distant communities, the true value of technology emerges when it serves people meaningfully.`,

    `Reading and writing are two of the oldest skills that humanity developed, yet they remain essential in today's digital landscape. A person who can read widely and type efficiently gains a competitive edge in almost every career. The act of reading expands the mind, introduces new perspectives, and strengthens comprehension. Writing, on the other hand, refines thought, clarifies communication, and makes ideas permanent. Together, these skills form the foundation of learning, enabling people to share knowledge across time and space. In an age dominated by fast communication, the ability to read carefully and write effectively is often underestimated. Yet, it is these very abilities that distinguish thoughtful communication from mere noise. A well-written message can inspire, persuade, or inform, while careful reading ensures that nothing important is overlooked. Even as technology provides shortcuts through speech recognition or predictive text, the mastery of reading and writing remains a mark of intellectual strength. Those who dedicate time to improving these skills not only succeed in school or work but also cultivate a lifelong habit of growth and self-expression. The keyboard may have replaced the pen, but the value of literacy remains timeless.`
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
      const lastTyped = typedWords[typedWords.length - 1];
      const lastTarget = targetWords[targetWords.length - 1];
      if (lastTyped === lastTarget) {
        this.nextSentence();
      }
      if (this.userInput.endsWith(" ")) {
        this.nextSentence();
      }
    }
  }

  private computeWordStatuses(typed: string, target: string): Status[] {
    const typedWords = typed.split(' ');
    const targetWords = target.trim().split(/\s+/);

    const statuses: Status[] = [];

    for (let i = 0; i < targetWords.length; i++) {
      if (i < typedWords.length - 1) {
        statuses.push(typedWords[i] === targetWords[i] ? 'correct' : 'wrong');
      } else if (i === typedWords.length - 1) {
        const typedWord = typedWords[i];
        if (!typedWord) {
          statuses.push('pending');
        } else if (targetWords[i].startsWith(typedWord)) {
          statuses.push('pending');
        } else {
          statuses.push('wrong');
        }
      } else {
        statuses.push('pending');
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
    const typedWords = fullTyped.split(/\s+/).filter((w) => w.length > 0);
    const targetWords = this.textToType.split(/\s+/);
    let correctWords = 0;
    for (let i = 0; i < Math.min(typedWords.length, targetWords.length); i++) {
      if (typedWords[i] === targetWords[i]) {
        correctWords++;
      }
    }
    this.wpm = correctWords > 0 ? Math.round(correctWords / elapsedMinutes) : 0;
    this.accuracy =
      typedWords.length > 0 ? Math.round((correctWords / typedWords.length) * 100) : 0;
  }

  completeTest() {
    sessionStorage.setItem('accuracy', this.accuracy?.toString()!);
    sessionStorage.setItem('wpm', this.wpm?.toString()!);
    this.Routes.navigate(['/home']);
  }
}
