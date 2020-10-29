import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class FairRenderComponent implements ViewCell, OnInit {
  private fair;

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    //this.renderValue = this.value.toString().toUpperCase();
    this.fair = this.rowData.fair;

    if(this.fair != null){
      this.renderValue = this.fair.name;
    }else{
      this.renderValue = "NO ASIGNADO"
    }
    //this.renderValue = this.fair.name;
    //console.log(this.rowData);
  }

}