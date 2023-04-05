import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingProvider {
loading:any;
  constructor(public loadingCtrl: LoadingController) {


  }
  startLoading(){
    this.loading = this.loadingCtrl.create({
      message: 'Please wait...'
    });
      this.loading.present()
  }
  stopLoading(){
    setTimeout(() => {
      this.loading.dismiss();
    }, 100);
  }
}
