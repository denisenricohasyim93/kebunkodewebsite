import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() message = 'Default Pop-up Message.';
  @Input() selanjutnya = "";
  @Input() tampungan : any = null;

  nama_gh : any = "";
  luas : any = "";
  alamat : any = "";
  komoditas : any = "";
  adaMasalah : any = null;
  constructor(public router: Router) {
  }

  ngOnInit() {
    console.log('ini ngOnInit tampungan ', JSON.parse(this.tampungan.item))
    JSON.parse(this.tampungan.item).table_bed_or_tlg_crop.map((item, index) => {
        if ((item.keterangan_penyakit_pupuk_etc.toLowerCase().includes('over watering')) || (item.keterangan_penyakit_pupuk_etc.toLowerCase().includes('kena hama')) || (item.keterangan_penyakit_pupuk_etc.toLowerCase().includes('kurang sinar matahari')) || (item.keterangan_penyakit_pupuk_etc.toLowerCase().includes('layu'))) {
          this.adaMasalah = true
        }
    })
    this.nama_gh = JSON.parse(this.tampungan.item).location_name;
    this.luas = (JSON.parse(this.tampungan.item).luas_lahan + " " + JSON.parse(this.tampungan.item).satuan_luas_lahan);
    this.alamat = JSON.parse(this.tampungan.item).alamat;
    if (JSON.parse(this.tampungan.item).crops.length >= 3) {
      this.komoditas = JSON.parse(this.tampungan.item).crops[0].crop + ", " + JSON.parse(this.tampungan.item).crops[1].crop + ", " + JSON.parse(this.tampungan.item).crops[2].crop
    } else if (JSON.parse(this.tampungan.item).crops.length >= 2) {
      this.komoditas = JSON.parse(this.tampungan.item).crops[0].crop + ", " + JSON.parse(this.tampungan.item).crops[1].crop 
    } else if (JSON.parse(this.tampungan.item).crops.length >= 1) {
      this.komoditas = JSON.parse(this.tampungan.item).crops[0].crop 
    } else {
      this.komoditas = "Belum Terdaftar di Sistem"
    }
    
  }

  goToDetail() {
    console.log('this.tampungan.item', JSON.parse(this.tampungan.item))
    this.router.navigate(['/menu',{outlets:{menuoutlet:'sitedetail'}}], { queryParams: this.tampungan, queryParamsHandling: 'merge' })
  }

  goToDetail2() {
    
  }

}

// import { Component, OnInit, Input } from '@angular/core';

// @Component({
//   selector: 'app-popup',
//   template: './popup.component.html',
//   styleUrls: ['./popup.component.scss']
// })
// export class PopupComponent implements OnInit {

//   @Input() message = 'Default Pop-up Message.';

//   constructor() { }

//   ngOnInit() {
//   }

// }
