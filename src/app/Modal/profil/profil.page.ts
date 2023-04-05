import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase';
import { UpPasswordPage } from '../up-password/up-password.page';
import { UpPhonePage } from '../up-phone/up-phone.page';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  VigiK="";
  nom;
  phoneNumber: number;
  info: any[];
  prenom: any;
  adresse: any;
  adresseliv;
  code;
  codeliv;
  pays;
  paysliv;
  datenaiss;
  email: any;



  constructor(private modalCtrl: ModalController, public actionSheetController: ActionSheetController) {
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tg = snapshot.val();
      VigiK = tg[0]['Vigi'];},
    function (error) {
      console.log("Error dans Cry: " + error.code);})
    this.Voirdonnees()
  }

  // Initialisation des données de l'utilisateur depuis la base de données et decryptage
  ngOnInit() {
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tg = snapshot.val();
      VigiK = tg[0]['Vigi'];},
    function (error) {
      console.log("Error dans Cry: " + error.code);})
    this.Voirdonnees()
    this.nom = CryptoJS.AES.decrypt(this.info['0'].Nom.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.prenom = CryptoJS.AES.decrypt(this.info['0'].Prenom.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.adresse = CryptoJS.AES.decrypt(this.info['0'].Ad_rue_e.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.adresseliv = CryptoJS.AES.decrypt(this.info['0'].Ad_rue_l.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.code = CryptoJS.AES.decrypt(this.info['0'].Ad_pos_e.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.codeliv = CryptoJS.AES.decrypt(this.info['0'].Ad_pos_l.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.pays = CryptoJS.AES.decrypt(this.info['0'].Ad_pay_e.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.paysliv = CryptoJS.AES.decrypt(this.info['0'].Ad_pay_l.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.datenaiss = CryptoJS.AES.decrypt(this.info['0'].date_naiss.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.email = CryptoJS.AES.decrypt(this.info['0'].email.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
    this.phoneNumber = CryptoJS.AES.decrypt(this.info['0'].phoneNumber.trim(),  VigiK.trim()).toString(CryptoJS.enc.Utf8);
  }

    // Enregistrement des données de l'utilisateur dans la base de données et encryptage
  Enregistrer() {
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tg = snapshot.val();
      VigiK = tg[0]['Vigi'];},
    function (error) {
      console.log("Error dans Cry: " + error.code);})
    firebase.auth().currentUser.updateProfile({
      displayName: this.prenom + " " + this.nom,
      photoURL: this.datenaiss
    })
    var pays = CryptoJS.AES.encrypt(this.pays.trim(), VigiK.trim()).toString();
    var paysliv = CryptoJS.AES.encrypt(this.paysliv.trim(), VigiK.trim()).toString();
    var codeliv = CryptoJS.AES.encrypt(this.codeliv.trim(), VigiK.trim()).toString();
    var code = CryptoJS.AES.encrypt(this.code.trim(), VigiK.trim()).toString();
    var adresse = CryptoJS.AES.encrypt(this.adresse.trim(), VigiK.trim()).toString();
    var adresseliv = CryptoJS.AES.encrypt(this.adresseliv.trim(), VigiK.trim()).toString();
    var nom = CryptoJS.AES.encrypt(this.nom.trim(), VigiK.trim()).toString();
    var Prenom = CryptoJS.AES.encrypt(this.prenom.trim(), VigiK.trim()).toString();
    var datenaiss = CryptoJS.AES.encrypt(this.datenaiss.trim(), VigiK.trim()).toString();
    var email = CryptoJS.AES.encrypt(this.email.trim(), VigiK.trim()).toString();
    if (this.email != null && this.email != "") {
      firebase.auth().currentUser.updateEmail(this.email).then(function () {
        firebase.database().ref('/user/' + firebase.auth().currentUser.uid ).set(
          [
            {
              Ad_pay_e: pays,
              Ad_pay_l: paysliv,
              Ad_pos_e: code,
              Ad_pos_l: codeliv,
              Ad_rue_e: adresse,
              Ad_rue_l: adresseliv,
              Nom: nom,
              Prenom: Prenom,
              date_naiss: datenaiss,
              désativé: false,
              email: email,
              emailVerified: firebase.auth().currentUser.emailVerified,
              phoneNumber: CryptoJS.AES.encrypt(firebase.auth().currentUser.phoneNumber.trim(), this.VigiK.trim()).toString(),
            }
          ]
        ).then(
          (data: DataTransfer) => {
          },
          (error) => {
            console.log(error);
          }
        );;
      })
    } else {
      firebase.database().ref('/user/' + firebase.auth().currentUser.uid ).set(
        [
          {
            Ad_pay_e: pays,
            Ad_pay_l: paysliv,
            Ad_pos_e: code,
            Ad_pos_l: codeliv,
            Ad_rue_e: adresse,
            Ad_rue_l: adresseliv,
            Nom: nom,
            Prenom: Prenom,
            date_naiss: datenaiss,
            désativé: false,
            email: email,
            emailVerified: firebase.auth().currentUser.emailVerified,
            phoneNumber: CryptoJS.AES.encrypt(firebase.auth().currentUser.phoneNumber.trim(), this.VigiK.trim()).toString(),
          }
        ]
      ).then(
        (data: DataTransfer) => {
          console.log(this.info)
        },
        (error) => {
          console.log(error, this.info);
        }
      );;
    }


  }

  close() {
    this.modalCtrl.dismiss();
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
    console.log("voir taba = ", this.info);
  }

  //Renvoie vers le modal de modification du numéro de téléphone
  async goToUpPhone() {
    const modal = await this.modalCtrl.create({
      component: UpPhonePage,
      mode: "ios",
      showBackdrop: true,
    });

    modal.present();
  }

  //Renvoie vers le modal de modification du mot de passe
  async goToUpPassword() {
    const modal = await this.modalCtrl.create({
      mode: "ios",
      showBackdrop: true,
      component: UpPasswordPage,
      componentProps: {
        'phoneNumber': "this.phonehNumber.value"
      }
    });

    modal.present();
  }


}

