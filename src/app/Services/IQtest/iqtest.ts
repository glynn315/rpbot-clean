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

  // async generateQuestions(): Promise<any[]> {
  //   const prompt = `
  //     Generate exactly 7 random hard situational numerical word problems in JSON format.
  //     Generate exactly 7 random average situational word problems in JSON format.
  //     Generate exactly 7 random analytical word problems in JSON format.

  //     Return only an object with these fields:
  //     {
  //        "questions": [ ...21 questions total... ]
  //     }

  //     Each question in any array must follow this format:
  //     {
  //       "text": "string",
  //       "choices": ["A) ...", "B) ...", "C) ...", "D) ..."],
  //       "answer": "A" | "B" | "C" | "D"
  //     }
  //   `;

  //   const completion = await this.openai.chat.completions.create({
  //     model: "gpt-5-nano",
  //     messages: [{ role: "user", content: prompt }],
  //     response_format: {
  //       type: "json_schema",
  //       json_schema: {
  //         name: "iq_questions",
  //         schema: {
  //           type: "object",
  //           properties: {
  //             questions: {
  //               type: "array",
  //               items: {
  //                 type: "object",
  //                 properties: {
  //                   text: { type: "string" },
  //                   choices: {
  //                     type: "array",
  //                     items: { type: "string" }
  //                   },
  //                   answer: { type: "string" }
  //                 },
  //                 required: ["text", "choices", "answer"]
  //               }
  //             }
  //           },
  //           required: ["questions"]
  //         }
  //       }
  //     }
  //   });

  //   try {
  //     const content = completion.choices[0].message.content || "{}";
  //     const parsed = JSON.parse(content);
  //     return parsed.questions || [];
  //   } catch (e) {
  //     console.error("Failed to parse AI response", e, completion.choices[0].message.content);
  //     return [];
  //   }
  // }
  
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
