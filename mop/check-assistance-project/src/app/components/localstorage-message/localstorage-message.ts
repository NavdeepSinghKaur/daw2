import { Component, EventEmitter, inject, Output } from '@angular/core';
import { LocalstorageHandler } from '../../services/localstorage-handler';

@Component({
  selector: 'app-localstorage-message',
  imports: [],
  templateUrl: './localstorage-message.html',
  styleUrl: './localstorage-message.css'
})
export class LocalstorageMessage {
  @Output() showComponent: EventEmitter<boolean>;
  localstorageSrv: LocalstorageHandler;

  constructor() {
    this.showComponent = new EventEmitter<boolean>();
    this.localstorageSrv = inject(LocalstorageHandler);
  }

  ngOnInit() {
    if (!this.localstorageSrv.getAlumnes) {
      this.hideComponent();
    }
  }

  loadLocalStorage() {
    this.localstorageSrv.loadLocalStorage();
    this.hideComponent();
  }

  protected hideComponent() {
    this.showComponent.emit(false);
  }

}
