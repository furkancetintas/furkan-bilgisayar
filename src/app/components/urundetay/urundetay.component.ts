import { Dosya } from './../../models/dosya';
import { Sepet } from 'src/app/models/sepet';
import { FavoriurunservisService } from './../../services/favoriurunservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { favoriUrun } from 'src/app/models/favoriurun';
import { UrunservisService } from 'src/app/services/urunservis.service';
import { SepetservisService } from 'src/app/services/sepetservis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-urundetay',
  templateUrl: './urundetay.component.html',
  styleUrls: ['./urundetay.component.css']
})
export class UrundetayComponent implements OnInit {

  uid: string;
  urunID: string;
  urunFotoUrl: string;
  urunAd: string;
  urunBilgi: string;
  urunKategori: string;
  urunFiyat: string;
  kayTarih: string;
  duzTarih: string;


  key: string;
  secKayit: Dosya = new Dosya;
  secUrunsepet: Sepet = new Sepet();
  secUrunFavori: favoriUrun = new favoriUrun();

  constructor(
    public route: ActivatedRoute,
    public urunServis: UrunservisService,
    public favoriUrunServis: FavoriurunservisService,
    public sepetServis: SepetservisService,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.KayitGetir();
      var user: any = JSON.parse(localStorage.getItem("User"));
      this.uid = user.uid;
    });
  }

  KayitGetir() {
    this.urunServis.KayitbyKey(this.key).snapshotChanges().subscribe(d => {
      var u = { ...(d.payload.toJSON() as Dosya), key: this.key };
      this.secKayit = u;
    });
  }

  SepeteEkle() {
    this.secUrunsepet.urunID = this.urunID;
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

}
