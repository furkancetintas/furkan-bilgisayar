import { SepetservisService } from './../../services/sepetservis.service';
import { UrunservisService } from './../../services/urunservis.service';
import { urunKayit } from './../../models/urunkayit';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { urunkayitSonuc } from 'src/app/models/urunkayitsonuc';
import { Router, ActivatedRoute } from '@angular/router';
import { Sepet } from 'src/app/models/sepet';
import { favoriUrun } from 'src/app/models/favoriurun';
import { FavoriurunservisService } from 'src/app/services/favoriurunservis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  key: string;
  uid: string;
  urunID: string;
  urunFotoUrl: string;
  urunFotoAdi: string;
  urunFile: File;
  urunAd: string;
  urunBilgi: string;
  urunKategori: string;
  urunFiyat: string;
  kayTarih: string;
  duzTarih: string;

  urunler;
  sonucsepet: boolean = false;
  filtre: string = "";
  secKayit: urunKayit = new urunKayit();
  sonuc: urunkayitSonuc = new urunkayitSonuc();
  secUrunsepet: Sepet = new Sepet();
  secUrunFavori: favoriUrun = new favoriUrun();

  constructor(
    public ukayitServis: UrunservisService,
    public sepetServis: SepetservisService,
    public favoriUrunServis: FavoriurunservisService,
    public router: Router,
    public route: ActivatedRoute,
    public toast: ToastrService

  ) { }

  ngOnInit() {
    this.urunKayitListele();
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.uid = user.uid;
  }

  urunKayitListele() {
    this.ukayitServis.urunKayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.urunler = data;
    });
  }

  urunKayitListeleFiltre() {
    if (this.filtre != "") {
      this.ukayitServis.KayitListelebyUid(this.filtre).snapshotChanges().subscribe(data => {
        this.urunler = [];
        data.forEach(urun => {
          var y = { ...urun.payload.toJSON(), key: urun.key };
          this.urunler.push(y as urunKayit)
        })
      });
    }
    else {
      this.urunKayitListele();
    }
  }

  SepeteEkle() {
    this.secUrunsepet.urunID = this.urunID
    this.secUrunsepet.uid = this.uid;
    this.secUrunsepet.urunFotoUrl = this.urunFotoUrl;
    this.secUrunsepet.urunAd = this.urunAd;
    this.secUrunsepet.urunBilgi = this.urunBilgi;
    this.secUrunsepet.urunKategori = this.urunKategori;
    this.secUrunsepet.urunFiyat = this.urunFiyat;
    this.secUrunsepet.kayTarih = this.kayTarih;

    if (this.secUrunsepet.key == null) {
      this.sepetServis.urunKayitEkle(this.secUrunsepet).then(s => {
      });
    }
  }

  FavoriyeEkle() {
    this.secUrunFavori.uid = this.uid;
    this.secUrunFavori.urunID = this.urunID;
    this.secUrunFavori.urunFotoUrl = this.urunFotoUrl;
    this.secUrunFavori.urunAd = this.urunAd;
    this.secUrunFavori.urunBilgi = this.urunBilgi;
    this.secUrunFavori.urunKategori = this.urunKategori;
    this.secUrunFavori.urunFiyat = this.urunFiyat;
    this.secUrunFavori.kayTarih = this.kayTarih;

    if (this.secUrunFavori.key == null) {
      this.favoriUrunServis.urunKayitEkle(this.secUrunFavori).then(s => {

      });
    }
  }

  ToastSepet() {
    this.toast.success("Ürün Sepete Eklendi");
  }
  ToastFavori() {
    this.toast.success("Ürün Favoriye Eklendi");
  }
}

