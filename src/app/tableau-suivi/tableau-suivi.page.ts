import { Component, OnInit, DoCheck } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs/Subscription';
import { callbackify } from 'util';
import { bindCallback, bindNodeCallback } from 'rxjs';
import { MessagePage } from '../Modal/message/message.page';
import { ModalController } from '@ionic/angular';
import { DevisPage } from '../Modal/devis/devis.page';
import { FacturePage } from '../Modal/facture/facture.page';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import{GetFrDate} from '../getfrdate'

interface Suivi {
  Atype?: string;
  Prenom?:string;
  Etat?:string;
  UID?;
  Nom?;
  Date_crea?;
  id?;
}

var suivis: Suivi[] = [
];

var devis
var frdate: GetFrDate;
@Component({
  selector: 'app-tableau-suivi',
  templateUrl: './tableau-suivi.page.html',
  styleUrls: ['./tableau-suivi.page.scss','/bootstrap.css'],
  
})


export class TableauSuiviPage implements OnInit { 
  static i : number = 0;
  VigiK="";
  constructor(private modalCtrl: ModalController,private HttpCLient: HttpClient,
    ) {
      var d1 =  Date.now();
      console.log(d1);
      var d2 = new Date (d1);
      let dateLocale = d2.toLocaleString('fr-FR',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'});
console.log(dateLocale);
console.log(d2.getTimezoneOffset()-2);
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tag = snapshot.val();
      VigiK = tag[0]['Vigi'];},
    function (error) {
      console.log("Error : " + error.code);})
    this.Voirdonnees();
    
  }
  page = 1;
  pageSize = 4;
  collectionSize=10;
  i=0;
  inp
  CreateInp(){
    this.i=this.i+1
  var monInput = document.createElement("input");
  var monInput2 = document.createElement("br");
  monInput.type="text";
  monInput.innerHTML= "cocacola";
  var container = document.getElementById('contains');
  monInput.id='input'+this.i;
  container.appendChild(monInput);
  container.appendChild(monInput2);
  }
  indice(){
    TableauSuiviPage.i++;
    var a = TableauSuiviPage.i ;
    a++
    return a;
  }

  GetValInpu(){
    var a=0
   while(a!=this.i){
     a++
    var inp = (<HTMLInputElement>document.getElementById('input'+a)).value;
    
    
   }
   }

   selectChanged() {
    this.page = 1;
  }

   Switch2Page(conversion:string) {
    if (conversion=="backward") {
      if (this.page > 1)
        this.page = this.page - 1;
        }  
    else {
        if (this.collectionSize - (this.page*this.pageSize) > 0)
        this.page = this.page + 1;
        }  
  }  

  getItems2(ev: any) {
    // Reset items back to all of the items
    this.Voirdonnees();

    // set val to the value of the searchbar
    const val = "Demande";

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      suivis = suivis.filter((s) => {
        return (s.Atype.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getItems3(ev: any) {
    // Reset items back to all of the items
    this.Voirdonnees();

    // set val to the value of the searchbar
    const val = "Colis";

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      suivis = suivis.filter((s) => {
        return (s.Atype.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.Voirdonnees();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      suivis = this.suivis.filter((s) => {
        return (s.Etat.toLowerCase().indexOf(val.toLowerCase()) > -1||s.Prenom.toLowerCase().indexOf(val.toLowerCase()) > -1||s.Nom.toLowerCase().indexOf(val.toLowerCase()) > -1||s.Date_crea.toLowerCase().indexOf(val.toLowerCase())> -1||s.id.toLowerCase().indexOf(val.toLowerCase())> -1);
      })
    }
  }


async goToChat(id,Ad_pay_e,Ad_rue_e,Ad_pos_e, Ad_pay_l,Ad_rue_l,Ad_pos_l,Desc_colis,Site_prov,Telephone,Liste_envies,Type_envoi) {
  console.log("ChatT'asCliqué",id)
  var Voirdonnees =this.Voirdonnees
  const modal = await this.modalCtrl.create({
    component: MessagePage,
    componentProps:{'suivi':suivis, 
    'Adresse_liv':Ad_pay_l+" "+ Ad_pos_l +" "+Ad_rue_l,
    'Adresse_exp': Ad_pay_e+" "+ Ad_pos_e +" "+Ad_rue_e,
    'Desc_colis': Desc_colis,
    'Site_prov':Site_prov,
    "Telephone": Telephone,
    "List_envie":Liste_envies,
    "Type_envoi":Type_envoi,

    'i':id},
    mode:"ios"
  });
  modal.onWillDismiss().then(function(){Voirdonnees()})
  modal.present();
}

  async goToDevis(id,Ad_pay_e,Ad_rue_e,Ad_pos_e, Ad_pay_l,Ad_rue_l,Ad_pos_l,Desc_colis,Site_prov,Telephone,Liste_envies,Type_envoi,Nom,Prenom) {
    console.log("DevT'asCliqué",id)
    var Voirdonnees =this.Voirdonnees
    const modal = await this.modalCtrl.create({
      component: DevisPage,
      componentProps:{'suivi':suivis, 
      'Adresse_liv':Ad_pay_l+" "+ Ad_pos_l +" "+Ad_rue_l,
      'Adresse_exp': Ad_pay_e+" "+ Ad_pos_e +" "+Ad_rue_e,
      'Desc_colis': Desc_colis,
      'Site_prov':Site_prov,
      "Telephone": Telephone,
      "List_envie":Liste_envies,
      "Type_envoi":Type_envoi,
      "Nom":Nom +" "+ Prenom,
      'i':id},
      mode:"ios"
    });
    modal.onWillDismiss().then(function(){Voirdonnees()})
    modal.present();
  }

  async goToFacture(id,Ad_pay_e,Ad_rue_e,Ad_pos_e, Ad_pay_l,Ad_rue_l,Ad_pos_l,Desc_colis,Site_prov,Telephone,Liste_envies,Type_envoi,Nom,Prenom) {
    console.log("FactT'asCliqué",id)
    const modal = await this.modalCtrl.create({
      component: FacturePage,
      componentProps:{'suivi':suivis, 
      'Adresse_liv':Ad_pay_l+" "+ Ad_pos_l +" "+Ad_rue_l,
      'Adresse_exp': Ad_pay_e+" "+ Ad_pos_e +" "+Ad_rue_e,
      'Desc_colis': Desc_colis,
      'Site_prov':Site_prov,
      "Telephone": Telephone,
      "List_envie":Liste_envies,
      "Type_envoi":Type_envoi,
      "Nom":Nom +" "+ Prenom,
      'i':id},
      mode:"ios"
    });
    
    modal.present();
  }

  writeUserData() {
    firebase.database().ref('suivi/').set(suivis).then(
            (snapshot) => {
              console.log();
              
            },
            (error) => {
              console.log(error,suivis);
            }
          );;
  }

  writeUserData3() {
    firebase.database().ref('suivi/').push().set({
      id: '0',
      name: 'Noname',
      etat:'En transit',
      date:'20/12/1001',
      color:'danger'

    }).then(
            (data: DataTransfer) => {
              console.log(data);  
            },
            (error) => {
              console.log(error,suivis);
            });
  }

  
  

  Facture(id,Ad_pay_e,Ad_rue_e,Ad_pos_e, Ad_pay_l,Ad_rue_l,Ad_pos_l,Desc_colis,Site_prov,Telephone,Liste_envies,Type_envoi,Nom,Prenom) {
    firebase.database().ref('devis/'+ id).on("value", function (snapshot) {
      devis = snapshot.val();

    },
      function (error) {
        console.log("Error : " + error.code);
      }
    )
    if(devis!=undefined){
    this.inp = devis
    var u = 0
    var inpu
    inpu = this.inp.length
    var input
    while (inpu != u) {
      input += "&lib" + u + "=" + this.inp[u]['Libellé'] + "&pri" + u + "=" + this.inp[u]['Prix']
      u++
    }

    window.open("https://tracking.outalma.com/facture/?a="+Nom+" "+Prenom+'&id='+id+'&y=2'+input+'','_system', 'location=yes')
  }else{
    this.goToFacture(id,Ad_pay_e,Ad_rue_e,Ad_pos_e, Ad_pay_l,Ad_rue_l,Ad_pos_l,Desc_colis,Site_prov,Telephone,Liste_envies,Type_envoi,Nom,Prenom)
  }

  }


  Voirdonnees() {
    var collectionSize;
    var InTabDemandes = [];
    var a = 0;
    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tag = snapshot.val();
      VigiK = tag[0]['Vigi'];},
    function (error) {
      console.log("Error : " + error.code);})
    firebase.database().ref('/suivi_details').orderByChild("Date_crea").on("value", function (snapshot)  {
      var suivibdd = snapshot.val();
      collectionSize = snapshot.val().length;

      suivibdd.forEach(function (entry, i = 0) {
        a = i++;
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
      //  var datelocale = frdate.GetDateOF(entry['Date_crea']);
        try{ 
        entry['Date_crea'] =localfr;
        entry['id'] = a;
        entry['i'] =a;
        entry['Ad_pay_e'] = CryptoJS.AES.decrypt(entry['Ad_pay_e'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Ad_pay_l'] = CryptoJS.AES.decrypt(entry['Ad_pay_l'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Ad_pos_e'] = CryptoJS.AES.decrypt(entry['Ad_pos_e'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Ad_pos_l'] = CryptoJS.AES.decrypt(entry['Ad_pos_l'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Ad_rue_e'] = CryptoJS.AES.decrypt(entry['Ad_rue_e'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Ad_rue_l'] = CryptoJS.AES.decrypt(entry['Ad_rue_l'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Date_livraison'] = CryptoJS.AES.decrypt(entry['Date_livraison'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Desc_colis'] = CryptoJS.AES.decrypt(entry['Desc_colis'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Liste_envies'] = CryptoJS.AES.decrypt(entry['Liste_envies'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Nom'] = CryptoJS.AES.decrypt(entry['Nom'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Num_colis'] = CryptoJS.AES.decrypt(entry['Num_colis'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Num_com'] = CryptoJS.AES.decrypt(entry['Num_com'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Prenom'] = CryptoJS.AES.decrypt(entry['Prenom'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Site_prov'] = CryptoJS.AES.decrypt(entry['Site_prov'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Telephone'] = CryptoJS.AES.decrypt(entry['Telephone'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        entry['Type_envoi'] = CryptoJS.AES.decrypt(entry['Type_envoi'].trim(), VigiK.trim()).toString(CryptoJS.enc.Utf8);
        }
        catch(e){
            console.log(e);
        }
        InTabDemandes.push(entry);
        i = i+1;
      })
    },
      function (error) {
        console.log("Error : " + error.code);
      }
    )
    suivis = InTabDemandes;

  }
  
  inputDisabled: boolean;



  ngDoCheck(){
    this.collectionSize =suivis.length
  }
  ngOnInit() {

    this.Voirdonnees();
  }

  Annuler(){
    this.Voirdonnees()
    this.inputDisabled=true;
  }

  Valider(){
    this.writeUserData()
    this.inputDisabled=true;
    this.Voirdonnees()
   
  }
  Modifier(id)
  {
   if(this.inputDisabled=true){
      this.inputDisabled=false;
    }else{
      this.inputDisabled=true;
      this.Voirdonnees()
    }   
  }

  Modifier2()
  {
    this.inputDisabled=false;
  }
  get suivis(): Suivi[] {
    return suivis
  }

}

