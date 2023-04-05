import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-form1',
  templateUrl: './form1.page.html',
  styleUrls: ['./form1.page.scss'],
})
export class Form1Page implements OnInit {

  VigiK="";
  Prenom:"Prenom";
  Nom:"Nom";
  Telephone:"Telephone";
  Num_colis:"Num_colis";
  Num_commande:"Numm_commande";
  Desc_colis:"Desc_colis";
  Ad_website:"Ad_website";
  Date_livraison:"Date_livraison";
  Type_envoi:"Type_envoi";
  Ad_rue:"Ad_rue";
  Ad_postal:"Ad_postal";
  Ad_pays:"Ad_pays";
  Emp=0;
  Lengtha=0;

  title = 'form1';  



  TabDemandes = [];
  TabUser2 = [];
  TabFields = [
    {
      Ad_pay_l:'',
      Ad_rue_l:'',
      Ad_pos_l:'',
      Ad_pay_e:'',
      Ad_rue_e:'',
      Ad_pos_e:'',
      Nom: '',
      Atype:'Demande',
      Date_crea: 0,
      Date_livraison:'',
      Desc_colis:'',
      Etat:'En attente',
      Liste_envies:'',
      Num_colis:'',
      Num_com:'',
      Prenom: '',
      Site_prov:'',
      Type_demande:'1',
      Type_envoi:'',
      Telephone:'',
      i:'123456',
      icon:'paper',
      id:'123456',
      Priorite:'gris',
      UID:'',
    }
  ];

