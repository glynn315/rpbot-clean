import { Injectable } from '@angular/core';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root'
})
export class IqtestService {
  private openai = new OpenAI({
    // apiKey: 'REMOVED',
    apiKey: 'API_KEY_HERE',
    dangerouslyAllowBrowser: true
  });

  async generateQuestions(): Promise<any[]> {
    const prompt = `
      Generate 7 random situational IQ test questions in JSON format.
      Each item should have fields: { "text": string, "answer": string }.
      Do NOT include explanations, just the problem and answer.
    `;

    const completion = await this.openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: prompt }]
    });

    try {
      return JSON.parse(completion.choices[0].message.content || "[]");
    } catch (e) {
      console.error("Failed to parse AI response", e);
      return [];
    }
  }
}
