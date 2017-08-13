import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Treatment } from "../../models/treatment";
import { TreatmentsService } from "../../services/treatments.service";

/**
 * Generated class for the DetailtrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailtr',
  templateUrl: 'detailtr.html',
})
export class DetailtrPage {

  treatment = {} as Treatment;
  id = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public treatmentsService: TreatmentsService) {

      this.id = navParams.get('id');

      if(this.id != 0){
        treatmentsService.getTreatment(this.id)
            .subscribe(treatment => {
                this.treatment = treatment;
            });
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailtrPage');
  }

  addTreatment(){
    if(this.id != 0){
      this.treatmentsService.editTreatment(this.treatment);
      alert('Tratamiento editado');
    }else{
      this.treatment.id = Date.now();
      this.treatmentsService.createTreatment(this.treatment);
      alert('Tratamiento creado');
      
    }
    this.navCtrl.pop();
  }

  deleteTreatment(){
    this.treatmentsService.deleteTreatment(this.treatment);
    alert('Tratamiento eliminado');
    this.navCtrl.pop();
  }
}
