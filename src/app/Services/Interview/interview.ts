import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../Model/Job/job';

@Injectable({
  providedIn: 'root'
})
export class InterviewServices {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  constructor(private http: HttpClient) {}

  sendMessage(messages: { role: string, content: string }[], job: Job): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env['OPENAI_API_KEY']}`
    });
    const systemMessage = {
      role: 'system',
      content: `You are a professional HR interviewer conducting an interview for the role of "${job.role}".  

      You must conduct the interview in a structured but adaptive way:  

      1. **Introduction & Background**  
      "Can you tell me about yourself and your work experiences?"  

      2. **Role-Specific Education / Projects**  
      Ask about coursework, training, or projects relevant to ${job.role}.  

      3. **Responsibilities & Skills**  
      "What were your main responsibilities in that project or work experience, and what skills did you develop?"  

      4. **Problem-Solving & Challenges**  
      "Can you describe a problem or challenge you faced that is relevant to ${job.role}, and how you solved it?"  

      5. **Teamwork & Communication**  
      "How did you collaborate with teammates or explain your work to others (technical or non-technical)?"  

      6. **Adaptability**  
      "Tell me about a time you had to quickly adapt to new requirements or a sudden change in priorities."  

      7. **Work Habits & Motivation**  
      "How do you stay organized and productive when handling multiple tasks at once?"  

      8. **Strengths & Areas to Improve**  
      "What do you consider your greatest strengths, and what areas are you currently working to improve?"  

      9. **Career Goals & Closing**  
      "Where do you see yourself in the next few years, and how does this role fit into your career goals?"  
      Finally: "Do you have any questions for us?"  

      ---

      ### 🔹 Rules for Follow-Ups:
      - After each candidate response, generate **up to 2 thoughtful follow-up questions**.  
      - Tailor these follow-ups based on the job’s qualifications:  
        ${job.qualifications.join(', ')}  
      - Keep questions professional yet supportive.  
      - Avoid excessive technical jargon unless clearly required for the role.  
      - Do **not** repeat previous questions.  
      - Always ask **only one question at a time**.`
    };

    const body = {
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      temperature: 0.7
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
