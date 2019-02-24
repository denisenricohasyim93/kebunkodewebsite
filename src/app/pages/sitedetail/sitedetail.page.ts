import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { StyleServiceService } from "src/app/service/style-service.service";
import { DataServiceService } from "src/app/service/data-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { Chart } from "chart.js";
import { BlockDetailPage } from '../../modals/block-detail/block-detail.page';
import * as moment from "moment";

@Component({
  selector: "app-sitedetail",
  templateUrl: "./sitedetail.page.html",
  styleUrls: ["./sitedetail.page.scss"]
})
export class SitedetailPage implements OnInit {
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("lineCanvas2") lineCanvas2;
  lineChart: any;
  lineChart2: any;
  public estimasiPendapatan = [];
  public adaData = null;
  public headerWidth = null;
  public sisaHeaderWidth = null;
  public headerHeight = null;
  public sisaHeaderHeight = null;
  public namaLokasi = null;
  public lat = null;
  public lng = null;
  public luasLahan = null;
  public uom = null;
  public isHydroponic = null;
  public jlh_bed_or_tlg = 0;
  public bedeng_or_talang: any = [];
  public outside_air_temp_currently: null;
  public kesimpulan_kondisi_luar: null;
  public situasiPerBedengAtauTalang: any = [];
  public selectednomorbedtlg = null;
  public selectedtglmulai = null;
  public selectedcropyangditanam = null;
  public selectedketerangan = null;
  public crops: any = [];
  public cuacaHari0Icon : any = "";
  public Hari0 : any = moment().day(0).format("DD MMM");
  public cuacaHari1Icon : any = "";
  public Hari1 : any = moment().day(1).format("DD MMM");
  public cuacaHari2Icon : any = "";
  public Hari2 : any = moment().day(2).format("DD MMM");
  public cuacaHari3Icon : any = "";
  public Hari3 : any = moment().day(3).format("DD MMM");
  public cuacaHari4Icon : any = "";
  public Hari4 : any = moment().day(4).format("DD MMM");
  public cuacaHari5Icon : any = "";
  public Hari5 : any = moment().day(5).format("DD MMM");
  public cuacaHari6Icon : any = "";
  public Hari6 : any = moment().day(6).format("DD MMM");
  public cuacaHariIniIcon: any = "";
  public HariIni: any = moment()
    .add(0, "day")
    .format("DD MMM");
  public cuacaBesokIcon: any = "";
  public Besok: any = moment()
    .add(1, "day")
    .format("DD MMM");
  public cuacaLusaIcon: any = "";
  public Lusa: any = moment()
    .add(2, "day")
    .format("DD MMM");
  // public backgroundBedengTalang : any = [];
  width = null;
  height = null;
  public tpg : any = {}

