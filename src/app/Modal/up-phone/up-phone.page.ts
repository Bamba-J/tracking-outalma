import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController, ToastController, MenuController, AlertController } from '@ionic/angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoadingProvider } from 'src/providers/loading/loading';
import * as firebase from 'firebase';
import { AuthService } from 'src/Services/auth.service';
import * as admin from 'firebase-admin';
import { auth } from 'google-auth-library';
import { on } from 'cluster';
import { callNgModuleLifecycle } from '@angular/core/src/view/ng_module';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-up-phone',
  templateUrl: './up-phone.page.html',
  styleUrls: ['./up-phone.page.scss'],
})
export class UpPhonePage implements OnInit {
  VigiK="";
  authForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  passwordtype: string = 'password';
  passeye: string = 'eye';
  loadingProvider: LoadingProvider;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  phoneNumber: AbstractControl;
  isAuth: boolean;
  NewphoneNumber: AbstractControl;


  constructor(private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    private authService: AuthService,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController, ) {
      var VigiK = "";
      firebase.database().ref('/Cry/').on("value", function(snapshot) {
        var tg = snapshot.val();
        VigiK = tg[0]['Vigi'];},
      function (error) {
        console.log("Error dans Cry: " + error.code);})
        this.VigiK = VigiK; }

  onSubmitForm() {
    var presentToastBravo = this.presentToastBravo
    var toast = this.toastCtrl
    var presentToast = this.presentToast
    const num = this.authForm.get('phoneNumber').value;
    const num2 = this.authForm.get('NewphoneNumber').value;
    const email2 = num + '@fakemail.outalma';
    var email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    var writeUser = this.writeUserData
    var nav = this.navCtrl
    var str = num2;
    var ret = "";
    if (this.authForm.get('phoneNumber').valid != true || this.authForm.get('NewphoneNumber').valid != true || num2 == null || num == null) {
      var err = { code: "Input erronés", message: "" }
      presentToast(err, toast)
    }else{
    for (var i = 0; i < str.length; i++) {
      if (i >= str.length - 3) {
        ret += str.charAt(i);
      }
      else {
        ret += "x";
      }
    }

    if (email == null) {
      email = email2;
    }
    this.authService.signInUser(email, password).then(
      (result) => {
        console.log('result >>', result);
        this.UpdatePhone(writeUser, ret, toast, presentToastBravo, presentToast).then(function () {

        })
      },

      async (err) => {
        presentToast(err, toast)
        firebase.auth().signOut()
        this.recaptchaVerifier.clear()
      }
    );
    }
  }


  async UpdatePhone(writeUser, ret, toast, presentToastBravo, presentToast) {

    if (firebase.auth().currentUser.phoneNumber == "+" + this.authForm.get('phoneNumber').value && this.authForm.get('NewphoneNumber').valid == true) {

      const num = this.authForm.get('NewphoneNumber').value;
      var email = this.authForm.get('email').value;
      const Newemail = num + '@fakemail.outalma';
      const phoneNumber = '+' + num;
      const appVerifier = this.recaptchaVerifier;
      var provider = new firebase.auth.PhoneAuthProvider();
      provider.verifyPhoneNumber(phoneNumber, appVerifier)
        .then(async confirmationResult => {
          let prompt = await this.alertCtrl.create({
            header: 'Un code de confimation a été envoyé au : ' + '+' + ret,
            inputs: [{ name: 'confirmationCode', placeholder: 'Entrez le code de confirmation' }],
            buttons: [
              {
                text: 'Annuler',
                handler: data => {
                  appVerifier.clear()
                }

              },
              {
                text: 'Valider',
                handler: data => {
                  var verificationCode = data.confirmationCode
                  var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult, verificationCode);
                  firebase.auth().currentUser.updatePhoneNumber(credential)
                    .then((function () {
                      if (email == "") {
                        firebase.auth().currentUser.updateEmail(Newemail).then(function () {
                          writeUser()
                        })
                        presentToastBravo(toast)
                      } else { writeUser() }
                    }))
                  return firebase.auth.PhoneAuthProvider.credential(confirmationResult,
                    verificationCode);
                }
              }
            ]
          });
          prompt.present()

        })
        .catch(function (error) {
          this.recaptchaVerifier.clear()
          presentToast(error,toast)

        });
    } else {
      this.recaptchaVerifier.clear()
      var error = {code : "auth/invalid-phone-number", message : ""}
      this.presentToast(error, toast);
    }

  }

  writeUserData() {
    firebase.database().ref('user/' + firebase.auth().currentUser.uid).set([
      {
        email: CryptoJS.AES.decrypt(firebase.auth().currentUser.email.trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8),
        emailVerified: firebase.auth().currentUser.emailVerified,
        phoneNumber: CryptoJS.AES.decrypt(firebase.auth().currentUser.phoneNumber.trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8),
        displayName: CryptoJS.AES.decrypt(firebase.auth().currentUser.displayName.trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8),
        date_naiss: CryptoJS.AES.decrypt(firebase.auth().currentUser.photoURL.trim(),  this.VigiK.trim()).toString(CryptoJS.enc.Utf8),
        désativé: false
      }
    ]).then(
      (snapshot) => {

      },
      (error) => {
      }
    );;
  }

  ngOnInit() {
    firebase.auth().languageCode = 'fr';
    this.initForm();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = false;

        } else {
          this.isAuth = false;
          this.navCtrl.navigateForward('');
        }
      }
    );
  }

  close() {
    this.modalCtrl.dismiss();
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
  async presentToast(err, toast) {
    if (err.code == "auth/provider-already-linked") {
      err.message = "Cet utilisateur existe déjà."
    } else if (err.code == "auth/argument-error") {
      err.message = "Veuillez vérifier les paramètres du formulaire."
    } else if (err.code == "auth/network-request-failed") {
      err.message = "Veuillez vérifier vos paramètres réseau."
    } else if (err.code == "auth/too-many-request") {
      err.message = "Les demandes de votre périphérique sont bloquées en raison d'activités inhabituelles. Veuillez réessayer plus tard."
    } else if (err.code == "auth/invalid-email") {
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
    else if (err.code == "Input erronés") {
      err.message = "Veuillez vérifier les valeurs entrées."
    }
    else {
      err.message = "Un problème est survenu. Veuillez contacter le service client."
    }
    const tooast = await toast.create({
      message: err.message,
      duration: 5000,
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
      showCloseButton : true,
      closeButtonText:'FERMER'
    });

    toast.present();
  }

  
  async presentToastBravo(toast) {
    const tooast = await toast.create({
      message: 'Bien enregistré',
      duration: 3000,
      position: 'middle',
      color: 'success'
    })
    tooast.present();
  }




  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      // 'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved - will proceed with submit function
        return true;
      },
      'expired-callback': function () {
        // Reset reCAPTCHA?
      }
    });
  }


  initForm() {
    this.authForm = this.formBuilder.group({
      'userName': [null, Validators.compose([Validators.required])],
      'email': [null],
      'password': [null, Validators.compose([Validators.required])],
      'phoneNumber': [null, Validators.compose([Validators.required])],
      'NewphoneNumber': [null, Validators.compose([Validators.required])],
    });

    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
    this.phoneNumber = this.authForm.controls['phoneNumber'];
    this.NewphoneNumber = this.authForm.controls['NewphoneNumber'];
  }

}
