import { Component, ViewChild, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Tab1Page } from './tab1/tab1.page';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProfilPage } from './Modal/profil/profil.page';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import { IfStmt } from '@angular/compiler';

var connex = 0

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  nomUser = "Chargement ..."
  mot
  lettre = ""

  refreshPage(){   
    setTimeout(() => {
      
      this.cooling();
    }, 4000);
  }

  cooling(){
    setTimeout(() => {
      setTimeout(() => {
        console.log(firebase.auth().currentUser.email);
        if (firebase.auth().currentUser.emailVerified == true) {
          this.menuCtrl.enable(true);
          this.nomUser = firebase.auth().currentUser.displayName;
          var email = firebase.auth().currentUser.email;
          this.lettre = this.nomUser.charAt(0);
          if (email.includes("@outalma.com") == true) {
            this.appPages = [
              {
                title: 'Commandes',
                url: '/tabs/tabs/tableau-suivi',
                icon: 'list-box',
                tabBadge:"53" ,
                tabBadgeStyle:"danger",
              },
              {
                title: 'Service Client',
                url: '/tabs/tabs/message2',
                icon: 'chatbubbles',
                tabBadge:"19" ,
                tabBadgeStyle:"danger",
              },
              {
                title: 'Faire une demande',
                url: '/forms',
                icon: 'add-circle-outline',
                tabBadge:"" ,
                tabBadgeStyle:"",
              }
            ];
            this.navCtrl.navigateForward("/tabs/tabs/tableau-suivi");
          } else {
            this.appPages = [
              {
                title: 'Suivi',
                url: '/tabs/tabs/suivi',
                icon: 'cube',
                tabBadge:"2" ,
                tabBadgeStyle:"danger",
              },
              {
                title: 'Service Client',
                url: '/tabs/tabs/message3',
                icon: 'chatbubbles',
                tabBadge:"1" ,
                tabBadgeStyle:"danger",
              },
              {
                title: 'Faire une demande',
                url: '/forms',
                icon: 'add-circle-outline',
                tabBadge:"" ,
                tabBadgeStyle:"",
              }

            ];
            this.navCtrl.navigateForward("/tabs/tabs/suivi");
          }
        } else {
          this.isAuth = false;
          this.menuCtrl.enable(false);
          this.navCtrl.navigateForward('');
        }
        
      }, 4000)
    }, 4000);
  }

  ngOnInit() {
     // this.refreshPage();
    //this.Voirdonnees();



  }




  
  public appPages = [];
  isAuth: boolean;
  info: any[];



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      let config = {
        apiKey: "AIzaSyDoJ_MiRjaw4pG6BLuG1Ri-JJZlvXSAjNU",
        authDomain: "outalma-suivi.firebaseapp.com",
        databaseURL: "https://outalma-suivi.firebaseio.com",
        projectId: "outalma-suivi",
        storageBucket: "outalma-suivi.appspot.com",
        messagingSenderId: "13060033088"
      };
      firebase.initializeApp(config);
      var connectedRef = firebase.database().ref(".info/connected");
     
         
      if(connex!= 0){
        connectedRef.on("value", function (snap) {
          if (snap.val() === true) {
          console.log('en connexion')
          } else {
           
            alert("Vous êtes actuellement hors connexion.\nLes informations ne sont pas à jour.\nNéanmoins, toutes les fonctionnalités restent disponibles et vos actions seront enregistrées lorsque vous vous reconnecterez à un réseau.");
          }
        });
      }else{
        connex=1;
        console.log('Init');
      }
      this.refreshPage();
      this.Voirdonnees();
         console.log(firebase.auth().currentUser.email);
        /*  if (firebase.auth().currentUser.email != null) {
            
            this.nomUser = firebase.auth().currentUser.displayName;
            var email = firebase.auth().currentUser.email;
            this.lettre = this.nomUser.charAt(0);
            if (email.includes('@outalma.com') ) {
              this.navCtrl.navigateForward('/tabs/tabs/tableau-suivi');
              this.menuCtrl.enable(true);
              this.appPages = [
                {
                  title: 'Commandes',
                  url: '/tabs/tabs/tableau-suivi',
                  icon: 'list-box'
                },
                {
                  title: 'Service Client',
                  url: '/tabs/tabs/message2',
                  icon: 'chatbubbles',
                },
                {
                  title: 'Faire une demande',
                  url: '/tabs/tabs/forms',
                  icon: 'add-circle-outline'
                }
              ];
            } else {
              this.navCtrl.navigateForward('/tabs/tabs/suivi');
              this.menuCtrl.enable(true);
              this.appPages = [
                {
                  title: 'Suivi',
                  url: '/tabs/tabs/suivi',
                  icon: 'cube'
                },
                {
                  title: 'Service Client',
                  url: '/tabs/tabs/message3',
                  icon: 'chatbubbles'
                },
                {
                  title: 'Faire une demande',
                  url: '/tabs/tabs/forms',
                  icon: 'add-circle-outline'
                }

              ];
            }
            // this.isAuth = true;
            // this.navCtrl.navigateForward('tabs/tabs/suivi');
          } else {
            this.menuCtrl.enable(false);
            this.isAuth = false;
            this.navCtrl.navigateForward('');
          }*/
    })
  
  }

  async goToProfil() {

    const modal = await this.modalCtrl.create({
      component: ProfilPage,
    });

    modal.present();
  }
  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


  logOut() {
    firebase.auth().signOut();
    this.isAuth = false;
    this.navCtrl.navigateForward('');
    this.menuCtrl.enable(false);
  }

  Voirdonnees() {
    var InTabDemandes = [];
    firebase.database().ref('/user/' + firebase.auth().currentUser.uid + "/").on("value", function (snapshot) {
      var suivibdd = snapshot.val();
      suivibdd.forEach(function (entry) {
        InTabDemandes.push(entry);
      });
    },
      function (error) {
        console.log("Error dans VoirDonnees: " + error.code);
      }
    )
    this.info = InTabDemandes;
    this.nomUser = this.info['0']['Anom'] + ' ' + this.info['0']['Prenom']
  }

  onNavigate(page: any, data?: {}) {
    this.router.navigateByUrl(page, data ? data : null);
  }

}
