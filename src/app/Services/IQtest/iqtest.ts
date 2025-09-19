import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IqtestService {
  async generateQuestions(): Promise<any[]> {
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST'
      });
      const data = await res.json();
      return data.questions || [];
    } catch (e) {
      console.error("Failed to fetch questions", e);
      return [];
    }
  }
}