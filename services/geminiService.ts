
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getExplanation(topic: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explique o conceito de "${topic}" na programação Luau para Roblox para uma criança de 10 anos. Use analogias divertidas e seja muito encorajador.`,
        config: {
          systemInstruction: "Você é o 'Bit', um robô tutor amigável e especialista em Roblox. Sua missão é ensinar programação de forma lúdica e simples.",
        },
      });
      return response.text || "Desculpe, meu processador engasgou! Tente novamente.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Ops! O Bit está offline agora. Vamos tentar de novo em breve?";
    }
  }

  async checkCode(userCode: string, task: string): Promise<{ isCorrect: boolean; feedback: string }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `O aluno escreveu o seguinte código Luau: \`${userCode}\`. A tarefa era: "${task}". O código está correto? Se não, explique o porquê de forma gentil e dê uma dica sem dar a resposta completa. Responda em JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              isCorrect: { type: "BOOLEAN" },
              feedback: { type: "STRING" }
            },
            required: ["isCorrect", "feedback"]
          }
        }
      });
      return JSON.parse(response.text || '{"isCorrect": false, "feedback": "Erro na análise."}');
    } catch (error) {
      return { isCorrect: false, feedback: "Não consegui ler seu código agora. Verifique a sintaxe!" };
    }
  }
}

export const geminiService = new GeminiService();
