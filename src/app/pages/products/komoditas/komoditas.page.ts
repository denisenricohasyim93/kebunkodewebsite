import { Component, NgModule, ComponentRef, Injector, ApplicationRef, ComponentFactoryResolver, Injectable, NgZone, OnInit } from "@angular/core";
import { NgElement, WithProperties } from '@angular/elements';
import { StyleServiceService } from 'src/app/service/style-service.service';
import { Map, latLng, tileLayer, Layer, marker, circleMarker, icon, Popup } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';
import { PopupComponent } from '../../../components/popup/popup.component';
import * as moment from 'moment';
@Component({
  selector: 'app-komoditas',
  templateUrl: './komoditas.page.html',
  styleUrls: ['./komoditas.page.scss'],
})
export class KomoditasPage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };

  public headerWidth = null;
  public sisaHeaderWidth = null;
  public headerHeight = null;
  public sisaHeaderHeight = null;
  public jadwals : any = [
    {
      "gambar" : "https://loremflickr.com/320/240/computer",
      "video" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "tanggal":"Sabtu, 23 Februari 2019",
      "judul":"Lorem Ipsum Dolor Sit Amet",
      "writer":"Pak Budi",
      "isi":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", 
      "publish_to_public" : 0
    },
    {
      "gambar" : "https://loremflickr.com/320/240/computer",
      "video" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "tanggal":"Sabtu, 23 Februari 2019",
      "judul":"Lorem Ipsum Dolor Sit Amet",
      "writer":"Pak Budi",
      "isi":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", 
      "publish_to_public" : 0
    },
    {
      "gambar" : "https://loremflickr.com/320/240/computer",
      "video" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "tanggal":"Sabtu, 23 Februari 2019",
      "judul":"Lorem Ipsum Dolor Sit Amet",
      "writer":"Pak Budi",
      "isi":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", 
      "publish_to_public" : 0
    },
    {
      "gambar" : "https://loremflickr.com/320/240/computer",
      "video" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "tanggal":"Sabtu, 23 Februari 2019",
      "judul":"Lorem Ipsum Dolor Sit Amet",
      "writer":"Pak Budi",
      "isi":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", 
      "publish_to_public" : 0
    },
  ]
  public jadwals_request : any = [
    {
      "tanggal_publish":"22 Februari 2019",
      "url":"https://loremflickr.com/320/240/banner"
    },
    {
      "tanggal_publish":"22 Februari 2019",
      "url":"https://loremflickr.com/320/240/banner"
    },
    {
      "tanggal_publish":"21 Februari 2019",
      "url":"https://loremflickr.com/320/240/banner"
    },
    {
      "tanggal_publish":"20 Februari 2019",
      "url":"https://loremflickr.com/320/240/banner"
    },
    {
      "tanggal_publish":"19 Februari 2019",
      "url":"https://loremflickr.com/320/240/banner"
    }
  ]
  public lat = 3.5807721;
  public lng = 98.6709135;
  public kumpulanMarker = [];
  public estimasiPendapatan = [];
  public adaData = null;
  public cuacaHariIniIcon: any = "";
  public HariIni: any = moment()
    .add(0, "day")
    .format("DD MMM YYYY");
  public HariIniFull: any = moment()
    .add(0, "day")
  .format("DD MMM YYYY");
  public cuacaBesokIcon: any = "";
  public Besok: any = moment()
    .add(1, "day")
    .format("DD MMM");
  public BesokFull: any = moment()
    .add(1, "day")
    .format("DD MMM YYYY");
  public cuacaLusaIcon: any = "";
  public Lusa: any = moment()
    .add(2, "day")
    .format("DD MMM");
  public LusaFull: any = moment()
    .add(2, "day")
    .format("DD MMM YYYY");

  public injector: Injector;
  public appRef: ApplicationRef;
  public resolver: ComponentFactoryResolver;
  public compRef: any;
  public component: any;

  public full_name : any = "haha";
  public nama_lho : any = "hihi";


  constructor(public styleService: StyleServiceService, public http: HttpClient, public storage: Storage, public alertController: AlertController, public navCtrl: NavController, public router : Router, public dataService : DataServiceService) {
    // this.storage
    //     .get("token")
    //     .then(async val1 => {
    //       var token = await val1;
          // await console.log(token);
          this.http
            .post("http://smartfarm.tritronik.com:3005/v0/weatherCondition", {
              latitude: this.lat,
              longitude: this.lng,
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTA4NDI3NDR9.Ulee-MdADwHjPhgWapLWBhXE8PeeE0kBgvPE0B0uIH8'
            })
            .subscribe((response: any) => {
              console.log(response);
              // this.cuacaHari0Icon =
              //   "https://darksky.net/images/weather-icons/" +
              //   response.json.daily.data[0].icon
              //     .replace(/\s+/g, "-")
              //     .toLowerCase() +
              //   ".png";
              // this.cuacaHari1Icon =
              //   "https://darksky.net/images/weather-icons/" +
              //   response.json.daily.data[1].icon
              //     .replace(/\s+/g, "-")
              //     .toLowerCase() +
              //   ".png";
              // this.cuacaHari2Icon =
              //   "https://darksky.net/images/weather-icons/" +
              //   response.json.daily.data[2].icon
              //     .replace(/\s+/g, "-")
              //     .toLowerCase() +
              //   ".png";
              // this.cuacaHari3Icon =
              //   "https://darksky.net/images/weather-icons/" +
              //   response.json.daily.data[3].icon
              //     .replace(/\s+/g, "-")
              //     .toLowerCase() +
              //   ".png";
              // this.cuacaHari4Icon =
              //   "https://darksky.net/images/weather-icons/" +
              //   response.json.daily.data[4].icon
              //     .replace(/\s+/g, "-")
              //     .toLowerCase() +
              //   ".png";
              // this.cuacaHari5Icon =
              //   "https://darksky.net/images/weather-icons/" +
              //   response.json.daily.data[5].icon
              //     .replace(/\s+/g, "-")
              //     .toLowerCase() +
              //   ".png";
              // this.cuacaHari6Icon =
              //   "https://darksky.net/images/weather-icons/" +
              //   response.json.daily.data[6].icon
              //     .replace(/\s+/g, "-")
              //     .toLowerCase() +
              //   ".png";
              this.cuacaHariIniIcon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[moment().add(0, "day").day()].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              this.cuacaBesokIcon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[moment().add(1, "day").day()].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              this.cuacaLusaIcon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[moment().add(2, "day").day()].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              // this.outside_air_temp_currently =
              //   response.json.currently.apparentTemperature;
              // this.kesimpulan_kondisi_luar = response.json.daily.summary;
            });
        // })
        // .catch(err => {
        //   alert("gagal dapatkan token");
        // });
  }

  sederhanakanTanggal(n) {
    return moment(n).add(0, "day").format("DD MMM");
  }

  // ngOnInit() {
  // }

  async ngOnInit() {
    // await this.storage.get('full_name').then(async (valx : any) => {
    //   await console.log('valxx : ', valx);
    //   this.full_name = await valx;
    //   this.nama_lho = await valx;
    //   await console.log('nama_lho', this.nama_lho)
    // })
    this.headerWidth = this.styleService.headerWidth - 30
    this.sisaHeaderWidth = this.styleService.sisaHeaderWidth + 30
    this.headerHeight = this.styleService.headerHeight
    this.sisaHeaderHeight = this.styleService.height - 100
    // await this.storage.get('token').then(async (val1) => {
    //   var token = await val1
    //   await this.storage.get('farmer_name').then(async (val2) => {
    //     var farmer_name = await val2
    //     await this.http.post('http://smartfarm.tritronik.com:3003/v0/estimasiPendapatan/total', {
    //       farmer_name: farmer_name,
    //       token: token
    //     }).subscribe(
    //       async (value : any) => {
    //         await console.log('bla bla bla ',value)
    //         if (value.status === 200) {
    //           this.estimasiPendapatan = value.data
    //           this.adaData = true
    //         }
    //         await console.log('ini lho', this.estimasiPendapatan)
    //       },
    //       async (err: any) => {
    //         await console.log('ini error estimasiPendapatan ', err)
    //       }
    //     )
    //     await this.http.post('http://smartfarm.tritronik.com:3005/v0/viewLand/byFarmer', {
    //       farmer_name: farmer_name,
    //       token: token
    //     }).subscribe(async (response: any) => {
    //       // await console.log(response)
    //       // this.kumpulanMarker = await response.land
    //       // map = await new Map('map').setView([this.kumpulanMarker[0].latitude, this.kumpulanMarker[0].longitude], 13);

    //       // await tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //       //   // tslint:disable-next-line
    //       //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //       //   maxZoom: 18
    //       // }).addTo(map);
    //       // if (this.kumpulanMarker !== []) {
    //       //   // await console.log('ini kumpulan marker ', this.kumpulanMarker)
    //       //   await this.kumpulanMarker.map(async (item, index) => {
    //       //     await marker([item.latitude, item.longitude], {
    //       //       icon : icon({
    //       //         iconUrl: './assets/map-marker-hi.png',
    //       //         shadowUrl: './assets/map-marker-hi.png',
              
    //       //         iconSize:     [20, 30], // size of the icon
    //       //         shadowSize:   [0, 4], // size of the shadow
    //       //         iconAnchor:   [20, 30], // point of the icon which will correspond to marker's location
    //       //         shadowAnchor: [0, 0],  // the same for the shadow
    //       //         popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    //       //     })
    //       //     })
    //       //       // .bindTooltip('Angular 4 marker (PopupComponent)')
    //       //     // .bindPopup('wkwkwkwkwk')
    //       //       .bindPopup(
    //       //         () => {
    //       //           const popupEl: NgElement & WithProperties<PopupComponent> = document.createElement('popup-element') as any;
    //       //           // Listen to the close event
    //       //           popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    //       //           popupEl.message = "Hhahahaaha";
    //       //           popupEl.tampungan = {item: JSON.stringify(item)}
    //       //           // Add to the DOM
    //       //           return document.body.appendChild(popupEl);
    //       //           // return popupEl;
    //       //         }
    //       //       )
              
    //       //     .on('click', function(e) {
    //       //       // var popup = Popup()
    //       //       // .setLatLng([item.latitude, item.longitude])
    //       //       // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    //       //       // .openOn(map);
    //       //       // this.openPopup();
    //       //       //  await alert(item.name);
    //       //       // if(confirm(item.name)){
    //       //       //   await this.router.navigate(['/menu',{outlets:{menuoutlet:'sitedetail'}}], { queryParams: { item: JSON.stringify(item)}, queryParamsHandling: 'merge' })
    //       //       // }
    //       //       // this.router.navigate(['/menu',{outlets:{menuoutlet:'sitedetail'}}], { queryParams: { item: JSON.stringify(item)}, queryParamsHandling: 'merge' })
    //       //       // if (this.compRef) this.compRef.destroy();
    //       //       // const compFactory = this.resolver.resolveComponentFactory(PopupComponent);
    //       //       // this.compRef = compFactory.create(this.injector);

    //       //       // this.compRef.instance.param = 0;
    //       //       // setInterval(() => this.compRef.instance.param++, 1000);

    //       //       // this.appRef.attachView(this.compRef.hostView);
    //       //       // this.compRef.onDestroy(() => {
    //       //       //     this.appRef.detachView(this.compRef.hostView);
    //       //       // });
    //       //       // let div = document.createElement('div');
    //       //       // div.appendChild(this.compRef.location.nativeElement);
    //       //       // marker.setPopupContent('wakwakwak');
    //       //     }.bind(this)).addTo(map);
    //       //     // await circleMarker([item.latitude, item.longitude], {radius: 10}).addTo(map);
    //       //     // await console.log(index)
    //       //   })
    //       // } else {
    //       //   const alert = await this.alertController.create({
    //       //     header: 'Alert',
    //       //     subHeader: 'Login Alert',
    //       //     message: 'Maaf, Anda Tidak Punya Lahan',
    //       //     buttons: ['OK']
    //       //   });
    //       //   await alert.present();
    //       // }
    //     })
    //   });
    // });

  }

}


