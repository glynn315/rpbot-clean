import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { LucideAngularModule , Send } from "lucide-angular";
import { InterviewServices } from '../../Services/Interview/interview';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jobs } from '../../Data/Job/job.data';
import { Job } from '../../Model/Job/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interview-process',
  standalone: true,
  imports: [LucideAngularModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './interview-process.html',
  styleUrls: ['./interview-process.scss'],
  providers: [InterviewServices]
})
export class InterviewProcess implements OnInit {
  readonly Send = Send;
  messages: { role: string, content: string }[] = [];
  userInput: string = '';

  applicantName: string = 'Yvert Glynn Soriano';
  applicantPosition: string = 'IT Staff';
  interviewCompleted: boolean = false;
  jobs = Jobs;
  selectedJob: Job | undefined;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  constructor(
    private interviewService: InterviewServices,
    private cdr: ChangeDetectorRef,
    private Router: Router
  ) {}

  ngOnInit() {
    this.applicantName = sessionStorage.getItem('applicantName') ?? 'Yvert Glynn Soriano';
    this.applicantPosition = sessionStorage.getItem('applicantPosition') ?? 'IT Staff';

    this.selectedJob = this.jobs.find(j => j.role.toLowerCase() === this.applicantPosition.toLowerCase());

    const savedMessages = localStorage.getItem('interviewMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    } else {
      this.messages.push({
        role: 'assistant',
        content: `Hello ${this.applicantName}, welcome to your interview for the ${this.applicantPosition} role. Let’s begin.`
      });
    }
  }

  sendMessage() {
    if (!this.userInput.trim() || !this.selectedJob) return;
    const userReply = this.userInput.trim().toLowerCase();
    this.messages.push({ role: 'user', content: this.userInput });
    this.saveMessages();
    this.userInput = '';

    if (["none", "no", "nope", "no questions", "nothing"].includes(userReply)) {
      this.interviewCompleted = true;
      this.cdr.detectChanges();
      return;
    }

    this.interviewService.sendMessage(this.messages, this.selectedJob).subscribe({
      next: (res) => {
        this.messages.push({
          role: 'assistant',
          content: res.choices[0].message.content
        });
        this.saveMessages();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.messages.push({ role: 'assistant', content: '⚠️ Error getting response' });
        console.error(err);
        this.saveMessages();
        this.cdr.detectChanges();
      }
    });
  }

  private saveMessages() {
    sessionStorage.setItem('interviewMessages', JSON.stringify(this.messages));
  }
  proceedNext() {
    this.Router.navigate(['/evaluation']);
  }
}
