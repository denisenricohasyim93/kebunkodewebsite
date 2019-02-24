import { Injectable } from '@angular/core';

@Injectable()
export class DataServiceService {
  public dataLokasi = async function(item) {
    return new Promise(function(resolve, reject) {
      if (item) {
        resolve(item);
      } else {
        reject(Error("Not Getting Data"));
      }
    });
  }  
  constructor() { }
}