  constructor(
    public styleService: StyleServiceService,
    public storage: Storage,
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public modalCtrl : ModalController
  ) {
    this.headerWidth = styleService.headerWidth;
    this.sisaHeaderWidth = styleService.sisaHeaderWidth;
    this.width = styleService.width;
    this.height = styleService.height - 75;
    this.route.queryParams.subscribe((params: any) => {
      console.log("ini lho : ", JSON.parse(params.item));
      this.tpg = params.item;
      this.crops = JSON.parse(params.item).crops;
      this.namaLokasi = JSON.parse(params.item).location_name;
      this.lat = JSON.parse(params.item).latitude;
      this.lng = JSON.parse(params.item).longitude;
      this.luasLahan = JSON.parse(params.item).luas_lahan;
      this.uom = JSON.parse(params.item).satuan_luas_lahan;
      this.situasiPerBedengAtauTalang = JSON.parse(
        params.item
      ).table_bed_or_tlg_crop;
      if (JSON.parse(params.item).is_container) {
        this.isHydroponic = true;
      } else {
        this.isHydroponic = false;
      }
      this.jlh_bed_or_tlg = JSON.parse(params.item).jlh_bed_or_tlg;

      for (var i = 0; i < this.jlh_bed_or_tlg; i++) {
        this.bedeng_or_talang.push(i);
      }
      this.storage
        .get("token")
        .then(async val1 => {
          var token = await val1;
          this.http
            .post("http://smartfarm.tritronik.com:3005/v0/weatherCondition", {
              latitude: this.lat,
              longitude: this.lng,
              token: token
            })
            .subscribe((response: any) => {
              console.log(response);
              this.cuacaHari0Icon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[0].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              this.cuacaHari1Icon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[1].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              this.cuacaHari2Icon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[2].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              this.cuacaHari3Icon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[3].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              this.cuacaHari4Icon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[4].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              this.cuacaHari5Icon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[5].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
              this.cuacaHari6Icon =
                "https://darksky.net/images/weather-icons/" +
                response.json.daily.data[6].icon
                  .replace(/\s+/g, "-")
                  .toLowerCase() +
                ".png";
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
              this.outside_air_temp_currently =
                response.json.currently.apparentTemperature;
              this.kesimpulan_kondisi_luar = response.json.daily.summary;
            });
        })
        .catch(err => {
          alert("gagal dapatkan token");
        });
      console.log(this.bedeng_or_talang);
    });
  }
  async ionViewDidEnter() {
    

  }
  async ngOnInit() {
    this.headerWidth = this.styleService.headerWidth
    this.sisaHeaderWidth = this.styleService.sisaHeaderWidth
    this.headerHeight = this.styleService.headerHeight
    this.sisaHeaderHeight = this.styleService.height - 75
    await this.storage.get('token').then(async (val1) => {
      var token = await val1
      await this.storage.get('farmer_name').then(async (val2) => {
        var farmer_name = await val2
        await this.http.post('http://smartfarm.tritronik.com:3003/v0/estimasiPendapatan/total', {
          farmer_name: farmer_name,
          token: token
        }).subscribe(
          async (value : any) => {
            await console.log('bla bla bla ',value)
            if (value.status === 200) {
              this.estimasiPendapatan = value.data
              this.adaData = true
            }
            await console.log('ini lho', this.estimasiPendapatan)
          },
          async (err: any) => {
            await console.log('ini error estimasiPendapatan ', err)
          }
        )
      });
    });
  }
  async openModal(n, i)
  {

    var data = { message : 'hello world' };

    const modalPage = await this.modalCtrl.create({
      component: BlockDetailPage, 
      componentProps:{values: n, pilihan : i, item: this.tpg},
      cssClass: 'my-custom-modal-css'
    });

    return await modalPage.present();
  }

