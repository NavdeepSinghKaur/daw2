import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonMenuToggle, IonButton, IonMenu, IonApp, IonList, IonItem, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonIcon, IonLabel, IonItem, IonList, IonApp, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonButtons, IonMenuToggle, IonButton, IonMenu]
})
export class MenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
