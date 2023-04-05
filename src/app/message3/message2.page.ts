import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ActionSheetController, NavController, IonContent, ToastController} from '@ionic/angular';
import * as firebase from 'firebase';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-message2',
  templateUrl: './message2.page.html',
  styleUrls: ['./message2.page.scss'],
})
export class Message2Page implements OnInit {
  VigiK="";
  Msg2Send;
  Type_notif;
  Filter=0;
  alive=true;
  @ViewChild(IonContent) contentArea: IonContent;
  @ViewChild('content') content:any;

  messages = [];
  messages_Notif = [];
  messages_Chat = [];
  indexer = 1;

  
  TabDemandes = [];
  TabUser2 = [];

  public remisa0 = "";

  initializer(){
    
    this.TabUser2 = null;
    var InTabUser2 = [];
     firebase.database().ref('/msg_sav/' + firebase.auth().currentUser.uid).on("value", function(snapshot) {
      var tag = snapshot.val();
      tag.forEach(function(entry) {
        InTabUser2.push(entry);
    });
   },
    function (error) {
   }
   )
   this.TabUser2 = InTabUser2;
   InTabUser2= null;

   var imessages = [
       {itext:'', idate:'', otext:'', odate:'', notif:0}
   ]; 
   var nmessages = [
     {itext:'', idate:'', otext:'', odate:'', notif:0}

   ];
   var VigiK = "";
      firebase.database().ref('/Cry/').on("value", function(snapshot) {
        var tag = snapshot.val();
        VigiK = tag[0]['Vigi'];},
      function (error) {
        console.log("Error : " + error.code);})

   for (var i=0, len=this.TabUser2.length; i<len; i++) {
    var d2= Date.now();
    var d3 = new Date(d2);
    var d1 = this.TabUser2[i]['date'];
    var date : number;
    console.log(d3.getTimezoneOffset())
    console.log(this.TabUser2[i]['offset'])
    console.log(new Date(d1));
    /*if(d3.getTimezoneOffset() <= this.TabUser2[i]['offset'] ){
       date = d1 + Math.abs(d3.getTimezoneOffset() - this.TabUser2[i]['offset'])*60*1000;
    }
    else{
       date = d1 - Math.abs(d3.getTimezoneOffset() - this.TabUser2[i]['offset'])*60*1000;
    }*/
    var datedf = new Date(d1);
    var localfr = datedf.toLocaleString('fr-FR',{
      weekday  : 'long',
      year : 'numeric',
      month : 'long',
      day : 'numeric',
      hour : 'numeric',
      minute: 'numeric',
      second:'numeric',
  
    })
    if (this.TabUser2[i]['UserID'] == firebase.auth().currentUser.uid)
    {
     imessages.push({itext:'', idate:'',
     otext:CryptoJS.AES.decrypt(this.TabUser2[i]['Message'].trim(),VigiK.trim()).toString(CryptoJS.enc.Utf8),
     odate:localfr , notif:0});
   }
    else
    {
    imessages.push({itext:CryptoJS.AES.decrypt(this.TabUser2[i]['Message'].trim(),VigiK.trim()).toString(CryptoJS.enc.Utf8),
     idate: localfr, otext:"", odate:"", notif:0});
     if (this.TabUser2[i]['Notification'] == 1){
       nmessages.push({itext:CryptoJS.AES.decrypt(this.TabUser2[i]['Message'].trim(),VigiK.trim()).toString(CryptoJS.enc.Utf8),
       idate:localfr, otext:"", odate:"", notif:0});
   }
  }
  }
 
   var car = {text:'', date:'01/02/1996'};

   this.messages = imessages;
   this.messages_Chat = imessages;
   this.messages_Notif = nmessages;
   console.log(this.messages);
   this.refreshPage();
  }

  constructor(private modalCtrl: ModalController, public actionSheetController: ActionSheetController,
    public navCtrl: NavController,public toastCtrl: ToastController) { ;
      var VigiK = "";
      this.presentToast()
      firebase.database().ref('/Cry/').on("value", function(snapshot) {
        var tag = snapshot.val();
        VigiK = tag[0]['Vigi'];},
      function (error) {
        console.log("Error : " + error.code);})
    setTimeout(() => {
      this.contentArea.scrollToBottom(300);
    }, 100);
    setTimeout(() => {
      this.refreshPage();
    }, 10000);
  }

  refreshPage(){  
    setTimeout(() => {
      this.cooling();
    }, 1000);
  }

