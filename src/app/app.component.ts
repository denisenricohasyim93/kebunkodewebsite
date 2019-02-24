import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StyleServiceService } from './service/style-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public styleService: StyleServiceService,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.styleService.height = this.platform.height()
      this.styleService.width = this.platform.width()
      this.styleService.widthTextInput = this.platform.height() > this.platform.width() ? 0.7*this.platform.width() : 300
      this.styleService.headerWidth = this.platform.height() > this.platform.width() ? 0.20*this.platform.width() : 0.10*this.platform.width()
      this.styleService.sisaHeaderWidth = this.platform.height() > this.platform.width() ? 0.80*this.platform.width() : 0.90*this.platform.width()
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    let currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
    .then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }
  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    let currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }
}
