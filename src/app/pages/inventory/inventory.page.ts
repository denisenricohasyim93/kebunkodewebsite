import { Component, OnInit } from '@angular/core';
import { StyleServiceService } from 'src/app/service/style-service.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  public headerWidth = null;
  public sisaHeaderWidth = null;
  height = null;
  width = null;

  constructor(public styleService : StyleServiceService) {
    this.headerWidth = styleService.headerWidth
    this.sisaHeaderWidth = styleService.sisaHeaderWidth
    this.height = styleService.height - 75
    this.width = styleService.width
  }

  ngOnInit() {
  }

}
