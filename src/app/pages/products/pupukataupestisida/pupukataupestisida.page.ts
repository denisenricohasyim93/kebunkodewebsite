import { Component, OnInit } from '@angular/core';
import { StyleServiceService } from 'src/app/service/style-service.service';

@Component({
  selector: 'app-pupukataupestisida',
  templateUrl: './pupukataupestisida.page.html',
  styleUrls: ['./pupukataupestisida.page.scss'],
})
export class PupukataupestisidaPage implements OnInit {

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
