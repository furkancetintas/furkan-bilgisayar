import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { favoriUrun } from 'src/app/models/favoriurun';
import { FavoriurunservisService } from 'src/app/services/favoriurunservis.service';
import { urunKayit } from 'src/app/models/urunkayit';

@Component({
  selector: 'app-favoriteproduct',
  templateUrl: './favoriteproduct.component.html',
  styleUrls: ['./favoriteproduct.component.css']
})
export class FavoriteproductComponent implements OnInit {

  urun: favoriUrun;
  key: string;
  uid: string;
  urunler: any;

  constructor(
    public route: ActivatedRoute,
    public urunFavoriServis: FavoriurunservisService
  ) { }

  ngOnInit(): void {
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.uid = user.uid;
    this.KayitListele();

  }

  KayitListele() {
    this.urunFavoriServis.KayitListelebyUid(this.uid).snapshotChanges().subscribe(data => {
      this.urunler = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.urunler.push(y as favoriUrun)
      })
    });
  }

  btnSil(urunFavori: favoriUrun) {
    this.urunFavoriServis.urunKayitSil(urunFavori.key).then(s => {
    })
  }
}
