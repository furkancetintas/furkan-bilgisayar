import { urunKayit } from './../models/urunkayit';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UrunservisService {

  private dburun = '/Urunler';
  urunkayitRef: AngularFireList<urunKayit> = null;

  constructor(
    public urundb: AngularFireDatabase,
    public storage: AngularFireStorage

  ) {
    this.urunkayitRef = urundb.list(this.dburun);
  }

  urunKayitListele(): AngularFireList<urunKayit> {
    return this.urunkayitRef;
  }
  urunKayitEkle(key: urunKayit) {
    return this.urunkayitRef.push(key);
  }
  urunKayitDuzenle(urun: urunKayit): Promise<void> {
    return this.urunkayitRef.update(urun.key, urun);
  }
  urunKayitSil(key: string): Promise<void> {
    return this.urunkayitRef.remove(key);
  }

  KayitListelebyUid(urunKategori: string) {
    return this.urundb.list("Urunler", q => q.orderByChild("urunKategori").equalTo(urunKategori));
  }

  KayitbyKey(key: string) {
    return this.urundb.object("Urunler/" + key);
  }
}