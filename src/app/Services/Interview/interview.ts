import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../Model/Job/job';
import { GPTPrompts } from './InterviewPrompt/gptprompts';

@Injectable({
  providedIn: 'root'
})
export class InterviewServices {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '';

  constructor(private http: HttpClient) {}

  sendMessage(
    messages: { role: string; content: string }[],
    job: Job,
    command: 'start' | 'end' | 'followup' | 'ratings' | string
  ): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const systemMessage = {
      role: 'system',
      content: GPTPrompts.interviewSystemPrompt(job.role, job.qualifications)
    };

    let userContent = '';
    switch(command) {
      case 'start': userContent = GPTPrompts.meta.promptStarters[0]; break;
      case 'end': userContent = GPTPrompts.meta.promptStarters[1]; break;
      case 'ratings': userContent = GPTPrompts.meta.promptStarters[2]; break;
      case 'followup': userContent = `Based on the last applicant response, generate up to 2 follow-up questions aligned with job qualifications.`; break;
      default: userContent = command;
    }

    const userMessage = { role: 'user', content: userContent };

    const body = {
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages, userMessage],
      temperature: 0.7
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}