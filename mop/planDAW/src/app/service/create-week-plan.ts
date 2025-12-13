import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class CreateWeekPlan {
  private ai: GoogleGenAI;
  private connector = {
    apiKey: 'AIzaSyC528SMx7YApjHkgjoHRCLGNpiw6m5RJBY',
    model: 'gemini-2.0-flash-lite',
  };

  private prompt = 
  "Think of a weekend plan to hang out with my friends. Write-out a no more than 10 words-long text in catalan. The output must be only the idea.";

  constructor() {
    this.ai = new GoogleGenAI({apiKey: this.connector.apiKey});
  }

  private async generateNewPlan() {
    return await this.ai.models.generateContent({
      model: this.connector.model,
      contents: this.prompt
    });
  }

  get getResponse() {
    return Promise.resolve(this.generateNewPlan());
  }
}
