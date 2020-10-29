import { Component, OnInit, Input } from '@angular/core';
import { CommercialAgentService } from '../../services/commercial.agent.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'edit-commercial-agent',
  templateUrl: './edit-commercial-agent.component.html',
  styleUrls: ['./edit-commercial-agent.component.css']
})
export class EditCommercialAgentComponent implements OnInit {
  public showEditForm: boolean;
  
  @Input() commercial_agent

  constructor(
    private _commercialAgentService : CommercialAgentService, 
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.showEditForm = false;
  }

  ngOnInit(){
  }

  toggleEditForm(check){
    this.showEditForm = check;
  }

  onSubmit(form){
    console.log(this.commercial_agent);
    this._commercialAgentService.updateCommercialAgent(this.commercial_agent).subscribe(
      response => {
        window.location.reload();
        //this._router.navigate(['/ferias']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteCommercialAgent(id){
    this._commercialAgentService.deleteCommercialAgent(id).subscribe(
      response => {
        window.location.reload();     
      },
      error => {
        console.log(<any>error);
      }
    )    
  }
}
