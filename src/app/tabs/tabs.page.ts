import { Component, OnInit } from '@angular/core';
import { store } from '@angular/core/src/render3';
import * as firebase from 'firebase';
import { MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})


export class TabsPage implements OnInit {
  public navCtrl: NavController
  public menuCtrl: MenuController
  isAuth: boolean;

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          // this.navCtrl.navigateForward('tabs/tabs/suivi');
        } else {
          this.isAuth = false;
        }
      }
    );
  }
  doRefresh(event) {
    console.log('Rechargement');

    setTimeout(() => {
      console.log('Rechargement en cours');
      this.ngOnInit()
      event.target.complete();
    }, 2000);
  }

  buttonColorP: string = '#333986';
  buttonColorS: string = '#333986';
  
  beSelectedP(){
    this.buttonColorP = '#454EB2'; //desired Color
    this.buttonColorS = '#333986'; //desired Color
    }
  beSelectedS(){
      this.buttonColorS = '#454EB2'; //desired Color
      this.buttonColorP = '#333986'; //desired Color
      }
  
  logOut(){
    this.navCtrl.navigateForward('');
  }
}


