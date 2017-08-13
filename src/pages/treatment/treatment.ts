import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TreatmentsService } from '../../services/treatments.service';

/**
 * Generated class for the TreatmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-treatment',
  templateUrl: 'treatment.html',
})
export class TreatmentPage {
  
  treatments = [];

  @ViewChild('myNav') nav: NavController
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public treatmentsService: TreatmentsService) {
                
      treatmentsService.getTreatments()
          .subscribe( tratamientos => {
              this.treatments = tratamientos;
          });
  }

  public goToDetail(id){
    this.navCtrl.push('DetailtrPage', {id: id});
  }

  /**
   * 
   * @param id 
   * el cero que pasamos indica que estamos creando un tratamiento
   */
  public createTreatment(id){
    this.navCtrl.push('DetailtrPage', {id: 0});
  }
}
