

//!! Page en construction, comporte de nombreux bug !!//

import { Component, OnInit, DoCheck, OnChanges, AfterViewChecked, ɵConsole } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ValueTransformer } from '@angular/compiler/src/util';
import { MsgSavEmployePage } from '../Modal/msg-sav-employe/msg-sav-employe.page';
import { isUndefined } from 'util';
import * as CryptoJS from 'crypto-js';
var sv
var sv2
var message = [
  { text: 'Bonjour j\'ai une question.', date: '20 novembre 2018' },
];

@Component({
  selector: 'app-message2',
  templateUrl: './message2.page.html',
  styleUrls: ['./message2.page.scss'],
})
export class Message2Page implements OnInit {
  VigiK = "";
  email = "";
 /* static lastMessageLu = "";
  static i: number= 0;
  nombre : number;
  message = "";*/
  lastMessageRecu ="";
  refreshPage() {
    setTimeout(() => {
      this.cooling();
    }, 4000);
  }

  cooling() {
    setTimeout(() => {
      this.ngOnInit();
      this.refreshPage();
    }, 4000);
  }

  messages = [
    { Message: 'Bonjour j\'ai une question.', DateMsg: '20 novembre 2018', Nom: "FIFI", Prenom: "LOULOU", Id: "", UserID: "" },
    { Message: 'Bonjour j\'ai une question.', DateMsg: '20 novembre 2018', Nom: "FIFI", Prenom: "LOULOU", Id: "", UserID: "" }
  ];

  messages2 = [];
  users = [];

  lettre: any;
  nomUser: string;
  constructor(public actionSheetController: ActionSheetController,
    private modalCtrl: ModalController, ) {


    this.refreshPage();

    /*this.messages2 = sv*/

  }

  Jcroiscstbn3(id) {
    var m3 = this.messages2[id].length
    var Notification = this.messages2[id][m3 - 1].Notification
    if (Notification == 0) {
      Notification = "danger"
    } else {
      Notification = "primary"
    }
    return Notification
  }

  writeMsgData(id, messages2) {
    var m3 = messages2[id].length
    firebase.database().ref('msg_sav/' + id + "/" + (m3 - 1) + "/Notification").set(1).then(
      (snapshot) => {
      },
      (error) => {
      }
    );;
  }

  Jcroiscstbn(id) {
    var vigi
    firebase.database().ref('/Cry/').on("value", function (snapshot) {
      var valu = snapshot.val();
      vigi = valu[0]['Vigi'];
    },
      function (error) {
        console.log("Error dans Cry: " + error.code);
      })


    if (this.messages2 != undefined) {
      if (this.messages2[id] != undefined) {
        var m2 = this.messages2[id].length
         this.lastMessageRecu = CryptoJS.AES.decrypt(this.messages2[id][m2 - 1].Message.trim(), vigi.trim()).toString(CryptoJS.enc.Utf8);
         return this.lastMessageRecu;
         
      }
      else{
        return "";
      }
    }
    else 
    return "";
   /* var text;
    if (this.lastMessageRecu == Message2Page.lastMessageLu){
      Message2Page.i == 0;
    }
    
    else{
      for(var j= 0; j< m2; j++){
        text = CryptoJS.AES.decrypt(this.messages2[id][j].Message.trim(), vigi.trim()).toString(CryptoJS.enc.Utf8);
        if(Message2Page.lastMessageLu == text){
          Message2Page.i = m2-1-j;
        }
        
      }
    }
        this.nombre = Message2Page.i;
        this.message = Message2Page.lastMessageLu;
        console.log(this.nombre);
        console.log(this.message);
  }
  Jcroiscstbn2(id) {
    if (this.messages2 != undefined) {
      if (this.messages2[id] != undefined) {
        var m2 = this.messages2[id].length
        var Notification = this.messages2[id][m2 - 1].Notification
        if (Notification == 0) {
          Notification = "danger"
        } else {
          Notification = "primary"
        }
      }
    }
    return Notification*/

  }




  readMsgData() {
    var utilisateur = [];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
        var InTabDemandes = [];
        var vigi
          firebase.database().ref('/Cry/').on("value", function (snapshot) {
            var valu = snapshot.val();
            vigi = valu[0]['Vigi'];
          },
            function (error) {
              console.log("Error dans Cry: " + error.code);
            })

        firebase.database().ref('/Gestion').on("value", function (snapshot) {
          var tag = snapshot.val();
          tag.forEach(function(entry){
            InTabDemandes.push(entry);
          })
         
          console.log(InTabDemandes);
        },
          function (error) {
            console.log(error);
          }
        );
            console.log(InTabDemandes.length);
        
        for(var i = 0; i < InTabDemandes.length; i++){
          if (InTabDemandes[i]){
          var users2 = [];
          firebase.database().ref('/user/' + InTabDemandes[i]['ID']).on('value', function(snapshot){
            var info = snapshot.val();
            info.forEach(function(entry){
              users2.push(entry);
            })
            console.log(users2);
          },
          function (error) {
            console.log(error);
           }
          )
          this.email = CryptoJS.AES.decrypt(users2[0]["email"].trim(), vigi.trim()).toString(CryptoJS.enc.Utf8);
          if(!this.email.includes("@outalma.com")){
          utilisateur.push({Nom : InTabDemandes[i]['Nom'], Prenom : InTabDemandes[i]["Prenom"], ID : InTabDemandes[i]["ID"] })
        }
      }
      else
          console.log(i+"n'existe pas");
    }
        this.users = utilisateur;

      }, 1000);

    });
  }

  doRefresh(event) {

    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 2000);
  }

  readMsg2Data() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
        var InTabDemandes = [];
        firebase.database().ref('/msg_sav/').on("value", function (snapshot) {
          InTabDemandes = snapshot.val();
        },
          function (error) {
          }
        );
        this.messages2 = InTabDemandes;
      }, 2000);

    });
  }

  //Renvoie vers le modal de chat
  async goToChat(id) {
    var messages2 = this.messages2
    var messages = this.messages
    //Lis les messages et leur statut dans la base de données avant de les transmettre au modal de chat
    this.readMsg2Data()
    var writeMsgData = this.writeMsgData
    writeMsgData(id, messages2);
    const modal = await this.modalCtrl.create({
      component: MsgSavEmployePage,
      componentProps: { 'suivi': this.messages, 'i': id }
    });
    //Enregistre automatiquement les derniers et leur statut messages avant de fermer le modal
    modal.onWillDismiss().then(function () {
      writeMsgData(id, messages2);
      setTimeout(function () {
        firebase.database().ref('/msg_sav/').on("value", function (snapshot) {
          sv = snapshot.val();
        },
          function (error) {
          }
        );
        messages2 = sv
        var m3 = messages2[id].length
        firebase.database().ref('msg_sav/' + id + "/" + (m3 - 1) + "/Notification").set(1).then(
          (snapshot) => {
          },
          (error) => {
          }
        );;
        firebase.database().ref('/Gestion').on("value", function (snapshot) {
          sv2 = snapshot.val();
        },
          function (error) {
          }
        );
        messages = sv2;
      }, 100)
    })
    modal.present();
  //  Message2Page.lastMessageLu = this.lastMessageRecu;

  }


  ngOnInit() {

    setTimeout(() => {
      this.readMsg2Data()
      this.readMsgData()
    }, 1000);

  }

  getItems2(ev: any) {
    // Reset items back to all of the items
    this.readMsgData();

    // set val to the value of the searchbar
    const val = "k";

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.messages = this.messages.filter((s) => {
        return (s.Id.toLowerCase().indexOf(s.UserID.toLowerCase()) > -1);
      })
    }
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

}