  shadeHexColor(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

  backgroundBedengOrTalang(n) {
    var umur = moment().diff(moment(n.tgl_mulai).format('YYYY-MM-DD'), 'weeks');
    var ajal = moment(n.tgl_actual_panen).diff(moment(n.tgl_mulai), 'weeks');
    var persentase = umur / ajal;
    if (n.keterangan_penyakit_pupuk_etc.toLowerCase().includes("masih bibit") ||
      n.keterangan_penyakit_pupuk_etc.toLowerCase().includes("belum ditanam"))
    {
      return "#654321";
    } else if (
      n.keterangan_penyakit_pupuk_etc.toLowerCase().includes("sudah ditanam")
    ) {
      return this.shadeHexColor("#0eff00", -1*persentase);
    } else if (
      n.keterangan_penyakit_pupuk_etc.toLowerCase().includes("akan panen")
    ) {
      return this.shadeHexColor("#ffdc73", -1*persentase/2);
    } else if (
      n.keterangan_penyakit_pupuk_etc.toLowerCase().includes("baru ditanam")
    ) {
      return this.shadeHexColor("#0eff00", -1*persentase);
    } else if (
      n.keterangan_penyakit_pupuk_etc.toLowerCase().includes("lahan kosong") ||
      n.keterangan_penyakit_pupuk_etc.toLowerCase().includes("baru panen")
    ) {
      return "#654321";
    } else {
      return "darkgrey";
    }
  }

  // ngAfterViewInit() {
  //   this.situasiPerBedengAtauTalang.map((item, index) => {
  //     var ctx = document.getElementById("kanvas"+index);
  //     this.lineChart = new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: [
  //         "D-6",
  //         "D-5",
  //         "D-4",
  //         "D-3",
  //         "D-2",
  //         "D-1",
  //         "D"
  //       ],
  //       datasets: [
  //         {
  //           label: "",
  //           fill: true,
  //           lineTension: 0.7,
  //           backgroundColor: "rgba(0,0,139, 0.3)",
  //           borderColor: "rgba(0,0,139,1)",
  //           borderCapStyle: "butt",
  //           borderDash: [],
  //           borderDashOffset: 0.0,
  //           borderJoinStyle: "miter",
  //           pointBorderColor: "black",
  //           pointBackgroundColor: "#fff",
  //           pointBorderWidth: 1,
  //           pointHoverRadius: 5,
  //           pointHoverBackgroundColor: "grey",
  //           pointHoverBorderColor: "grey",
  //           pointHoverBorderWidth: 2,
  //           pointRadius: 1,
  //           pointHitRadius: 10,
  //           data: [23, 22, 21, 27, 25, 23, 22],
  //           spanGaps: false
  //         },
  //         {
  //           label: "",
  //           fill: true,
  //           lineTension: 0.7,
  //           backgroundColor: "rgba(75,192,192,0)",
  //           borderColor: "red",
  //           borderCapStyle: "butt",
  //           borderDash: [],
  //           borderDashOffset: 0.0,
  //           borderJoinStyle: "miter",
  //           pointBorderColor: "red",
  //           pointBackgroundColor: "#fff",
  //           pointBorderWidth: 1,
  //           pointHoverRadius: 5,
  //           pointHoverBackgroundColor: "red",
  //           pointHoverBorderColor: "rgba(220,220,220,1)",
  //           pointHoverBorderWidth: 2,
  //           pointRadius: 1,
  //           pointHitRadius: 10,
  //           data: [24,24,24,24,24,24,24],
  //           spanGaps: false
  //         },
  //         {
  //           label: "",
  //           fill: true,
  //           lineTension: 0.7,
  //           backgroundColor: "rgba(75,192,192,0)",
  //           borderColor: "rgb(0, 0, 255)",
  //           borderCapStyle: "butt",
  //           borderDash: [],
  //           borderDashOffset: 0.0,
  //           borderJoinStyle: "miter",
  //           pointBorderColor: "red",
  //           pointBackgroundColor: "#fff",
  //           pointBorderWidth: 1,
  //           pointHoverRadius: 5,
  //           pointHoverBackgroundColor: "red",
  //           pointHoverBorderColor: "rgba(220,220,220,1)",
  //           pointHoverBorderWidth: 2,
  //           pointRadius: 1,
  //           pointHitRadius: 10,
  //           data: [21,21,21,21,21,21,21],
  //           spanGaps: false
  //         }
  //       ]
  //     },
  //     options: {
  //         legend: {
  //             display: false,
  //             labels: {
  //                 // This more specific font property overrides the global property
  //                 // fontSize: 3,
  //                 fontFamily: "Comfortaa-Regular"
  //             }
  //         },
  //         scaleShowValues: true,
  //         scales: {
  //           yAxes: [{
  //               ticks: {
  //                 beginAtZero: false
  //             }
  //           }],
  //           xAxes: [{
  //               ticks: {
  //               autoSkip: false
  //             }
  //           }]
  //         }
  //     }
  //   });
  //     var ctxx = document.getElementById("kanvass"+index);
  //     this.lineChart2 = new Chart(ctxx, {
  //       type: "line",
  //       data: {
  //         labels: [
  //           "D-6",
  //           "D-5",
  //           "D-4",
  //           "D-3",
  //           "D-2",
  //           "D-1",
  //           "D"
  //         ],
  //         datasets: [
  //           {
  //             label: "",
  //             fill: true,
  //             lineTension: 0.7,
  //             backgroundColor: "rgba(0,100,0,0.3)",
  //             borderColor: "rgb(0,100,0)",
  //             borderCapStyle: "butt",
  //             borderDash: [],
  //             borderDashOffset: 0.0,
  //             borderJoinStyle: "miter",
  //             pointBorderColor: "black",
  //             pointBackgroundColor: "#fff",
  //             pointBorderWidth: 1,
  //             pointHoverRadius: 5,
  //             pointHoverBackgroundColor: "grey",
  //             pointHoverBorderColor: "grey",
  //             pointHoverBorderWidth: 2,
  //             pointRadius: 1,
  //             pointHitRadius: 10,
  //             data: [27+55, 24+55, 26+55, 27+55, 25+55, 26+55, 21+55],
  //             spanGaps: false
  //           },
  //           {
  //             label: "",
  //             fill: true,
  //             lineTension: 0.7,
  //             backgroundColor: "rgba(75,192,192,0)",
  //             borderColor: "red",
  //             borderCapStyle: "butt",
  //             borderDash: [],
  //             borderDashOffset: 0.0,
  //             borderJoinStyle: "miter",
  //             pointBorderColor: "red",
  //             pointBackgroundColor: "#fff",
  //             pointBorderWidth: 1,
  //             pointHoverRadius: 5,
  //             pointHoverBackgroundColor: "red",
  //             pointHoverBorderColor: "rgba(220,220,220,1)",
  //             pointHoverBorderWidth: 2,
  //             pointRadius: 1,
  //             pointHitRadius: 10,
  //             data: [24+55,24+55,24+55,24+55,24+55,24+55,24+55],
  //             spanGaps: false
  //           },
  //           {
  //             label: "",
  //             fill: true,
  //             lineTension: 0.7,
  //             backgroundColor: "rgba(75,192,192,0)",
  //             borderColor: "rgb(0,128,0)",
  //             borderCapStyle: "butt",
  //             borderDash: [],
  //             borderDashOffset: 0.0,
  //             borderJoinStyle: "miter",
  //             pointBorderColor: "red",
  //             pointBackgroundColor: "#fff",
  //             pointBorderWidth: 1,
  //             pointHoverRadius: 5,
  //             pointHoverBackgroundColor: "red",
  //             pointHoverBorderColor: "rgba(220,220,220,1)",
  //             pointHoverBorderWidth: 2,
  //             pointRadius: 1,
  //             pointHitRadius: 10,
  //             data: [21+55,21+55,21+55,21+55,21+55,21+55,21+55],
  //             spanGaps: false
  //           }
  //         ]
  //       },
  //       options: {
  //           legend: {
  //               display: false,
  //               labels: {
  //                   // This more specific font property overrides the global property
  //                   // fontSize: 3,
  //                   fontFamily: "Comfortaa-Regular"
  //               }
  //           },
  //           scaleShowValues: true,
  //           scales: {
  //             yAxes: [{
  //                 ticks: {
  //                   beginAtZero: false
  //               }
  //             }],
  //             xAxes: [{
  //                 ticks: {
  //                 autoSkip: false
  //               }
  //             }]
  //           }
  //       }
  //     });
  //   })
  // }

  showStatusBedengAtauTalang(n) {
    console.log("bla bla ", n);
    this.selectednomorbedtlg = null;
    this.selectedtglmulai = null;
    this.selectedcropyangditanam = null;
    this.selectedketerangan = null;
    this.selectednomorbedtlg = n.no_bed_or_tlg;
    // if (!this.situasiPerBedengAtauTalang.filter((item) => {
    //   return Number(item.no_bed_or_tlg.split(' ')[1]) === i
    // })[0]) {
    //   if (this.isHydroponic) {
    //     alert('data pada meja '+ i + ' tidak tersedia')
    //   } else {
    //     alert('data pada bedeng '+ i + ' tidak tersedia')
    //   }
    // } else {
    //   this.selectedtglmulai = this.situasiPerBedengAtauTalang.filter((item) => {
    //     return Number(item.no_bed_or_tlg.split(' ')[1]) === i
    //   })[0].tgl_mulai
    //   this.selectedcropyangditanam = this.situasiPerBedengAtauTalang.filter((item) => {
    //     return Number(item.no_bed_or_tlg.split(' ')[1]) === i
    //   })[0].crop_di_tanam
    //   this.selectedketerangan = this.situasiPerBedengAtauTalang.filter((item) => {
    //     return Number(item.no_bed_or_tlg.split(' ')[1]) === i
    //   })[0].keterangan_penyakit_pupuk_etc
    // }
    this.selectedtglmulai = n.tgl_mulai;
    this.selectedcropyangditanam = n.crop_di_tanam;
    this.selectedketerangan = n.keterangan_penyakit_pupuk_etc;
  }
}
