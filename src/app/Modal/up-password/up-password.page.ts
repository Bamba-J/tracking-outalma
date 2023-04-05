import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController, ToastController, MenuController, AlertController, NavParams, IonSearchbar } from '@ionic/angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoadingProvider } from 'src/providers/loading/loading';
import * as firebase from 'firebase';
import { AuthService } from 'src/Services/auth.service';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-up-password',
  templateUrl: './up-password.page.html',
  styleUrls: ['./up-password.page.scss'],
})
export class UpPasswordPage implements OnInit {

  authForm: FormGroup;
  errorMessage: any;
  isAuth: boolean;
  userData: any;
  password: AbstractControl;
  passwordtype: string = 'password';
  passeye: string = 'eye';
  passwordtype2: string = 'password';
  passeye2: string = 'eye';
  date: string = '';
  loadingProvider: LoadingProvider;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  phoneNumber: AbstractControl;
  Date: AbstractControl;
  password2: AbstractControl;
  vuDate: boolean = true;
  btnDate: boolean = false;
  public show: boolean = false;

  constructor(private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public navPrm: NavParams) { var phoneNumber = this.navPrm.get('phoneNumber');  }


  ngOnInit() {
    firebase.auth().languageCode = 'fr';
    this.initForm();
    var phoneNumber = this.navPrm.get('phoneNumber')
    this.modalCtrl.getTop()

  }
  close() {
    this.modalCtrl.dismiss({
      'phoneNumber': this.phoneNumber.value
    });

  }

  signIn() {
    this.ionViewDidLoad()
    const appVerifier = this.recaptchaVerifier;
    const num = this.authForm.get('phoneNumber').value;
    const phoneNumber = '+' + num;
    const password = this.authForm.get('password').value
    const password2 = this.authForm.get('password2').value
    const date = this.authForm.get('Date').value
    const MajPwd = this.MajPwd
    const toast = this.toastCtrl
    const erreur = this.presentToast
    var str = phoneNumber;
    var ret = "";
    var faux = true
    var modal = this.modalCtrl
    var alertCtrl = this.alertCtrl
    var sho = this.show
    if (this.authForm.get('phoneNumber').valid != true || num == null) {
      var err = { code: "Input erronés", message: "" }
      this.presentToast(err, toast)
    }else{

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
              handler: data => { console.log('Cancel clicked'); }
            },
            {
              text: 'VALIDER',
              handler: data => {
                confirmationResult.confirm(data.confirmationCode)
                  .then(async function (result) {
                    MajPwd(phoneNumber, password, password2, toast, date, appVerifier, erreur, faux, modal, alertCtrl)
                    //aply()
                    sho = true
                  }).catch(function (error) {
                    console.log(error)
                    erreur(error, toast)
                    appVerifier.clear()
                  });
              }
            }
          ]
        });
        prompt.present();
      })
      .catch(function (error) {
        erreur(error, toast)
        console.error('SMS not sent', phoneNumber, error);
        appVerifier.clear()
      })
  }
  }

  async MajPwd(phoneNumber, password, password2, toast, date, appVerifier, erreur, faux, modal, alertCtrl) {
    const email = firebase.auth().currentUser.email
    const emaiil = phoneNumber + "@fakemail.outalma"

    if ("+" + email == emaiil) {

      let prompt = await alertCtrl.create({
        header: 'Changement du mot de passe',
        subHeader: 'Vérification de la date de naissance',
        mode: 'ios',
        inputs: [
          { name: 'date', placeholder: 'Vérification de la date de naissance', type: 'date' },
          { name: 'newmdp', placeholder: 'Nouveau mot de passe', type: 'password' },
          { name: 'newmdp2', placeholder: 'Vérification du mot de passe', type: 'password' },],
        buttons: [
          {
            text: 'Annuler',
            handler: data => { console.log('Cancel clicked'); }
          },
          {
            text: 'Valider',
            handler: async data => {
              var dateUser = firebase.auth().currentUser.photoURL;
              if (dateUser == data.date && data.newmdp == data.newmdp2) {

                firebase.auth().currentUser.updatePassword(data.newmdp).then(async result => {
                  const tooast = await toast.create({
                    message: 'Votre mot de passe a bien été modifié',
                    duration: 5000,
                    position: 'middle',
                    color: 'success'
                  })
                  tooast.present();
                  modal.dismiss();
                  appVerifier.clear()
                }, async error => {
                  erreur(error, toast)
                  appVerifier.clear()
                })
              } else if (dateUser != data.date) {
                const tooast = await toast.create({
                  message: 'La date de naissance est invalide.',
                  duration: 10000,
      position: 'middle',
      color: 'danger',
      showCloseButton : true,
      closeButtonText:'FERMER'
                })
                tooast.present();
                appVerifier.clear()
              }
              else if (data.newmdp2 != data.newmdp) {
                const tooast = await toast.create({
                  message: 'Les mots de passes ne sont pas les mêmes.',
                  duration: 10000,
                  position: 'middle',
                  color: 'danger',
                  showCloseButton : true,
                  closeButtonText:'FERMER'
                })
                tooast.present();
                appVerifier.clear()
              }

            }
          }
        ]
      });
      prompt.present();
    } else {
      firebase.auth().sendPasswordResetEmail(email)
        .then(async result => {
          const tooast = await toast.create({
            message: 'Un email de modification de votre mot de passe vous a été envoyé.',
            duration: 10000,
            position: 'middle',
            color: 'success',
            showCloseButton : true,
            closeButtonText:'FERMER'
          })
          tooast.present();
          modal.dismiss();
        }, async error => {
          erreur(error, toast)
          appVerifier.clear()
        })
    }
  }

  MajPwd2() {

  }

  async presentToastMdp() {
    const toast = await this.toastCtrl.create({
      message: 'Les mots de passe ne sont pas les mêmes',
      duration: 5000,
      position: 'middle',
      color: 'danger'
    });

    toast.present();
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
      duration: 10000,
      position: 'middle',
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'FERMER'
    });

    tooast.present();
  }
  initForm() {
    this.authForm = this.formBuilder.group({
      'Date': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'password2': [null, Validators.compose([Validators.required])],
      'phoneNumber': [null, Validators.compose([Validators.required])],
    });

    this.Date = this.authForm.controls['Date'];
    this.password = this.authForm.controls['password'];
    this.password2 = this.authForm.controls['password2'];
    this.phoneNumber = this.authForm.controls['phoneNumber'];
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

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      // 'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved - will proceed with submit function
        console.log(response);
        return true;
      },
      'expired-callback': function () {
        // Reset reCAPTCHA?
        console.log('recaptcha expired');
      }
    });
  }

  managePassword2() {
    if (this.passwordtype2 == 'password') {
      this.passwordtype2 = 'text';
      this.passeye2 = 'eye-off';
    } else {
      this.passwordtype2 = 'password';
      this.passeye2 = 'eye';
    }
  }


}
