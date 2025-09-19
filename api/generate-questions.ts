import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Generate exactly 7 situational IQ test questions in JSON format.
Return only an object with a "questions" field that contains the array.
Each question must follow this format:
{
  "text": "string",
  "choices": ["A) ...", "B) ...", "C) ...", "D) ..."],
  "answer": "A" | "B" | "C" | "D"
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0].message?.content || "{}";
    const parsed = JSON.parse(content);

    res.status(200).json(parsed);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
