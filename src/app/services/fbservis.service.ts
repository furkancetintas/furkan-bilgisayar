import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth'
import { Uye } from '../models/uye';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {

  admin: string;

  private dbUye = '/Uyeler';
  uyeRef: AngularFireList<Uye> = null;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.uyeRef = db.list(this.dbUye);
  }

  OturumKontrolCikis() {
    if (localStorage.getItem("User")) {
      return true;
    }
    else {
      return false;
    }
  }
  OturumKontrol() {
    if (localStorage.getItem("User")) {
      return false;
    }
    else {
      return true;
    }
  }

  KayitOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.email, uye.sifre)
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola)
  }

  OturumKapat() {
    return this.afAuth.signOut();
  }

  KayitListele(): AngularFireList<Uye> {
    return this.uyeRef;
  }
  UyeEkle(uye: Uye) {

    return this.uyeRef.push(uye);
  }

  KayitDuzenle(key: string, value: any): Promise<void> {
    return this.uyeRef.update(key, value);
  }
  KayitSil(key: string): Promise<void> {
    return this.uyeRef.remove(key);
  }

}
