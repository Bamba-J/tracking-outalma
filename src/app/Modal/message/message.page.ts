import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ActionSheetController, NavParams, NavController, IonContent} from '@ionic/angular';
import * as firebase from 'firebase';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  VigiK="";
  Msg2Send;
  Type_notif;
  Filter=0;
  alive=true;
  ad=false;
  @ViewChild(IonContent) contentArea: IonContent;
  @ViewChild('content') content:any;

  nomprenom = "" ;
  messages = [];
  messages_Notif = [];
  messages_Chat = [];
  disp_name;

  refresh(){
    setTimeout(() => {
      this.ngOnInit();
      this.cooling();
      
    }, 1000);
  }
  cooling(){
    setTimeout(() => {
      this.refresh();
      
    }, 1000)
    
  }
  
  TabDemandes = [];
  TabUser2 = [];

  public remisa0 = "coucou";
  i = this.navPrm.get('i');
  Telephone = this.navPrm.get('Telephone');
  suivi = this.navPrm.get('suivi');

  ngOnInit() {
    var VigiK = "";
      firebase.database().ref('/Cry/').on("value", function(snapshot) {
        var tag = snapshot.val();
        VigiK = tag[0]['Vigi'];},
      function (error) {
        console.log("Error : " + error.code);})
        this.VigiK = VigiK;


      this.changeSuiviLu();

      
      this.TabUser2 = null;
      var InTabUser2 = [];
      firebase.database().ref('/msg_suivi/' + this.i).on("value", function(snapshot) {
       var tag = snapshot.val();
        InTabUser2 = tag;
    },
     function (error) {
       console.log("Error dans VoirDonnees: " + error.code);
    }
    )
    this.TabUser2 = InTabUser2;
    InTabUser2= null;
    

    var imessages = [
        {inom: '', itext: '', idate:'', onom:'', otext:'', odate:'', notif:0}
    ]; 
    var nmessages = [
      {inom: '', itext: '', idate:'', onom:'', otext:'', odate:'', notif:0}
    ];
    var emaicur = firebase.auth().currentUser.email;
    if (emaicur.includes('outalma.com') == true)
    {
      this.ad=true;
    }
    var nom = "";
    var tab=[];
    firebase.database().ref('/Gestion/').on("value", function(snapshot) {
      var tags = snapshot.val();
      tab = tags;
     },

       function (error) {
         console.log("Error : " + error.message);
      })
    

    for (var i=1, len=this.TabUser2.length; i<len; i++) {
      
      var vigik = this.VigiK;
      var dispn = "";
      var emain = "";
      var tag ;
      var d2= Date.now();
      var d3 = new Date(d2);
      var d1 = this.TabUser2[i]['DateMsg'];
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
    
        if (this.TabUser2[i]['UserID'] == firebase.auth().currentUser.uid)
        {
          imessages.push({inom:'', itext:'', idate:'', onom: firebase.auth().currentUser.displayName , otext: CryptoJS.AES.decrypt(this.TabUser2[i]['Message'].trim(),   vigik.trim()).toString(CryptoJS.enc.Utf8), odate: localfr, notif: this.TabUser2[i]['Notification']});
        }
        else if (emain.includes('outalma.com') == true &&
        emaicur.includes('outalma.com') == true)
        {
          imessages.push({inom:'', itext:'', idate:'', onom: firebase.auth().currentUser.displayName, otext: CryptoJS.AES.decrypt(this.TabUser2[i]['Message'].trim(),  vigik.trim()).toString(CryptoJS.enc.Utf8), odate: localfr, notif: this.TabUser2[i]['Notification']});
        }
        else
        {
          imessages.push({inom:  dispn, itext:CryptoJS.AES.decrypt(this.TabUser2[i]['Message'].trim(),   vigik.trim()).toString(CryptoJS.enc.Utf8), idate:localfr, onom:'', otext: '', odate: '', notif: this.TabUser2[i]['Notification']});
          nom = dispn;
          if (this.TabUser2[i]['Notification'] == 1)
            nmessages.push({inom:  dispn, itext:CryptoJS.AES.decrypt(this.TabUser2[i]['Message'].trim(),   vigik.trim()).toString(CryptoJS.enc.Utf8), idate:localfr, onom:'', otext: '', odate: '', notif: this.TabUser2[i]['Notification']});
        }
      }
  
    var car = {text:'mdr', date:'01/02/1996'};

    this.nomprenom = nom;
    this.messages = imessages;
    this.messages_Chat = imessages;
    this.messages_Notif = nmessages;
    setTimeout(() => {
      this.contentArea.scrollToBottom(300);
    }, 200);
  }
  constructor(private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public navPrm:NavParams,
    private HttpCLient: HttpClient,
    public navCtrl: NavController) { 
      this.refresh();
      
  }

  // affiche juste les notifications ou la discussion en entier
  sort(){
    if (this.Filter == 0)
    {
      this.alive = false;
      this.Filter = 1;
      this.messages = this.messages_Notif;
    }
    else
    {
      this.alive = true;
      this.Filter = 0;
      this.messages = this.messages_Chat;
    }
    setTimeout(() => {
      this.contentArea.scrollToBottom(300);
    }, 200);
  }

  close() {
    this.modalCtrl.dismiss();
  }
  Remisa0ftn(){
    this.remisa0="";
  }

  writeUserData() {
    var lena = 0
    var tablen = 0;
    firebase.database().ref('/msg_suivi/' + this.i).on("value", function(snapshot) {
       var tag = snapshot.val();
       lena = tag.length;
    },
    function (error) {
       console.log("Error : " + error.code);
    })
    if (this.TabUser2.length > lena)
      tablen = this.TabUser2.length;
    else
      tablen = lena;
    firebase.database().ref('/msg_suivi/' + this.i + '/' + lena).set(this.TabUser2[lena]).then(
              (data: DataTransfer) => {
              },
              (error) => {
                console.log(error,this.TabUser2);
              }
            );
    }

    //passe le statut d'une discussion en "lue"
    changeSuiviLu() {
      var TabDetails = [];
        
        firebase.database().ref('/suivi_details/' + this.i).on("value", function(snapshot) {
              var tag = snapshot.val();
              TabDetails = tag;
          },
          function (error) {
              console.log("Error dans VoirDonnees: " + error.code);
          }
        );
        if (TabDetails['Priorite'].includes('rouge') == true)
        {
        TabDetails['Priorite'] = 'gris';      
        firebase.database().ref('suivi_details/' + this.i + '/').set(TabDetails).then(
          (data: DataTransfer) => {
            
          },
          (error) => {
            console.log('decoy' + error,TabDetails);
          }
        );
      }
    }

    //Changement de la priorité/couleur d'un message
    changeSuiviPrio() {
      var TabDetails = [];
        
        firebase.database().ref('/suivi_details/' + this.i).on("value", function(snapshot) {
              var tag = snapshot.val();
              TabDetails = tag;
          },
          function (error) {
              console.log("Error : " + error.code);
          }
        );
        
        TabDetails['Priorite'] = 'rouge';      
        firebase.database().ref('suivi_details/' + this.i + '/').set(TabDetails).then(
          (data: DataTransfer) => {
            
          },
          (error) => {
            console.log('decoy' + error,TabDetails);
          }
        );

    }

    //Envoi d'une notification par SMS
    changeSuiviDetails() {

        var TabDetails = [];
        
        firebase.database().ref('/suivi_details/' + this.i).on("value", function(snapshot) {
              var tag = snapshot.val();
              TabDetails = tag;
          },
          function (error) {
              console.log("Error : " + error.code);
          }
        );
      if (this.Type_notif.includes('traitement') == true)
      {
        TabDetails['Priorite'] = 'gris';
        TabDetails['Etat'] = 'En traitement';
        TabDetails['icon'] = 'paper';
        TabDetails['Atype'] = 'Demande';
      }
      else if (this.Type_notif.includes('charge') == true)
      {
        TabDetails['Priorite'] = 'gris';
        TabDetails['Etat'] = 'Paiement accepté';
        TabDetails['icon'] = 'paper';
        TabDetails['Atype'] = 'Demande';
      }
      else if (this.Type_notif.includes('expédié') == true)
      {
        TabDetails['Priorite'] = 'gris';
        TabDetails['Etat'] = 'Expédié';
        TabDetails['icon'] = 'cube';
        TabDetails['Atype'] = 'Colis';
      }
      else if (this.Type_notif.includes('livraison') == true)
      {
        TabDetails['Priorite'] = 'gris';
        TabDetails['Etat'] = 'En cours de livraison';
        TabDetails['icon'] = 'cube';
        TabDetails['Atype'] = 'Colis';
      }
      else if (this.Type_notif.includes('livré') == true)
      {
        TabDetails['Priorite'] = 'vert';
        TabDetails['Etat'] = 'Livré';
        TabDetails['icon'] = 'logo-dropbox'; 
        TabDetails['Atype'] = 'Colis';
      }
      firebase.database().ref('suivi_details/' + this.i + '/').set(TabDetails).then(
        (data: DataTransfer) => {
          
        },
        (error) => {
          console.log('decoy' + error,TabDetails);
        }
      );
    }

    SendSMS() {
    }

  //Envoi d'un message
  sendMsg() {
    var username;
    var d1 = Date.now();
    var d2 = new Date(d1);
    var localDate = d2.toLocaleString('fr-FR',{
      weekday  : 'long',
      year : 'numeric',
      month : 'long',
      day : 'numeric',
      hour : 'numeric',
      minute: 'numeric',
      second:'numeric',
    });
    if (this.Type_notif && this.Type_notif.length > 0) {
      this.TabUser2.push({Nom:firebase.auth().currentUser.displayName, DateMsg:d1, Message:CryptoJS.AES.encrypt(this.Type_notif.trim(), this.VigiK.trim()).toString(), Notification:1, UserID:firebase.auth().currentUser.uid});
      this.writeUserData();
      this.changeSuiviDetails();


      
      var Message = this.Type_notif;
      this.HttpCLient.get("https://api.allmysms.com/http/9.0/?login=pdieye&apiKey=567cae5f68e5385&message=" + Message + "&mobile="+this.Telephone+"&tpoa=OUTALMA").subscribe(
        (response) => {
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

      this.messages.push({inom: '', itext:'', idate:'', onom:firebase.auth().currentUser.displayName, otext: this.Type_notif, odate: localDate, notif:1});
      this.Type_notif = "";    
      this.Msg2Send = "";   
      setTimeout(() => {
        this.contentArea.scrollToBottom(300);
      }, 400);
    }
    else if (!this.Msg2Send || this.Msg2Send.length < 1)
      return;
    this.TabUser2.push({Nom:firebase.auth().currentUser.displayName,DateMsg:d1, Message:CryptoJS.AES.encrypt(this.Msg2Send.trim(), this.VigiK.trim()).toString(), Notification:0, UserID:firebase.auth().currentUser.uid});
    this.writeUserData();
    
      if (firebase.auth().currentUser.email.includes('outalma.com') == true)
      {
        this.changeSuiviPrio();
      }
  

    this.messages.push({inom:'', itext:'', idate:'', onom:firebase.auth().currentUser.displayName, otext: this.Msg2Send, odate: localDate, notif:0});
    this.Msg2Send = "";  
    setTimeout(() => {
      this.contentArea.scrollToBottom(300);
    }, 400);
  }

  //fonction pour ajouter un fichier. (INACTIVE)
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

  //fait défiler la discussion jusqu'aux derniers messages
  sorti() {
    this.contentArea.scrollToBottom(300);//300ms animation speed
  }

  

}