import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController, ActionSheetController, NavController, IonContent, NavParams } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import { utf8Encode } from '@angular/compiler/src/util';
var sv
@Component({
  selector: 'app-msg-sav-employe',
  templateUrl: './msg-sav-employe.page.html',
  styleUrls: ['./msg-sav-employe.page.scss'],
})
export class MsgSavEmployePage implements OnInit{
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
 nomprenom ="";
  
  TabDemandes = [];
  TabUser2 = [];
  i = this.navPrm.get('i')
  suivi = this.navPrm.get('suivi');

  public remisa0 = "coucou";

  constructor(private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public navCtrl: NavController,
    public navPrm:NavParams) {
      
  }
  
  refreshPage(){ 
    setTimeout(() => {
      this.cooling();
    }, 1000);
  }
//Fonction de rechargement automatique des données de la page
  cooling(){
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }
  ngOnInit() {
    //Initialisation de l'encrypteur de données
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tg = snapshot.val();
      VigiK = tg[0]['Vigi'];},
    function (error) {
      console.log("Error dans Cry: " + error.code);})

    /*setTimeout(() => {
      this.contentArea.scrollToBottom(300);
    }, 200);*/
   this.TabUser2 = null;
   var InTabUser2 = [];
   var dispn="";
   //Récuperation des messages dans la base de données et decryptage
    firebase.database().ref('/msg_sav/' + this.i).on("value", function(snapshot) {
     var tg = snapshot.val();
     tg.forEach(function(entry) {
       InTabUser2.push(entry);
   });
  },
   function (error) {
     console.log("Error dans VoirDonnees: " + error.code);
  }
  )
 
  this.TabUser2 = InTabUser2;
  InTabUser2= null;

  var imessages = [
    {itext:'',idate:'', otext:'', odate:'', notif:0}
  ]; 
  var nmessages = [
    {itext:'', idate:'', otext:'', odate:'', notif:0}
  ];
  var tab =[];
  firebase.database().ref('/Gestion/').on("value", function(snapshot) {
    var tags = snapshot.val();
    tab = tags;
   },

     function (error) {
       console.log("Error : " + error.message);
    })

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
    for (var j=0; j<tab.length; j++){
      console.log(tab.length);
      var ID = this.TabUser2[i]['UserID']
      firebase.database().ref('/Gestion/').on("value", function(snapshot) {
        var tags = snapshot.val();
        if(tags[j]['ID']==ID){
          if(ID != firebase.auth().currentUser.uid){
           dispn= tags[j]["Prenom"]+" "+tags[j]["Nom"];
           console.log(dispn);
          }
        }
       }, 
       function (error) {
        console.log("Error : " + error.message);
     });
    }
    if (this.TabUser2[i]['UserID'] != this.i)
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

  var car = {text:'mdr', date:'01/02/1996'};
  this.nomprenom = dispn;
  this.messages = imessages;
  this.messages_Chat = imessages;
  this.messages_Notif = nmessages;
  console.log(this.messages);
  /*setTimeout(() => {
    this.contentArea.scrollToBottom(300);
  }, 200);*/
  this.refreshPage()
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
    return date.getTimezoneOffset();
  }
  DateMinute(){
    var date = new Date();
    return date.getMinutes();
  }
  DateSecond(){
    var date = new Date();
    return date.getSeconds();
  }

  //Enregistrement de l'etat du messages client
  writeUserData() {
    firebase.database().ref('/msg_sav/' + this.i ).set(this.TabUser2).then(
              (data: DataTransfer) => {
                
              },
              (error) => {
              }
            );;
    }

//Envoie des messages avec encryptage
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
  }


 sorti() {
    this.contentArea.scrollToBottom(300);//300ms animation speed ( renvoie le scroll de la page vers le bas)
  }



}

