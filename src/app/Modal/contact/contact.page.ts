import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private modalCtrl: ModalController, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }


}
