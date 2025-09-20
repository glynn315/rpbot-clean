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

  applicantName: string = '';
  applicantPosition: string = '';
  interviewCompleted: boolean = false;

  jobs = Jobs;
  selectedJob: Job | undefined;

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(
    private interviewService: InterviewServices,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.applicantName = sessionStorage.getItem('applicantName') ?? 'Applicant';
    this.applicantPosition = sessionStorage.getItem('applicantPosition') ?? 'Position';
    this.selectedJob = this.jobs.find(j => j.role.toLowerCase() === this.applicantPosition.toLowerCase());

    const savedMessages = sessionStorage.getItem('interviewMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    } else {
      this.startInterview();
    }
  }

  startInterview() {
    if (!this.selectedJob) return;

    this.interviewService.sendMessage(this.messages, this.selectedJob, 'start').subscribe(res => {
      this.messages.push({ role: 'assistant', content: res.choices[0].message.content });
      this.saveMessages();
      this.cdr.detectChanges();
    });
  }

  sendMessage() {
    if (!this.userInput.trim() || !this.selectedJob) return;
    const userMessage = this.userInput.trim();
    this.messages.push({ role: 'user', content: userMessage });
    this.saveMessages();
    this.userInput = '';

    if (["none","no","nope","no questions","nothing"].includes(userMessage.toLowerCase())) {
      this.endInterview();
      return;
    }

    this.interviewService.sendMessage(this.messages, this.selectedJob, userMessage).subscribe(res => {
      this.messages.push({ role: 'assistant', content: res.choices[0].message.content });
      this.saveMessages();
      this.cdr.detectChanges();
      this.scrollToBottom();
    });
  }   


  private generateFollowUps() {
    if (!this.selectedJob) return;

    this.interviewService.sendMessage(this.messages, this.selectedJob, 'followup').subscribe(res => {
      const followups = res.choices[0].message.content
        .split('\n')
        .map((q: string) => q.trim())
        .filter((q: any) => q);

      if (followups.length > 0) {
        this.messages.push({ role: 'assistant', content: followups[0] });
        this.saveMessages();
        this.cdr.detectChanges();
        this.scrollToBottom();
      }
    });
  }

  endInterview() {
    if (!this.selectedJob) return;

    this.interviewService.sendMessage(this.messages, this.selectedJob, 'end').subscribe(res => {
      this.messages.push({ role: 'assistant', content: res.choices[0].message.content });
      this.interviewCompleted = true;
      this.saveMessages();
      this.cdr.detectChanges();
      this.scrollToBottom();
      this.fetchPrivateRatings();
    });
  }

  private fetchPrivateRatings() {
    if (!this.selectedJob) return;

    this.interviewService.sendMessage(this.messages, this.selectedJob, 'ratings').subscribe(res => {
      const evalText = res.choices[0].message.content;
      const ratings = this.extractRatings(evalText);
      sessionStorage.setItem('evaluationRatings', JSON.stringify(ratings));
      console.log('Private evaluation saved:', ratings);
    });
  }

  private extractRatings(evalText: string): { care: number, discipline: number, mastery: number, commentary?: string } {
    try {
      const jsonStart = evalText.indexOf('{');
      const jsonEnd = evalText.lastIndexOf('}') + 1;
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const jsonString = evalText.substring(jsonStart, jsonEnd);
        const data = JSON.parse(jsonString);
        return {
          care: data.care ?? 0,
          discipline: data.discipline ?? 0,
          mastery: data.mastery ?? 0,
          commentary: data.commentary ?? ''
        };
      }
    } catch(e) {
      console.error('Failed to parse ratings JSON', e);
    }
    return { care: 0, discipline: 0, mastery: 0 };
  }

  private saveMessages() {
    sessionStorage.setItem('interviewMessages', JSON.stringify(this.messages));
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  proceedNext() {
    this.router.navigate(['/evaluation']);
  }
}
