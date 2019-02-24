import { NgModule, forwardRef, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule} from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuPage } from './pages/menu/menu.page';
import { LoginPage } from './login/login.page';
import { FirstPage } from './pages/first/first.page';
import { SecondPage } from './pages/second/second.page';
import { UserServiceService } from './service/user-service.service';
import { NotFoundPage } from './not-found/not-found.page';
import { StyleServiceService } from './service/style-service.service';
import { HomePage } from './pages/home/home.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { KomoditasPage } from './pages/products/komoditas/komoditas.page';
import { PerlengkapanPage } from './pages/products/perlengkapan/perlengkapan.page';
import { PupukataupestisidaPage } from './pages/products/pupukataupestisida/pupukataupestisida.page';
import { RealtimeshopPage } from './pages/realtimeshop/realtimeshop.page';
import { InventoryPage } from './pages/inventory/inventory.page';
import { AturkebunPage } from './pages/aturkebun/aturkebun.page';
import { SettingsPage } from './pages/settings/settings.page';
import { UserSettingsPage} from './pages/user-settings/user-settings.page';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SitedetailPage } from './pages/sitedetail/sitedetail.page';
import { DataServiceService } from './service/data-service.service';
import { PopupComponent } from './components/popup/popup.component';
import { BlockDetailPage } from './modals/block-detail/block-detail.page';
import { SendTaskPage } from './modals/send-task/send-task.page';
import { TaskProgressPage }from './modals/task-progress/task-progress.page';
// import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    PopupComponent,
    AppComponent,
    LoginPage,
    MenuPage,
    HomePage,
    DashboardPage,
    KomoditasPage,
    PerlengkapanPage,
    PupukataupestisidaPage,
    RealtimeshopPage,
    InventoryPage,
    FirstPage,
    SecondPage,
    NotFoundPage,
    AturkebunPage,
    SettingsPage,
    SitedetailPage, 
    BlockDetailPage,
    SendTaskPage,
    TaskProgressPage,
    UserSettingsPage
    // PopupComponent
  ],
  entryComponents: [
    PopupComponent,
    LoginPage,
    MenuPage,
    HomePage,
    DashboardPage,
    KomoditasPage,
    PerlengkapanPage,
    PupukataupestisidaPage,
    RealtimeshopPage,
    InventoryPage,
    FirstPage,
    SecondPage,
    NotFoundPage,
    AturkebunPage,
    SettingsPage,
    SitedetailPage,
    BlockDetailPage,
    SendTaskPage,
    TaskProgressPage,
    UserSettingsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // forwardRef(() => UserServiceService),
    UserServiceService,
    // forwardRef(() => StyleServiceService),
    StyleServiceService,
    DataServiceService,
    // Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // forwardRef(() => Storage),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
}
