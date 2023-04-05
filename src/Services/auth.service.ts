import * as firebase from 'firebase';
import { stringify } from '@angular/compiler/src/util';
import { promise } from 'protractor';
import { DefaultValueAccessor } from '@angular/forms';
import { userInfo } from 'os';

export class AuthService {
  isAuth = false;
  adresse :string;
  userProfile = firebase.auth().currentUser;
  alertCtrl: any;
  authForm: any;
  recaptchaVerifier: any;

 
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  

  signUpUser(email: string, password: string, userName: string, phoneNumber) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (user) => {
          resolve(user);
          user.additionalUserInfo.username = userName;
          user.user.updateProfile({
            displayName:  userName,
            photoURL: "https://cdnfr2.img.sputniknews.com/images/103681/99/1036819995.jpg",
          })
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then( 
        (user) => {
        //   if(user.user.emailVerified){
        //   resolve(user);
        // }
        //   else{
        //     this.sendEmailVerification();
        //     window.alert("va voir tes mails connard !");
        //     return user.user.emailVerified.valueOf;
        //   }
        resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signOut() {
    firebase.auth().signOut();
}
async sendEmailVerification() {
  await  firebase.auth().currentUser.sendEmailVerification()
  
}


}