import { Injectable } from '@angular/core';
import { InferenceClient } from "@huggingface/inference";

@Injectable({
  providedIn: 'root',
})
export class CreateWeekPlan {
  private ai: InferenceClient;

  private prompt = 
  "Genera una idea per a un pla de cap de setmana amb amics (per exemple, sortir a sopar, fer una excursió, veure una pel·lícula, etc.). Màxim 15 paraules.";

  constructor() {
    this.ai = new InferenceClient(TOKEN-FROM-HUGGINGFACE);
  }

  private async generateNewPlan() {
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
