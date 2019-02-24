import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { SendTaskPage } from '../send-task/send-task.page';
import { TaskProgressPage } from '../task-progress/task-progress.page';
import * as moment from 'moment';

@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.page.html',
  styleUrls: ['./block-detail.page.scss'],
})
export class BlockDetailPage implements OnInit {
  semua : any = "";
  no_bed_or_tlg : any = "";
  tgl_mulai : any = "";
  tgl_actual_panen : any = "";
  crop_di_tanam : any = "";
  umur : any = "";
  jumlah : any = 0;
  satuan : any = "";
  keterangan : any = "";
  pilihan : any = null;
  item : any ;
  constructor(public navParams : NavParams, public navCtrl : NavController, public modalCtrl: ModalController) { 
    
  }

  ngOnInit() {
    moment.locale('id');
    this.item = this.navParams.data.item;
    this.semua = this.navParams.data;
    this.pilihan = this.navParams.data.pilihan
    this.no_bed_or_tlg = this.navParams.data.values.no_bed_or_tlg;
    this.tgl_mulai = moment(this.navParams.data.values.tgl_mulai).format('DD MMMM YYYY');
    this.tgl_actual_panen = moment(this.navParams.data.values.tgl_actual_panen).format('DD MMMM YYYY');
    this.crop_di_tanam = this.navParams.data.values.keterangan_penyakit_pupuk_etc.toLowerCase().includes("masih bibit") ? "" : "Jenis Tanaman : " + this.navParams.data.values.crop_di_tanam;
    this.jumlah = this.navParams.data.values.jlh;
    this.satuan = this.navParams.data.values.stn_jlh;
    this.keterangan = this.navParams.data.values.keterangan_penyakit_pupuk_etc;
    this.umur = moment().diff(moment(this.navParams.data.values.tgl_mulai).format('YYYY-MM-DD'), 'weeks')
    console.log('this.semua ', this.semua)
    console.log('navParams ', this.navParams)
  }
  async kirimTugas() {
    this.modalCtrl.dismiss()
    const modalPage = await this.modalCtrl.create({
      component: SendTaskPage, 
      componentProps:{item : this.item, values: this.navParams.data.values},
      cssClass: 'my-custom-modal-css'
    });

    return await modalPage.present();
  }
  async taskProgress() {
    this.modalCtrl.dismiss()
    const modalPage = await this.modalCtrl.create({
      component: TaskProgressPage, 
      componentProps:{item : this.item, values: this.navParams.data.values},
      cssClass: 'my-custom-modal-css'
    });

    return await modalPage.present();
  }

}
