import { Uye } from './../../models/uye';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FbservisService } from './../../services/fbservis.service';
import { map } from 'rxjs/operators';
import { uyeSonuc } from 'src/app/models/uyesonuc';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  secUye: Uye = new Uye();
  islem: string;
  sonuc: boolean = false;

  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {

  }

  Kaydol() {
    this.fbServis.KayitOl(this.secUye).then(d => {
      localStorage.setItem("User", JSON.stringify(d.user));
      this.secUye.uid = d.user.uid;
      d.user.updateProfile({
        displayName: this.secUye.adsoyad
      }).then()
      this.UyeEkle();
      this.sonuc = true;
      this.islem = "Kayıt Başarılı";
    }, err => {
      this.sonuc = false;
      this.islem = "Hata Oluştu. Tekrar Deneyiniz!";
    });
  }
  UyeEkle() {
    this.fbServis.UyeEkle(this.secUye).then(d => {
      this.router.navigate(['/']);
    })
  }
}