  constructor(private modalCtrl: ModalController,public toastCtrl: ToastController, private nav : NavController) {
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tag = snapshot.val();
      VigiK = tag[0]['Vigi'];},
    function (error) {
      console.log("Error : " + error.code);})
      this.VigiK = VigiK;

    var InTabDemandes = [];
    firebase.database().ref('/user/' + firebase.auth().currentUser.uid ).on("value", function(snapshot) {
      var tag = snapshot.val();
      tag.forEach(function(entry) {
        InTabDemandes.push(entry);
    });
   },
    function (error) {
      console.log("Error : " + error.code);
   }
   )
  
   this.TabDemandes = InTabDemandes;

   var InTabUser2 = [];
   firebase.database().ref('/user/' + firebase.auth().currentUser.uid ).on("value", function(snapshot) {
     var tag = snapshot.val();
     tag.forEach(function(entry) {
       InTabUser2.push(entry);
   });
  },
   function (error) {
     console.log("Error : " + error.code);
  }
  )
  this.TabUser2 = InTabUser2;

  try{this.Nom = CryptoJS.AES.decrypt(this.TabUser2[0]['Nom'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);}catch{}
  try{this.Prenom = CryptoJS.AES.decrypt(this.TabUser2[0]['Prenom'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);}catch{}
  try{this.Ad_rue = CryptoJS.AES.decrypt(this.TabUser2[0]['Ad_rue_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);}catch{}
  try{this.Ad_postal = CryptoJS.AES.decrypt(this.TabUser2[0]['Ad_pos_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);}catch{}
  try{this.Ad_pays = CryptoJS.AES.decrypt(this.TabUser2[0]['Ad_pay_l'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);}catch{}
  try{this.Telephone = CryptoJS.AES.decrypt(this.TabUser2[0]['phoneNumber'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8);}catch{}

  if ((CryptoJS.AES.decrypt(this.TabUser2[0]['email'].trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8)).includes('outalma.com') == true)
    this.Emp = 1;
  }
  goback(){
    this.nav.navigateBack('/forms');
  }

  // récupère les paramètres de l'URL
  getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }

  // change en blanc la couleur des champs
  setColor(idlbl) {
    let id4elem = <HTMLElement>document.querySelector(idlbl);
    if (idlbl == "#Idesc_colis")
      id4elem.style.backgroundColor = "";
    else
      id4elem.style.borderColor = '#FFFFFF';
}
  ngOnInit() {
  }
 

  // Vérifie que les champs sont bien remplis
  checkAg()
  {
    var utc = Date.now();
    let elmpre = <HTMLElement>document.querySelector("#Iprenom");
    let elmnom = <HTMLElement>document.querySelector("#Inom");
    let elmtel = <HTMLElement>document.querySelector("#Itelephone");
    let elmdes = <HTMLElement>document.querySelector("#Idesc_colis");
    let elmweb = <HTMLElement>document.querySelector("#Iad_website");
    let elmtyp = <HTMLElement>document.querySelector("#Itype_envoi");
    let elmrue = <HTMLElement>document.querySelector("#Iad_rue");
    let elmpos = <HTMLElement>document.querySelector("#Iad_postal");
    let elmpay = <HTMLElement>document.querySelector("#Iad_pays");   

    if (this.Num_colis && this.Num_colis.length > 0)
      this.TabFields[0]['Num_colis'] = CryptoJS.AES.encrypt(this.Num_colis.trim(), this.VigiK.trim()).toString();
    if (this.Num_commande && this.Num_commande.length > 0)
      this.TabFields[0]['Num_com'] = CryptoJS.AES.encrypt(this.Num_commande.trim(), this.VigiK.trim()).toString();
    if (this.Desc_colis && this.Desc_colis.length > 0)
      this.TabFields[0]['Desc_colis'] = CryptoJS.AES.encrypt(this.Desc_colis.trim(), this.VigiK.trim()).toString();
    if (this.Type_envoi && this.Type_envoi.length > 0)
      this.TabFields[0]['Type_envoi'] = CryptoJS.AES.encrypt(this.Type_envoi.trim(), this.VigiK.trim()).toString();
    else
      this.TabFields[0]['Type_envoi'] = CryptoJS.AES.encrypt('Avion'.trim(), this.VigiK.trim()).toString();
    if (this.Date_livraison && this.Date_livraison.length > 0)
      this.TabFields[0]['Date_livraison'] = CryptoJS.AES.encrypt(this.Date_livraison.trim(), this.VigiK.trim()).toString();
    this.TabFields[0]['Date_crea'] = utc;
      
    //OBLIGATOIRES :
    if (!this.Prenom || this.Prenom.length < 1){
      elmpre.style.borderColor = '#FF0000';
      return; }
      else {
      this.TabFields[0]['Prenom'] = CryptoJS.AES.encrypt(this.Prenom.trim(), this.VigiK.trim()).toString();
      elmpre.style.borderColor = 'green'; 
      }

    if (!this.Nom || this.Nom.length < 1){
      elmnom.style.borderColor = '#FF0000';
      return; }
      else {
      this.TabFields[0]['Nom'] = CryptoJS.AES.encrypt(this.Nom.trim(), this.VigiK.trim()).toString();
      elmnom.style.borderColor = 'green';
      }

    if (!this.Telephone || this.Telephone.length < 10){
      elmtel.style.borderColor = '#FF0000';
      return; }
      else {
      this.TabFields[0]['Telephone'] = CryptoJS.AES.encrypt(this.Telephone.trim(), this.VigiK.trim()).toString();
      elmtel.style.borderColor = 'green';
    }

    if (!this.Desc_colis || this.Desc_colis.length < 4){
      elmdes.style.background = 'rgba(255, 0, 0, 0.2)';
      return; }
      else {
      this.TabFields[0]['Desc_colis'] = CryptoJS.AES.encrypt(this.Desc_colis.trim(), this.VigiK.trim()).toString();
      elmdes.style.background = 'white';
    }

    if (!this.Ad_website || this.Ad_website.length < 4){
      elmweb.style.borderColor = '#FF0000';
      return; }
      else {
      this.TabFields[0]['Site_prov'] = CryptoJS.AES.encrypt(this.Ad_website.trim(), this.VigiK.trim()).toString();
      elmweb.style.borderColor = 'green';
    }

    if (!this.Ad_rue || this.Ad_rue.length < 2){
      elmrue.style.borderColor = '#FF0000';
      return; }
      else {
      this.TabFields[0]['Ad_rue_l'] = CryptoJS.AES.encrypt(this.Ad_rue.trim(), this.VigiK.trim()).toString();
      elmrue.style.borderColor = 'green';
    }

    if (!this.Ad_postal || this.Ad_postal.length < 2){
      elmpos.style.borderColor = '#FF0000';
      return; }
      else {
      this.TabFields[0]['Ad_pos_l'] = CryptoJS.AES.encrypt(this.Ad_postal.trim(), this.VigiK.trim()).toString();
      elmpos.style.borderColor = 'green';
    }

    if (!this.Ad_pays || this.Ad_pays.length < 2){
      elmpay.style.borderColor = '#FF0000';
      return; }
      else{
      this.TabFields[0]['Ad_pay_l'] = CryptoJS.AES.encrypt(this.Ad_pays.trim(), this.VigiK.trim()).toString();
      elmpay.style.borderColor = 'green';
      }
      this.TabFields[0]['Liste_envies'] = "";


      
    if (this.Emp == 0)
      { this.TabFields[0]['UID'] = firebase.auth().currentUser.uid }

      this.writeUserData();
      this.presentToastBravo();
      this.nav.navigateBack('/forms');
  }

  // affiche message de confirmation
  async presentToastBravo() {
    const tooast = await this.toastCtrl.create({
      message: 'Votre demande a bien été enregistrée.',
      duration: 3000,
      position: 'middle',
      color : 'success'
    })
    tooast.present();
  }

  //écrit dans la base
  writeUserData() {
    var lengtha = 0
    firebase.database().ref('/suivi_details').on("value", function(snapshot) {
       var tag = snapshot.val();
       lengtha = tag.length;
    },
    function (error) {
       console.log("Error : " + error.code);
    })
    this.TabFields[0]['i'] = lengtha.toString();
    this.TabFields[0]['id'] = lengtha.toString();
  firebase.database().ref('suivi_details/' + lengtha).set(this.TabFields[0]).then(
            (data: DataTransfer) => {
              
            },
            (error) => {
            }
          );

        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        var TabFirstMsg = [];
        TabFirstMsg.push({DateMsg:utc, Message:CryptoJS.AES.encrypt('Votre demande est en cours de traitement'.trim(), this.VigiK.trim()).toString(), Notification:1, UserID:'Compute'});

          firebase.database().ref('/msg_suivi/' + (lengtha-1)).set(TabFirstMsg).then(
            (data: DataTransfer) => {
            },
            (error) => {
              console.log(error,TabFirstMsg);
            }
          );
  }

}