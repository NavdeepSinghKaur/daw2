import { Injectable } from '@angular/core';
import { InferenceClient } from "@huggingface/inference";

@Injectable({
  providedIn: 'root',
})
export class CreateWeekPlan {
  private ai: InferenceClient;

  private prompt: string = `
  Genera una idea per a un pla de cap de setmana amb amics. 
  La resposta ha de ser exclusivament un objecte JSON vàlid sense cap text addicional ni blocs de codi markdown.

  Estructura:
  {
    "title": "Títol del pla",
    "description": "Descripció breu (màxim 15 paraules)",
    "image": "URL REAL d'una imatge representativa",
    "mood": "chill, active o social",
    "duration": "min-max"
  }
  `;
  constructor() {
    this.ai = new InferenceClient('');
  }

  private async generateNewPlan(): Promise<any> {
    const res = await this.ai.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      messages: [
        {
          role: "user",
          content: this.prompt
        },
      ],
    });

    return res.choices[0].message;
  }

  get getResponse() {
    return this.generateNewPlan();
  }
}