  cooling(){
    if (window.location.href.indexOf("/message3") > -1) {
        this.initializer();
    }      
    setTimeout(() => {
      this.refreshPage();
    }, 100);
  }

  sort(){
  }

  close() {
    this.modalCtrl.dismiss();
  }
  Remisa0ftn(){
    this.remisa0=""
  }
  DateJour(){
    var date = new Date();
    return date.getDate();
  }
  DateMois(){
    var date =new Date();
    return date.getMonth()+1;
  }
  DateAnnee(){
    var date = new Date();
    return date.getUTCFullYear();
  }
  DateHour(){
    var date = new Date();
    return date.getHours();
  }
  DateMinute(){
    var date = new Date();
    return date.getMinutes();
  }
  DateSecond(){
    var date = new Date();
    return date.getSeconds();
  }

 date()
{
     // les noms de jours / mois
     var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
     var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
     // on recupere la date
     var date = new Date();
     // on construit le message
     var message = jours[date.getUTCDay()]+" ";  // nom du jour
     message += date.getUTCDate()+" ";           // jour du mois
     message += mois[date.getUTCMonth()]+ " ";   // mois
     message += date.getUTCFullYear();
     var heure = date.getUTCHours();
     var minutes = date.getUTCMinutes();
     var seconde = date.getUTCSeconds();
     var iminutes = "";
     var iheure ="";
     var isecond ="";
     if(minutes < 10)
           iminutes = "0"+minutes;
      else
          iminutes = ""+minutes;
      if(heure< 10)
        iheure = "0"+heure;
      else
        iheure = ""+heure;
      if(seconde< 10)
        isecond = "0"+seconde;
      else
        isecond = ""+seconde;
     return message+" à "+iheure+":"+iminutes+":"+isecond;
}

  writeUserData() {
    firebase.database().ref('/msg_sav/' + firebase.auth().currentUser.uid ).set(this.TabUser2).then(
              (data: DataTransfer) => {
                
              },
              (error) => {
                console.log(error,this.TabUser2);
              }
            );;
    }

  sendMsg() {
    var VigiK = "";
      firebase.database().ref('/Cry/').on("value", function(snapshot) {
        var tg = snapshot.val();
        VigiK = tg[0]['Vigi'];},
      function (error) {
        console.log("Error dans Cry: " + error.code);})
      var d1 = Date.now();
      var d2 = new Date(d1);
      var localDate = d2.toLocaleString('fr-FR',{
        weekday  : 'long',
        year : 'numeric',
        month : 'numeric',
        day : 'numeric',
        hour : 'numeric',
        minute: 'numeric',
        second:'numeric',
      });

    if (this.Type_notif && this.Type_notif.length > 0) {
      this.TabUser2.push({date : d1,offset: d2.getTimezoneOffset(),Message:CryptoJS.AES.encrypt(this.Type_notif.trim(), VigiK.trim()).toString(), Notification:1, UserID:firebase.auth().currentUser.uid});
      this.writeUserData();
      this.messages.push({itext:'',idate: '', otext: this.Type_notif, odate: localDate});
      this.Type_notif = "";
      setTimeout(() => {
        this.contentArea.scrollToBottom(300);
      }, 400);
    }
    else if (!this.Msg2Send || this.Msg2Send.length < 1)
      return;
    this.TabUser2.push({date: d1,offset: d2.getTimezoneOffset(), Message:CryptoJS.AES.encrypt(this.Msg2Send.trim(), VigiK.trim()).toString(), Notification:0, UserID:firebase.auth().currentUser.uid});
    this.writeUserData();
    this.messages.push({itext:'',idate : '', otext: this.Msg2Send, odate:localDate});
    this.Msg2Send = "";
    setTimeout(() => {
      this.contentArea.scrollToBottom(300);
    }, 400);
    this.refreshPage();
  }

  async Joindre() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Joindre un élément',
      buttons: [{
        text: 'Parcourir',
        role: 'add',
        icon: 'add',
        handler: () => {
        }
      },
       {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Bienvenue dans votre espace de discussions instantanées avec l'équipe Outalma. Vous pouvez poser vos questions et entamer une discussion avec notre équipe",
      duration: 120000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'OK',
      position:'top' ,
    });

    toast.present();
  }

 sorti() {
    this.contentArea.scrollToBottom(300);//300ms animation speed
  }

  ngOnInit() {
  }

}
