import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rgpd-confidentialite',
  templateUrl: './rgpd-confidentialite.page.html',
  styleUrls: ['./rgpd-confidentialite.page.scss'],
})
export class RgpdConfidentialitePage implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
