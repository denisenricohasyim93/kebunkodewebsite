import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BlockDetailPage } from '../block-detail/block-detail.page';

@Component({
  selector: 'app-send-task',
  templateUrl: './send-task.page.html',
  styleUrls: ['./send-task.page.scss'],
})
export class SendTaskPage implements OnInit {

  constructor(public alertController : AlertController, public router: Router, public navParams : NavParams, public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async kirimTugasBeneran() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Send Task Alert',
      message: 'Succeed',
      buttons: [{
        text: 'OK',
        handler: async () => {
          // await location.reload();
          this.modalCtrl.dismiss()
          const modalPage = await this.modalCtrl.create({
            component: BlockDetailPage, 
            componentProps:{values: this.navParams.data.values, pilihan : 3, item: this.navParams.data.item},
            cssClass: 'my-custom-modal-css'
          });

          return await modalPage.present();
          // this.router.navigate(['/menu',{outlets:{menuoutlet:'sitedetail'}}], { queryParams: {item : this.navParams.data.item}, queryParamsHandling: 'merge' })
          // console.log('item ', this.navParams.data.item)
        }
      }]
    });
    await alert.present();
  }

}
