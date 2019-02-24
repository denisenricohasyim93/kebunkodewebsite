import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserServiceService {
  constructor(public storage : Storage) { }
  async makeLoginTrue(token : any, farmer_name: any, full_name: any) {
    await this.storage.set('login', 'true');
    await this.storage.set('token', token);
    await this.storage.set('farmer_name', farmer_name);
    await this.storage.set('full_name', full_name)
  }
  async makeLoginFalse() {
    await this.storage.set('login', 'false');
  }
  async clearAll() {
    await this.storage.clear()
  }
}
