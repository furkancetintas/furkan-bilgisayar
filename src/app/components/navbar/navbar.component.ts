import { SepetservisService } from './../../services/sepetservis.service';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Uye } from 'src/app/models/uye';
import { Sepet } from 'src/app/models/sepet';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin: string;
  adminsonuc: boolean;
  uid: string;
  adsoyad: string;
  secUye: Uye = new Uye();
  isOpen: boolean = false;
  
  public totalItem : number = 0;

  constructor(
    public fbServis: FbservisService,
    public urunsepetServis: SepetservisService,
    public router: Router,
  ) { }

  ngOnInit() {
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.secUye.adsoyad = user.displayName;
    this.uid = user.uid;
    this.admin = user.uid;
    
    this.urunsepetServis.urunKayitListele().snapshotChanges().pipe().subscribe(res => {
      this.totalItem = res.length -2;
    })
  }

  toggleNavbar() {
    this.isOpen = !this.isOpen
  }

  adminKontrol() {
    if (this.admin == "PrsQl7nxCwSHtxRbRqzPSQgN3p53") {
      return true;
    }
    else {
      return false;
    }
  }

  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("User")
      this.router.navigate(['/giris'])
    })
    location.reload();
  }

}
