import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rgpd-cookies',
  templateUrl: './rgpd-cookies.page.html',
  styleUrls: ['./rgpd-cookies.page.scss'],
})
export class RgpdCookiesPage implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
