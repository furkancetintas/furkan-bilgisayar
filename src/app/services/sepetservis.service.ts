import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Sepet } from '../models/sepet';

@Injectable({
  providedIn: 'root'
})
export class SepetservisService {

  private dburunSepet = '/Sepet';
  urunSepetRef: AngularFireList<Sepet> = null;

  constructor(
    public urundb: AngularFireDatabase

  ) {
    this.urunSepetRef = urundb.list(this.dburunSepet);
  }

  urunKayitListele(): AngularFireList<Sepet> {
    return this.urunSepetRef;
  }
  urunKayitEkle(key: Sepet) {
    return this.urunSepetRef.push(key);
  }
  urunKayitDuzenle(urun: Sepet): Promise<void> {
    return this.urunSepetRef.update(urun.key, urun);
  }
  urunKayitSil(key: string): Promise<void> {
    return this.urunSepetRef.remove(key);
  }


  KayitListelebyUid(urunKategori: string) {
    return this.urundb.list("Sepet", q => q.orderByChild("uid").equalTo(urunKategori));
  }

  KayitbyKey(key: string) {
    return this.urundb.object("Sepet/" + key);
  }
}
