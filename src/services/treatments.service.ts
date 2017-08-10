import { Injectable} from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class TreatmentsService{
    constructor (public afDB: AngularFireDatabase){}
    treatments = [];

    public getTreatments(){
        // return this.treatments
        return this.afDB.list('treatments/');
    }

    public getTreatment(id){
        //return this.treatments.filter(function(e,i){ return e.id == id }) [0] || {id:null, code:null, shortname:null, description:null};
        return this.afDB.object('treatments/' + id);
    }

    public createTreatment(treatment){
        //this.treatments.push(treatment);
        this.afDB.database.ref('treatments/' + treatment.id).set(treatment);
    }

    public editTreatment(treatment){
        // for(let i = 0; i < this.treatments.length; i++){
        //     if(this.treatments[i].id == treatment.id){
        //         this.treatments[i] = treatment;
        //     }
        // }
        this.afDB.database.ref('treatments/' + treatment.id).set(treatment);
    
    }

    public deleteTreatment(treatment){
        // for(let i = 0; i < this.treatments.length; i++){
        //     if(this.treatments[i].id == treatment.id){
        //         this.treatments.splice(i,1);
        //     }
        // }
        this.afDB.database.ref('treatments/' + treatment.id).remove();
    }
} 