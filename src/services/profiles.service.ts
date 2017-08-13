import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ProfilesService{

    public loginState:boolean = false;
    profile = [];
    constructor (public afDB: AngularFireDatabase){}

    public getProfile(id){
        return this.afDB.object('profile/' + id);
    }

    public createProfile(profile){
        //this.afDB.database.ref('profile/' + profile.uid).set(profile);
        this.loginState = true;
        return this.afDB.object(`profile/${profile.uid}`).set(profile);
    }
}