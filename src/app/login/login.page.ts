import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController, ToastController, AlertController, ModalController, IonSearchbar } from '@ionic/angular';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/Services/auth.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import * as firebase from 'firebase';
import { LoadingProvider } from 'src/providers/loading/loading';
import { userInfo } from 'os';
import { SignInPage } from '../Modal/sign-in/sign-in.page';
import { ContactPage } from '../Modal/contact/contact.page';
import { UpPasswordPage } from '../Modal/up-password/up-password.page';
import { UpPhonePage } from '../Modal/up-phone/up-phone.page';
import { when } from 'q';
import { HttpClient } from '@angular/common/http';
import { RgpdCookiesPage } from '../Modal/rgpd-cookies/rgpd-cookies.page';
import { RgpdConfidentialitePage } from '../Modal/rgpd-confidentialite/rgpd-confidentialite.page';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

  }
  authForm: FormGroup;
  errorMessage: any;
  isAuth: boolean;
  mdp8char = "";
  userData: any;
  email: AbstractControl;
  password: AbstractControl;
  passwordtype: string = 'password';
  passeye: string = 'eye';
  passwordtype2: string = 'password';
  passeye2: string = 'eye';
  loadingProvider: LoadingProvider;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  phoneNumber: AbstractControl;
  userName: AbstractControl;
  password2: AbstractControl;
  public recaptchaVerifier2: firebase.auth.RecaptchaVerifier;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private HttpCLient: HttpClient,
    private app : AppComponent,
    private router: Router, @Inject(DOCUMENT) document) {

  }
  inputValue: string;

  ngOnInit() {
    this.presentToastRGPD()
    firebase.auth().languageCode = 'fr';
    this.initForm();
    this.menuCtrl.enable(false);
    if (this.recaptchaVerifier != undefined) {
      this.recaptchaVerifier.clear()
    }

  }


  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container-login', {
      // 'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved - will proceed with submit function
        console.log(response);
        return true;
      },
      'expired-callback': function () {
        // Reset reCAPTCHA?
        this.recaptchaVerifier.clear()
        console.log('expired-callback');
      }
    });
  }


  signIn() {
    this.ionViewDidLoad();
    const appVerifier = this.recaptchaVerifier;
    const num = this.authForm.get('phoneNumber').value;
    const email2 = num + '@fakemail.outalma';
    const phoneNumber = '+' + num;
    const password = this.authForm.get('password').value;
    const SubmitForm = this.onSubmitForm
    const authServ = this.authService
    const move = this.moveToHome;
    const nav = this.navCtrl
    const menu = this.menuCtrl
    const app =  this.app
    var str = phoneNumber;
    var ret = "";
    var toast = this.toastCtrl;
    var presentToast = this.presentToast;
    var deconnect = this.deconnect;
    if (this.authForm.get('password').valid == true && this.authForm.get('phoneNumber').valid == true) {

      for (var i = 0; i < str.length; i++) {
        if (i >= str.length - 3) {
          ret += str.charAt(i);
        }
        else {
          ret += "x";
        }
      }




      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
       .then(async confirmationResult => {
          let prompt = await this.alertCtrl.create({
            header: 'Un code de confimation a été envoyé au : ' + '+' + ret,
            inputs: [{ name: 'confirmationCode', placeholder: 'Entrez le code de confirmation' }],
            buttons: [
              {
                text: 'ANNULER',
                handler: data => { console.log('Cancel clicked'); this.recaptchaVerifier.clear() }
              },
              {
                text: 'VALIDER',
                handler: data => {
                  confirmationResult.confirm(data.confirmationCode)
                    .then(function (result) {

                      SubmitForm(password, app, move, nav, menu, toast, deconnect, presentToast);
                     
                      appVerifier.clear();
                    }).catch(function (error) {
                      console.log(error);
                      presentToast(error, toast);
                      appVerifier.clear();
                      // L'utilisateur ne peut pas se connecter 
                      // ...
                    });
                }
              }
            ]
          });
          prompt.present();
        })

        .catch(function (error) {
          console.error('SMS not sent', phoneNumber, error);
          presentToast(error, toast);
          appVerifier.clear()
        });

    } else {
      var err = { code: "Input erronés", message: "" }
      presentToast(err, toast)
    }

  }


  initForm() {
    this.authForm = this.formBuilder.group({
      'password': [null, Validators.compose([Validators.required])],
      'phoneNumber': [null, Validators.compose([Validators.required])],
    });

    this.password = this.authForm.controls['password'];
    this.phoneNumber = this.authForm.controls['phoneNumber'];
  }

  goToSecondPage() {
    this.navCtrl.navigateForward('tabs/tabs/suivi');
    this.menuCtrl.enable(true);
  }



  async goToSignIn() {
    const modal = await this.modalCtrl.create({
      component: SignInPage,
      mode: "ios",
      showBackdrop: true,
    });

    modal.present();
    modal.onDidDismiss().then(function () {
      firebase.auth().signOut()
    })
    // modal.onWillDismiss().then(function () {
    //   firebase.auth().signOut()
    // })
  }

  async goToRGPGCookies() {
    const modal = await this.modalCtrl.create({
      component: RgpdCookiesPage,
      mode: "ios",
      showBackdrop: true,
    });
    modal.present();
  }

  async goToRGPGConfidentialite() {
    const modal = await this.modalCtrl.create({
      component: RgpdConfidentialitePage,
      mode: "ios",
      showBackdrop: true,
    });
    modal.present();
  }


  deconnect() {
    firebase.auth().signOut();
  }

 

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
    modal.onWillDismiss().then(function () {
      firebase.auth().signOut()
    })
  }

  async goToContact() {
    const modal = await this.modalCtrl.create({
      component: ContactPage,
      mode: "ios",
      showBackdrop: true,
    });

    modal.present();
  }

 async onSubmitForm(password,app, move, nav, menu, toast, deconnect, presentToast) {
  
    let email = firebase.auth().currentUser.email;
    console.log(email);
   
    if (email == null) {
      var err = { code: "auth/not existe", message: ""}
      presentToast(err, toast);
    }
    else if(firebase.auth().currentUser.emailVerified == false){
            alert("VALIDEZ VOTRE ADRESSE MAIL");
    }
     else {
      try{
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
          if(result){
            move(app);
          }
        }
        catch(e){
          deconnect();
          menu.enable(false);
          console.log('err', e);
          presentToast(e, toast);
        }
    }
  }

  moveToHome(app) {
    app.refreshPage();
  }

  async presentToast(err, toast) {
    if (err.code == "auth/provider-already-linked") {
      err.message = "Cet utilisateur existe déjà."
    } else if (err.code == "auth/argument-error") {
      err.message = "Veuillez vérifier les paramètres du formulaire."
    } else if (err.code == "auth/network-request-failed") {
      err.message = "Veuillez vérifier vos paramètres réseau."
    }
    else if(err.code == "auth/too-many-requests"){
      err.message = "ce compte est bloqué momentannement par mesure de sécurité veuillez réessayer plus tard"
    }
     else if (err.code == "auth/invalid-email") {
      err.message = "L'email est invalide."
    } else if (err.code == "auth/invalid-phone-number") {
      err.message = "Le format du numéro de téléphone est invalide."
    } else if (err.code == "auth/wrong-password") {
      err.message = "Le mot de passe est invalide."
    } else if (err.code == "auth/user-disabled") {
      err.message = "Le compte a été désactivé par un administrateur. Veuillez contacter le service client."
    } else if (err.code == "auth/weak-password") {
      err.message = "Le mot de passe doit contenir 6 caractères."
    }
    else if(err.code == "auth/invalid-verification-code"){
      err.message = "code incorrect réessayez"
    }
    else if(err.code == "auth/not existe"){
      err.message = "le numéro saisi n'est pas authentifiable"
    }
    else if (err.code == "Input erronés") {
      err.message = "Veuillez vérifier les valeurs entrées."
    } else if (err.message == "Unable to load external reCAPTCHA dependencies!") {
      err.message = "Veuillez vérifier votre connexion internet."
      if (this.recaptchaVerifier != undefined) {
        this.recaptchaVerifier.clear()
      }
    }
    const tooast = await toast.create({
      message: err.message,
      duration: 10000,
      position: 'middle',
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'FERMER'
    });

    tooast.present();
  }

  async presentToastMdp() {
    const toast = await this.toastCtrl.create({
      message: 'Les mots de passe ne sont pas identiques.',
      duration: 10000,
      position: 'middle',
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'FERMER'
    });

    toast.present();
  }

  async presentToastRGPD() {
    const toast = await this.toastCtrl.create({
      message: "En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de cookies. ",
      duration: 10000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'OK'
    });

    toast.present();
  }


  managePassword() {
    if (this.passwordtype == 'password') {
      this.passwordtype = 'text';
      this.passeye = 'eye-off';
    } else {
      this.passwordtype = 'password';
      this.passeye = 'eye';
    }
  }

  doRefresh(event) {
    console.log('Rechargement');

    setTimeout(() => {
      console.log('Rechargement en cours');
      this.ngOnInit()
      event.target.complete();
    }, 2000);
  }


  async sendEmailVerification() {
    await firebase.auth().currentUser.sendEmailVerification()

  }

  goToOutalma() {
    window.open("hdttps://www.outalma.com/contact", '_system', 'location=yes');
  }

}

