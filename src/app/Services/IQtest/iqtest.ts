import { Injectable } from '@angular/core';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root'
})
export class IqtestService {
  private openai = new OpenAI({
    apiKey: '',
    dangerouslyAllowBrowser: true
  });

  async generateQuestions(): Promise<any[]> {
    const prompt = `
      Generate exactly 7 random hard situational numerical word problems in JSON format.
      Generate exactly 7 random average situational word problems in JSON format.
      Generate exactly 7 random analytical word problems in JSON format.

      Return only an object with these fields:
      {
         "questions": [ ...21 questions total... ]
      }

      Each question in any array must follow this format:
      {
        "text": "string",
        "choices": ["A) ...", "B) ...", "C) ...", "D) ..."],
        "answer": "A" | "B" | "C" | "D"
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: prompt }],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "iq_questions",
          schema: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    text: { type: "string" },
                    choices: {
                      type: "array",
                      items: { type: "string" }
                    },
                    answer: { type: "string" }
                  },
                  required: ["text", "choices", "answer"]
                }
              }
            },
            required: ["questions"]
          }
        }
      }
    });

    try {
      const content = completion.choices[0].message.content || "{}";
      const parsed = JSON.parse(content);
      return parsed.questions || [];
    } catch (e) {
      console.error("Failed to parse AI response", e, completion.choices[0].message.content);
      return [];
    }
  }
}
