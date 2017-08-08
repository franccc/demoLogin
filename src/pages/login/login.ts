import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              private toast: ToastController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User){
    try{
      // const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password); 
      // console.log(result);
      // if(result){
      //   this.navCtrl.setRoot('ProfilePage');
      // }
      
      this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
        .then( authData =>  {
          this.navCtrl.setRoot('HomePage');
        }, error => {
              this.toast.create({
                  message: `Usuario inexistente, debe registrarse`,
                  duration: 5000
              }).present()
            }    
        )
    }
    catch(e){
      console.error(e);
    }
  }

  register(){
    this.navCtrl.push('RegisterPage')
  }

}
