import { uyeSonuc } from '../../models/uyesonuc';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Uye } from 'src/app/models/uye';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sonuc: boolean;
  durum: string;
  secUye: Uye = new Uye();
  uyesonuc: uyeSonuc = new uyeSonuc();

  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {

  }

  GirisYap(mail: string, parola: string) {
    this.fbServis.OturumAc(mail, parola).then(d => {
      localStorage.setItem("User", JSON.stringify(d.user));
      this.uyesonuc.islem = true;
      this.uyesonuc.mesaj = "Giriş Başarılı";
      this.router.navigate(['/']);
      location.assign("/");
    }, err => {
      this.uyesonuc.islem = false;
      this.uyesonuc.mesaj = "E-posta Adresi veya Parola Geçersiz!";
    });
  }

  Giris() {
    if (this.secUye.key == "") {
      this.fbServis.UyeEkle(this.secUye).then(s => {
        this.durum = "Kayıt Eklendi";
        this.sonuc = true;
      });
    }
  }
}
