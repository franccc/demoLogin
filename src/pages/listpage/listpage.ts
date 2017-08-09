import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { Treatment } from "../../models/treatment";
// import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";


/**
 * Generated class for the ListpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listpage',
  templateUrl: 'listpage.html',
})
export class ListpagePage {

  treatment = {} as Treatment;

  // treatments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase) {

    
  }

  addTreatment(){
    this.afDatabase.object(`treatment/Id`).set(this.treatment);
  }

}
