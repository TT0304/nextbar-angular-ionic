import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.page.html',
  styleUrls: ['./note-modal.page.scss'],
})
export class NoteModalPage {
  @Input() note: string;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  saveNote() {
    this.modalController.dismiss({ note: this.note });
  }
}
