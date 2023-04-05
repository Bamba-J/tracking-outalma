import { Component, OnInit } from '@angular/core';
import { MessagePage } from '../Modal/message/message.page';
import { ModalController, NavController, ToastController, AlertController } from '@ionic/angular';
import { jsPDF } from "./jspdf.debug";
import {demoTwoPageDocument} from './basic';
import * as firebase from 'firebase';
import * as CryptoJS from 'crypto-js';
import { GetFrDate } from '../getfrdate';


interface Suivi {
  Atype?: string;
  Prenom?:string;
  Etat?:string;
  UID?;
}
var devis
var suivis: Suivi[] = [
];

 @Component({
  selector: 'app-suivi',
  templateUrl: './suivi.page.html',
  styleUrls:  ['./suivi.page.scss'],
})

export class SuiviPage implements OnInit {
  VigiK="";

  inp

  public suividem = [
    {
      id:4,
      i: '8989',
      etat:'En attente',
      date:'20/12/18',
      class:'gris',
      
    },
    {
      id:1,
      i: '3455',
      etat:'En cours de traitement',
      date:'10/02/19',
      class:'vert'
    },
    { id:2,
      i: '6789',
      etat:'En attente de réponse',
      date:'21/12/18',
      class:'rouge',
    },
    {
      id:3,
      i: '3678',
      etat:'En attente',
      date:'14/01/19',
      class:'gris',
    },

  ];

  refreshPage(){ 
    setTimeout(() => {
      this.cooling();
    }, 2000);
  }

  cooling(){
    setTimeout(() => {
      this.Voirdonnees();
      this.refreshPage();
    }, 1000);
  }


  public suivi = [];
  suivis = this.suivi
  suite

  constructor(private modalCtrl: ModalController, public navCtrl : NavController, public toaster: ToastController,
     public alertCtrl: AlertController) {
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tg = snapshot.val();
      VigiK = tg[0]['Vigi'];},
    function (error) {
      console.log("Error dans Cry: " + error.code);})
      this.VigiK = VigiK;
    this.refreshPage()
   }

  //Renvoie vers le modal de Chat pour suivi client
  async goToChat(id,Ad_pay_e,Ad_rue_e,Ad_pos_e, Ad_pay_l,Ad_rue_l,Ad_pos_l,Desc_colis,Site_prov,Telephone,Liste_envies,Type_envoi) {
    const modal = await this.modalCtrl.create({
      component: MessagePage,
      //Transfer des informations de la page au modal
      componentProps:{'suivi':this.suivi,
      'Adresse_liv':Ad_pay_l+" "+ Ad_pos_l +" "+Ad_rue_l,
      'Adresse_exp': Ad_pay_e+" "+ Ad_pos_e +" "+Ad_rue_e,
      'Desc_colis': Desc_colis,
      'Site_prov': Site_prov,
      "Telephone": Telephone,
      "List_envie": Liste_envies,
      "Type_envoi": Type_envoi,
       'i':id}
    });

    modal.present();
  }

  goToDemande(){
    this.navCtrl.navigateForward('tabs/tabs/forms');
  }

  //Charge les données de suivi depuis la base de données
  Voirdonnees(){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      
      var InTabDemandes = [];
      firebase.database().ref('/suivi_details' ).orderByChild("Date_crea").on("value", function(snapshot) {
        var sv = snapshot.val();
        // if(snapshot.val()==null){
        //   sv = "toto"
        //   console.log("sv")
        // }
        sv.forEach(function(entry) {
          console.log(entry['Date_crea']);
          var date= new Date(entry['Date_crea']);
          var localfr = date.toLocaleString('fr-FR',{
              weekday: 'long',
              day: 'numeric',
              year: 'numeric',
              month: 'numeric',
              minute: 'numeric',
              hour:'numeric',
              second:'numeric',
          });
        try {
        entry['Date_crea'] = localfr;
        }
        catch(e){
            console.log(e);
        }
          InTabDemandes.push(entry);
      });
      },
      function (error) {
       
    }
    );
    this.suivi = InTabDemandes;
    suivis = this.suivi
    const val = firebase.auth().currentUser.uid;
      if (val && val.trim() != '') {
         this.suivi = suivis.filter((s:Suivi) => {
          console.log(s.UID.toLowerCase().indexOf(val.toLowerCase()))
          this.suite = s.UID.toLowerCase().indexOf(val.toLowerCase())
            return (s.UID.toLowerCase().indexOf(val.toLowerCase()) > -1);
          
          
        })
        
      }
  }, 1000);
});
  }
  public Atype = this.suividem['0'].date

   async ngOnInit(){
   await this.Voirdonnees()
    suivis = this.suivi
    console.log("sv",this.suivi)
    // if(this.suivi==[]){
    //   this.suivi=[{'suivi':this.suAd_pay_eivi,
    //   'Adresse_liv':Ad_pay_l+" "+ Ad_pos_l +" "+Ad_rue_l,
    //   'Adresse_exp': +" "+ Ad_pos_e +" "+Ad_rue_e,
    //   'Desc_colis': Desc_colis,
    //   'Site_prov': Site_prov,
    //   "Telephone": Telephone,
    //   "List_envie": Liste_envies,
    //   "Type_envoi": Type_envoi,
    //    'i':id
    // }]
    // }
    
    if(true){
      var icon = "paper";
    }
    }
    async getItems3() {
      // Reset items back to all of the items
    await this.Voirdonnees()
  
      // set val to the value of the searchbar
      const val = firebase.auth().currentUser.uid;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
         this.suivi = await suivis.filter((s:Suivi) => {
          return (s.UID.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    }

    Accepter(id){
      firebase.database().ref('suivi_details/'+id+'/Etat').set('En attente de paiement').then(
              (snapshot) => {
                
              },
              (error) => {
                console.log(error);
              }
            );
          this.ngOnInit();
    }

    async delete(id){
      
      let prompt = await this.alertCtrl.create({
        header: 'voulez vous supprimer cette commande',
        buttons: [
          { 
            text: 'NON',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OUI',
            handler: data => {
              var toast = this.toaster
              firebase.database().ref('suivi_details/'+id).remove().then(async function() {
                const tooast= await toast.create({
                  message: 'supprimé avec succés',
                  duration: 5000,
                  color : 'success',
                  position: 'middle',
                  showCloseButton: true,
                  closeButtonText: 'FERMER',
                });
                tooast.present();
              })
              .catch(function(error) {
                console.log("Remove failed: " + error.message)
                alert(error.message)
              });
            }
          }
        ]
      });
      prompt.present();
      
        

    }

    //Renvoie vers le modal de présentation du PDF de Facturation
    goToPDF(id){
    firebase.database().ref('devis/'+ id).on("value", function (snapshot) {
      devis = snapshot.val();

    },
      function (error) {
      }
    )
    this.inp = devis
    var u = 0
    var inpu
    inpu = devis.length
    var input
    while (inpu != u) {
      input += "&lib" + u + "=" + this.inp[u]['Libellé'] + "&pri" + u + "=" + this.inp[u]['Prix']
      u++
    }

    window.open("https://tracking.outalma.com/facture/?a="+firebase.auth().currentUser.displayName+'&id='+id+'&y=2'+input+'','_system', 'location=yes')
      
    }
}
