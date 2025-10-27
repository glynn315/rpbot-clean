import { Injectable } from '@angular/core';
import OpenAI from 'openai';
import testBank from '../../../assets/testBank.json'

@Injectable({
  providedIn: 'root'
})
export class IqtestService {

  private openai = new OpenAI({
    apiKey: 'REMOVED',
    dangerouslyAllowBrowser: true
  });
  
  async generateQuestions(): Promise<any[]> {
    const pickRandom = (arr: any[], n: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    };

    const hard = pickRandom(testBank.hard_situational, 7);
    const average = pickRandom(testBank.average_situational, 7);
    const analytical = pickRandom(testBank.analytical, 7);

    return [...hard, ...average, ...analytical].map((q) => {
      const formattedChoices = q.choices.map((c: string, idx: number) => {
        const letter = ["A", "B", "C", "D"][idx];
        return `${letter}) ${c}`;
      });

      return {
        text: q.text,
        choices: formattedChoices,
        answer: q.answer
      };
    });
  }

}
