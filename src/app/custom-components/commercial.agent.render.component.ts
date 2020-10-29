import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CommercialAgentRenderComponent implements ViewCell, OnInit {
    private commercial_agent;

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    //this.renderValue = this.value.toString().toUpperCase();
    this.commercial_agent = this.rowData.commercial_agent;
    
    if(this.commercial_agent != null){
      this.renderValue = this.commercial_agent.name;
    }else{
      this.renderValue = "NO ASIGNADO"
    }
    //console.log(this.rowData);
  }

}