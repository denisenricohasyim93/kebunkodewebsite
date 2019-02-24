import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';
import { MenuPage } from './pages/menu/menu.page';
import { FirstPage } from './pages/first/first.page';
import { SecondPage } from './pages/second/second.page';
import { NotFoundPage } from './not-found/not-found.page';
import { HomePage } from './pages/home/home.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { KomoditasPage } from './pages/products/komoditas/komoditas.page';
import { PerlengkapanPage } from './pages/products/perlengkapan/perlengkapan.page';
import { PupukataupestisidaPage } from './pages/products/pupukataupestisida/pupukataupestisida.page';
import { RealtimeshopPage } from './pages/realtimeshop/realtimeshop.page';
import { InventoryPage } from './pages/inventory/inventory.page';
import { AturkebunPage } from './pages/aturkebun/aturkebun.page';
import { SettingsPage } from './pages/settings/settings.page';
import { SitedetailPage } from './pages/sitedetail/sitedetail.page';
import { UserSettingsPage } from './pages/user-settings/user-settings.page';
var routes: Routes =
  [{
    path: '',
    component: LoginPage,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/menu/(menuoutlet:usersettings)'
      },
      {
        path: 'home',
        outlet: 'menuoutlet',
        component: HomePage
      },
      {
        path: 'dashboard',
        outlet: 'menuoutlet',
        component: DashboardPage
      },
      {
        path: 'komoditas',
        outlet: 'menuoutlet',
        component: KomoditasPage
      },
      {
        path: 'perlengkapan',
        outlet: 'menuoutlet',
        component: PerlengkapanPage
      },
      {
        path: 'pupukataupestisida',
        outlet: 'menuoutlet',
        component: PupukataupestisidaPage
      },
      {
        path: 'realtimeshop',
        outlet: 'menuoutlet',
        component: RealtimeshopPage
      },
      {
        path: 'inventory',
        outlet: 'menuoutlet',
        component: InventoryPage
      },
      {
        path: 'aturkebun',
        outlet: 'menuoutlet',
        component: AturkebunPage
      },
      {
        path: 'settings',
        outlet: 'menuoutlet',
        component: SettingsPage
      },
      {
        path: 'sitedetail',
        outlet: 'menuoutlet',
        component: SitedetailPage
      },
      {
        path: 'usersettings',
        outlet: 'menuoutlet',
        component: UserSettingsPage
      }
      // {
      //   path: 'first',
      //   outlet: 'menuoutlet',
      //   component: FirstPage
      // },
      // {
      //   path: 'second',
      //   outlet: 'menuoutlet',
      //   component: SecondPage
      // }
    ],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '404',
    component: NotFoundPage,
    runGuardsAndResolvers: 'always'
  
  },
  {
    path: '**',
    redirectTo: '404',
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { 
 
}