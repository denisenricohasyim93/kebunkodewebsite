import { Component, OnInit } from '@angular/core';
import { StyleServiceService } from 'src/app/service/style-service.service';

@Component({
  selector: 'app-perlengkapan',
  templateUrl: './perlengkapan.page.html',
  styleUrls: ['./perlengkapan.page.scss'],
})
export class PerlengkapanPage implements OnInit {

  public headerWidth = null;
  public sisaHeaderWidth = null;
  width = null;
  height = null;

  constructor(public styleService : StyleServiceService) {
    this.headerWidth = styleService.headerWidth
    this.sisaHeaderWidth = styleService.sisaHeaderWidth
    this.width = styleService.width
    this.height = styleService.height - 75
  }

  ngOnInit() {
  }

}
