import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfilesService } from "../../services/profiles.service";

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
  public userProfile: AngularFireDatabase;

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              private toast: ToastController, 
              public navParams: NavParams,
              public profilesService: ProfilesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User){

    try{
      
      this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
        .then(auth =>  {
            this.profilesService.getProfile(auth.uid).subscribe(profile => {
                console.log ('valor profile.uid' + profile.uid);
                if (profile.uid  == auth.uid){
                    this.profilesService.loginState = true;
                    this.navCtrl.setRoot('HomePage');
                }else{
                    this.navCtrl.setRoot('ProfilePage',{uid: auth.uid});
                }
            })
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
