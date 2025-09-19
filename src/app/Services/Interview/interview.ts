import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../Model/Job/job';

@Injectable({
  providedIn: 'root'
})
export class InterviewServices {
  private apiUrl = '/api/interview';

  constructor(private http: HttpClient) {}

  sendMessage(messages: { role: string, content: string }[], job: Job): Observable<any> {
    return this.http.post<any>(this.apiUrl, { messages, job });
  }
}
