import { Dosya } from './../../models/dosya';
import { urunkayitSonuc } from './../../models/urunkayitsonuc';
import { urunKayit } from './../../models/urunkayit';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UrunservisService } from 'src/app/services/urunservis.service';
import { Router } from '@angular/router';
import { yuklemeService } from 'src/app/services/yuklemeservis.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  urunler2: urunKayit[];
  files: FileList;

  seckayit: urunKayit = new urunKayit();
  sonuc: urunkayitSonuc = new urunkayitSonuc();
  urunler: any;
  admin: string;
  adminsonuc: boolean;

  constructor(
    public urunkayitServis: UrunservisService,
    public yuklemeservis: yuklemeService,
    public router: Router

  ) { }

  ngOnInit() {
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.admin = user.uid;
    this.seckayit.key == null;
    this.AdminKontrol();
    this.dosyaListele();
  }

  AdminKontrol() {
    if (this.admin != "PrsQl7nxCwSHtxRbRqzPSQgN3p53") {
      this.router.navigate(['/']);
    }
  }

  Duzenle(urun: Dosya) {
    Object.assign(this.seckayit, urun);
  }

  Sil(urun: Dosya) {
    this.urunkayitServis.urunKayitSil(urun.key).then(s => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
      this.yuklemeservis.DosyaSil(urun);
    })
  }

  DosyaSec(e) {
    this.files = e.target.files;
  }
  DosyaYukle() {
    var file = this.files[0];
    var dosya = new Dosya();
    dosya.file = file;
    dosya.uid = this.admin;
    this.yuklemeservis.DosyaYukleStorage(dosya, this.seckayit.urunAd, this.seckayit.urunBilgi, this.seckayit.urunKategori,
      this.seckayit.urunFiyat, this.seckayit.urunRam, this.seckayit.urunIslemciHizi, this.seckayit.urunDiskKapasitesi,
      this.seckayit.urunEkranKartiHafizasi).subscribe(p => {
        console.log("Yüklendi");
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";

      }, err => {
        console.log("Yüklenemedi");
      });
  }

  dosyaListele() {
    this.yuklemeservis.DosyaListele().snapshotChanges().subscribe(data => {
      this.urunler = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.urunler.push(y as Dosya)
      })
    });
  }

  DosyaSil(dosya: Dosya) {
    this.yuklemeservis.DosyaSil(dosya);
  }

  Kaydet() {
    var tarih = new Date();
    if (this.seckayit.key == null) {

    }
    else {
      this.seckayit.duzTarih = tarih.getTime().toString();

      this.urunkayitServis.urunKayitDuzenle(this.seckayit).then(s => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Güncellendi";
      });
    }
  }
}
