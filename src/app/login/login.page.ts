import { Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserServiceService } from '../service/user-service.service';
import { StyleServiceService } from '../service/style-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  email = "";
  password = "";
  width = null;
  height = null;
  widthTextInput = null;
  munculin = null;
  constructor(
    public userService : UserServiceService, 
    public styleService: StyleServiceService, 
    public router: Router, 
    public storage: Storage,
    public alertController: AlertController,
    public http: HttpClient
    ) {
      // this.munculin = false;
      // this.router.navigate(['/menu'])
    // this.storage.set('login', 'true');
    // this.storage.get('login').then((val) => {
    //   // if (val === 'true') {
    //   //   this.munculin = false;
    //   //   this.router.navigate(['/menu'])
    //   // } else {
    //   //   this.munculin = true;
    //   //   // this.router.navigate(['/menu'])
    //   //   // location.reload()
    //   // }
    //   // alert(val)
    //   if (val === 'true') {
    //     this.munculin = false;
    //     this.router.navigate(['/menu'])
    //   } else {
    //     this.munculin = true;
    //     // this.router.navigate(['/menu'])
    //     // location.reload()
    //   }
    //   // this.munculin = true;
    //   // this.router.navigate(['/menu'])
    // }); 
    // this.munculin = true;
    // this.router.navigate(['/menu'])
    this.width = styleService.width;
    this.height = styleService.height;
    this.widthTextInput = styleService.widthTextInput;
    // console.log(this.width + ' ' +this.height)
  }

  async ngOnInit() {
    // this.router.navigate(['/menu'])
    // await this.storage.set('login', 'true');
    await this.storage.get('login').then((val) => {
      // if (val === 'true') {
      //   this.munculin = false;
      //   this.router.navigate(['/menu'])
      // } else {
      //   this.munculin = true;
      //   // this.router.navigate(['/menu'])
      //   // location.reload()
      // }
      // alert(val)
      if (val === 'true') {
        this.munculin = false;
        this.router.navigate(['/menu'])
      } else {
        this.munculin = true;
        // this.router.navigate(['/menu'])
        // location.reload()
      }
      // this.munculin = true;
      // this.router.navigate(['/menu'])
    }); 
  }

  async submit() {
    // console.log(this.username + ' ' + this.password)
    // this.http.post('http://smartfarm.tritronik.com:3009/v0/login/forOwner', {
    //   email : this.email,
    //   password : this.password
    // }).subscribe(async (response : any) => {
    //     if (response.status === 200) {
    //       // alert(JSON.stringify(response.name))
    //       // alert(JSON.stringify(response.token))
    //       // console.log(response.token)
    //       await this.userService.makeLoginTrue(response.token, response.name, response.jeson.full_name)
    //       if (this.router.navigated) {
    //         window.location.reload()
    //       } else {
    //         await this.router.navigate(['/menu'])
    //       }
    //     } else {
    //       const alert = await this.alertController.create({
    //         header: 'Alert',
    //         subHeader: 'Login Alert',
    //         message: 'Maaf, Anda belum beruntung',
    //         buttons: ['OK']
    //       });
    //       await alert.present();
    //     }
    // });
    // if (this.email === 'admin@iaeitb.com' && this.password === 'iaeitbjayaselalu') {
      await this.storage.set('login', 'true');
      if (this.router.navigated) {
        window.location.reload()
      } else {
        await this.router.navigate(['/menu'])
      }
    // } else {
    //   const alert = await this.alertController.create({
    //     header: 'Alert',
    //     subHeader: 'Login Alert',
    //     message: 'Maaf, Anda belum beruntung',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    // }
  }

  changeEmail(event) {
    // console.log(event)
    this.email = event.detail.value
  }

  changePassword(event) {
    // console.log(event)
    this.password = event.detail.value
  }

}
