import { Sepet } from './../../models/sepet';
import { Component, OnInit } from '@angular/core';
import { SepetservisService } from 'src/app/services/sepetservis.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  toplam: number = 0;

  uid: string;
  urunler: any;
  secUrunsepet: Sepet = new Sepet();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public urunsepetServis: SepetservisService
  ) { }

  ngOnInit(): void {
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.uid = user.uid;
    this.KayitListele();
  }
  KayitListele() {
    this.urunsepetServis.KayitListelebyUid(this.uid).snapshotChanges().subscribe(data => {
      this.urunler = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.urunler.push(y as Sepet)
      })
    });
  }
  btnSil(urunSepet: Sepet) {
    location.reload();
    this.urunsepetServis.urunKayitSil(urunSepet.key).then(s => {
    });
  }
  sepetToplam(toplamfiyat: string) {
    this.toplam = this.toplam + Math.max(parseFloat(toplamfiyat));
  }
}