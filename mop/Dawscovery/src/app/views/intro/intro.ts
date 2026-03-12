import { Component } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-intro',
  imports: [RouterModule, RouterLink],
  templateUrl: './intro.html',
  styleUrl: './intro.css',
})
export class Intro {

}
