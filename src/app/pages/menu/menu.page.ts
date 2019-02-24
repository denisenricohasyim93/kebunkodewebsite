import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent} from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserServiceService } from 'src/app/service/user-service.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {

  selectedPath = '';
  munculin = null;
 
  pages = [
    {
      title: 'First Page',
      url: '/menu/(menuoutlet:first)'
    },
    {
      title: 'Second Page',
      url: '/menu/(menuoutlet:second)'
    }
  ];

  constructor(private router: Router, public userService: UserServiceService, public storage: Storage) { 
    this.storage.get('login').then((val) => {
      if (val === 'true') {
        this.munculin = true;
        this.router.events.subscribe((event: RouterEvent) => {
          this.selectedPath = event.url;
        }); 
      } else {
        this.munculin = false;
        this.router.navigate(['/'])
      }
    }); 
  }

  ngOnInit() {

  }

  async keluar() {
    await this.userService.makeLoginFalse();
    await this.userService.clearAll();
    if (this.router.navigated) {
      window.location.reload()
    } else { 
      await this.router.navigate(['/'])
    // window.location.href = await "http://smartfarm.tritronik.com:1000";
    }
  }
}