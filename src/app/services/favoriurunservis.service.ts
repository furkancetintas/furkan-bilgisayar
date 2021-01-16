import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { favoriUrun } from '../models/favoriurun';

@Injectable({
  providedIn: 'root'
})
export class FavoriurunservisService {

  private dburunFavori = '/FavoriUrun';
  urunFavoriRef: AngularFireList<favoriUrun> = null;

  constructor(
    public urundb: AngularFireDatabase

  ) {
    this.urunFavoriRef = urundb.list(this.dburunFavori);
  }

  urunKayitListele(): AngularFireList<favoriUrun> {
    return this.urunFavoriRef;
  }
  urunKayitEkle(key: favoriUrun) {
    return this.urunFavoriRef.push(key);
  }
  urunKayitDuzenle(urun: favoriUrun): Promise<void> {
    return this.urunFavoriRef.update(urun.key, urun);
  }
  urunKayitSil(key: string): Promise<void> {
    return this.urunFavoriRef.remove(key);
  }


  KayitListelebyUid(urunKategori: string) {
    return this.urundb.list("FavoriUrun", q => q.orderByChild("uid").equalTo(urunKategori));
  }
  KayitbyKey(key: string) {
    return this.urundb.object("FavoriUrun/" + key);
  }

}
