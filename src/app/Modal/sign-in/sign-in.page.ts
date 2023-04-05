import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController, ToastController, MenuController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AuthService } from 'src/Services/auth.service';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingProvider } from 'src/providers/loading/loading';
import { isNull } from '@angular/compiler/src/output/output_ast';
import * as CryptoJS from 'crypto-js';
var nb_gest
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  VigiK="";
  authForm: FormGroup;
  errorMessage: any;
  isAuth: boolean;
  userData: any;
  email: AbstractControl;
  password: AbstractControl;
  passwordtype: string = 'password';
  passeye: string = 'eye';
  passwordtype2: string = 'password';
  passeye2: string = 'eye';
  faux: string = '';
  faux1: string = '';
  faux2: string = '';
  faux3: string = '';
  faux4: string = '';
  faux5: string = '';
  loadingProvider: LoadingProvider;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  phoneNumber: AbstractControl;
  userName: AbstractControl;
  password2: AbstractControl;
  nom: AbstractControl;
  prenom: AbstractControl;
  date: AbstractControl;
  TabUser : [];

  constructor(private modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    firebase.auth().languageCode = 'fr';
    this.initForm();
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
      }
    });
  }

  onSubmitForm() {
    var password = this.authForm.get('password').value;
    var password2 = this.authForm.get('password2').value;
    var num = this.authForm.get('phoneNumber').value;
    var email2 = num + '@fakemail.outalma';
    var email = this.authForm.get('email').value;
    var prenom = this.authForm.get('prenom').value
    var nom = this.authForm.get('nom').value;
    var userName = nom + " " + prenom
    var phoneNumber = '+' + num;
    var date = this.authForm.get('date').value;
    var navCtrol = this.navCtrl;
    var menuCtrol = this.menuCtrl;
    var addmail = this.AjouteEmail
    var toast = this.toastCtrl
    var Bravo = this.presentToastBravo
    var Modal = this.modalCtrl
    var present = this.presentToast
    var str = phoneNumber;
    var ret = "";
    var writeUser = this.writeUserData
    const appVerifier = this.recaptchaVerifier;

    if (password == null) {
      this.faux = "item ion-focusable hydrated item-label item-interactive item-input item-has-placeholder ion-touched ion-dirty ion-invalid"
    }
    if (password2 == null) {
      this.faux1 = "item ion-focusable hydrated item-label item-interactive item-input item-has-placeholder ion-touched ion-dirty ion-invalid"
    }
    if (prenom == null) {
      this.faux2 = "item ion-focusable hydrated item-label item-interactive item-input item-has-placeholder ion-touched ion-dirty ion-invalid"
    }
    if (nom == null) {
      this.faux3 = "item ion-focusable hydrated item-label item-interactive item-input item-has-placeholder ion-touched ion-dirty ion-invalid"
    }
    if (num == null) {
      this.faux4 = "item ion-focusable hydrated item-label item-interactive item-input item-has-placeholder ion-touched ion-dirty ion-invalid"
    }
    if (date == null) {
      this.faux5 = "item ion-focusable hydrated item-label item-interactive item-input item-has-placeholder ion-touched ion-dirty ion-invalid"
    }
    else if (this.authForm.get('email').valid != true || this.authForm.get('prenom').valid != true || this.authForm.get('nom').valid != true || this.authForm.get('password2').valid != true || this.authForm.get('password').valid != true || this.authForm.get('date').valid != true || this.authForm.get('phoneNumber').valid != true) {
      var err = { code: "Input erronés", message: "" }
      this.presentToast(err, toast)
    }
    else {
      if (password == password2) {
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
                  text: 'Annuler',
                  handler: data => {
                    appVerifier.clear()
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Valider',
                  handler: data => {
                    confirmationResult.confirm(data.confirmationCode)
                      .then(function (result) {
                        firebase.auth().currentUser.updateProfile({
                          displayName: userName,
                          photoURL: date,
                        })
                        if (email == "") {
                          var credential = firebase.auth.EmailAuthProvider.credential(email2, password);
                          firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function (usercred) {
                            var user = usercred.user;
                            Bravo(toast);
                            navCtrol.navigateForward('tabs/tabs/forms');
                            menuCtrol.enable(true);
                            // Modal.dismiss()
                            writeUser(nom, prenom, email2 ,Modal);

                          }).catch(function (error) {
                            present(error, toast);
                            appVerifier.clear();
                          })
                        } else {
                          var credential = firebase.auth.EmailAuthProvider.credential(email, password);
                          firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(async function (usercred) {
                            await firebase.auth().currentUser.sendEmailVerification();
                            var user = usercred.user;
                            writeUser(nom, prenom, email,Modal);
                            if (firebase.auth().currentUser.emailVerified == false) {
                              window.alert("Un mail de vérification d'adresse mail vous a été envoyé");
                            }
                            else {
                              Bravo(toast);
                              navCtrol.navigateForward('tabs/tabs/forms');
                              menuCtrol.enable(true);
                              // Modal.dismiss()
                            }
                          }, function (error) {
                            present(error, toast);
                            appVerifier.clear();
                          });
                        }
                      }).catch(function (error) {
                        present(error, toast);
                        appVerifier.clear()
                      });
                  }
                }
              ]
            });
            prompt.present();
          }).catch(function (error) {
            present(error, toast);
            appVerifier.clear()
          });
      }
      else {
        this.presentToastMdp()
        appVerifier.clear()

      }
    }
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

  writeUserData(nom, prenom, email,Modal) {
    firebase.database().ref('Gestion/').on("value", function(snapshot) {
      var gest = snapshot.val();
      nb_gest = gest.length;
      console.log(gest,'iujo')
      })
      var utc =  new Date().toJSON().slice(0,10).replace(/-/g,'/');

    var VigiK = "";
    firebase.database().ref('/Cry/').on("value", function(snapshot) {
      var tg = snapshot.val();
      VigiK = tg[0]['Vigi'];},
    function (error) {
      console.log("Error dans Cry: " + error.code);})
      var vide =CryptoJS.AES.encrypt(' '.trim(), VigiK.trim()).toString();
      var ID = "InnEC8qCLuQpRgELex2czWC6Cnk1";
     
    firebase.database().ref('user/' + firebase.auth().currentUser.uid).set([
      {
        email: CryptoJS.AES.encrypt(email.trim(), VigiK.trim()).toString(),
        phoneNumber: CryptoJS.AES.encrypt(firebase.auth().currentUser.phoneNumber.trim(), VigiK.trim()).toString(),
        Nom: CryptoJS.AES.encrypt(nom.trim(), VigiK.trim()).toString(),
        Prenom: CryptoJS.AES.encrypt(prenom.trim(), VigiK.trim()).toString(),
        date_naiss: CryptoJS.AES.encrypt(firebase.auth().currentUser.photoURL.trim(), VigiK.trim()).toString(),
        Ad_pay_e: vide,
        Ad_pay_l: vide,
        Ad_pos_e: vide,
        Ad_pos_l: vide,
        Ad_rue_e: vide,
        Ad_rue_l: vide,
        désativé: vide,
        emailVerified: vide,
      }
    ]).then(function() {
     var TabUser = [];
     var d1= Date.now();
     var d2= new Date(d1);
     var text = "Hello avez vous des questions concernant les services de outalma"
     
     TabUser.push({date:d1, offset:d2.getTimezoneOffset(), Message:CryptoJS.AES.encrypt(text.trim(), VigiK.trim()).toString(), Notification:1, UserID:ID});
     firebase.database().ref('/msg_sav/' + firebase.auth().currentUser.uid ).set(TabUser).then(
        (data: DataTransfer) => {
          
        },
        (error) => {
        }
      );;

        firebase.database().ref('Gestion/').on("value", function(snapshot) {
          var gest = snapshot.val();
          nb_gest = gest.length;
           console.log(gest,'iujo');
          //  if(gest==null){
          //    nb_gest=0
          //    console.log('cas11111111111')
          //    firebase.database().ref('Gestion/'+nb_gest).set(
          //     {
          //       ID: firebase.auth().currentUser.uid,
          //       Nom: nom,
          //       Prenom: prenom
          //     }
          //   ).then(function(){
          //     Modal.dismiss()
          //   })
          //  }else{
           
           }
        // }
        ,
        function (error) {
           console.log("Error dans Gestion: " + error.code);
        })
        console.log('caaas22',nb_gest);
        
        //Ecriture dans la table de gestion après récuperation de la valeur nb_gest
        firebase.database().ref('Gestion/'+nb_gest).set(
          {
            ID: firebase.auth().currentUser.uid,
            Nom: nom,
            Prenom: prenom
          }
        ).then(function(){
          //Fin d'écriture et fermeture du Modal
          Modal.dismiss()
        })
      },
      (error) => {
        console.log(error);
      }
    );;

    
    
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      'nom': [null, Validators.compose([Validators.required])],
      'prenom': [null, Validators.compose([Validators.required])],
      'email': [null],
      'password': [null, Validators.compose([Validators.required])],
      'password2': [null, Validators.compose([Validators.required])],
      'phoneNumber': [null, Validators.compose([Validators.required])],
      'date': [null, Validators.compose([Validators.required])],
    });

    this.nom = this.authForm.controls['nom'];
    this.prenom = this.authForm.controls['prenom'];
    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
    this.password2 = this.authForm.controls['password2'];
    this.phoneNumber = this.authForm.controls['phoneNumber'];
    this.date = this.authForm.controls['date'];
  }

  AjouteEmail(email, email2, userName, password, date, navCtrol, menuCtrol, Bravo, toast) {
    firebase.auth().currentUser.updateProfile({
      displayName: userName,
      photoURL: date
    })

    if (email == "") {
      var credential = firebase.auth.EmailAuthProvider.credential(email2, password);
      firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function (usercred) {
        var user = usercred.user;
        Bravo(toast);
        navCtrol('tabs/tabs/forms');
        menuCtrol(true);
        console.log("Account linking success");
      }, function (error) {
      });
    } else {
      var credential = firebase.auth.EmailAuthProvider.credential(email, password);
      firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(async function (usercred) {
        await firebase.auth().currentUser.sendEmailVerification()
        var user = usercred.user;
        console.log("Account linking success")
        if (firebase.auth().currentUser.emailVerified == false) {
          window.alert("Un mail de vérification de l'adresse mail vous a été envoyé.")
        }
        else {
          this.navCtrl.navigateForward('tabs/tabs/forms');
          this.menuCtrl.enable(true);
        }
      }, function (error) {
        // this.presentToast(error);
        console.log("Account linking error", error);
      });
    }
  }

  async sendEmailVerification() {
    await firebase.auth().currentUser.sendEmailVerification()

  }

  //Remonté des erreurs à l'utilisateur
  async presentToast(err, toast) {
    if (err.code == "auth/provider-already-linked") {
      err.message = "Cet utilisateur existe déjà."
    } 
    else if (err.code == "auth/network-request-failed") {
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
    // else {
    //   err.message = "Un problème est survenu. Veuillez contacter le service client."
    // }
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
      showCloseButton : true,
      closeButtonText:'FERMER'
    });

    toast.present();
  }

  async presentToastBravo(toast) {
    const tooast = await toast.create({
      message: 'L\'utilisateur a bien été enregitré',
      duration: 3000,
      position: 'middle',
      color: 'success'
    })
    tooast.present();
  }

  moveToHome(res) {
    if(firebase.auth().currentUser.email.includes("@outalma.com")){
      this.navCtrl.navigateForward('tabs/tabs/tableau-suivi');
    }else{
      this.navCtrl.navigateForward('tabs/tabs/forms');
    }
    this.menuCtrl.enable(true);
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
