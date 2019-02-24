import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HomePage} from '../../pages/home/home.page'
import * as moment from 'moment'

@Component({
  selector: 'app-task-progress',
  templateUrl: './task-progress.page.html',
  styleUrls: ['./task-progress.page.scss'],
})
export class TaskProgressPage implements OnInit {

  tgl : any = moment().format('DD/MM')
  tempat : any = ""

  constructor(public alertController : AlertController, public router: Router, public navParams : NavParams, public modalCtrl: ModalController, public navCtrl: NavController) { }

  ngOnInit() {
    console.log('bahaha ', this.navParams)
    console.log('wiwiwi ', this.navParams.data.values.no_bed_or_tlg)
    this.tempat = this.navParams.data.values.no_bed_or_tlg;
  }

  kembali() {
    // location.reload()
    // self.view.window!.rootViewController?.dismissViewControllerAnimated(false, completion: nil)
    // this.router.navigate(['/'])
    this.modalCtrl.dismiss()
    // this.navCtrl.navigateRoot('/')
  }

}
