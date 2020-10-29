import { Component, OnInit, Input } from '@angular/core';
import { FairService } from '../../services/fair.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'edit-fair',
  templateUrl: './edit-fair.component.html',
  styleUrls: ['./edit-fair.component.css'],
  providers: [ FairService]
})
export class EditFairComponent implements OnInit {
  public showEditForm: boolean;
  
  @Input() fair

  constructor(
    private _fairService : FairService, 
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.showEditForm = false;
  }

  ngOnInit(){
  }

  toggleEditForm(boolean){
    this.showEditForm = boolean;
  }

  onSubmit(form){
    console.log(this.fair);
    this._fairService.updateFair(this.fair).subscribe(
      response => {
        window.location.reload();
        //this._router.navigate(['/ferias']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteFair(id){
    this._fairService.deleteFair(id).subscribe(
      response => {
        window.location.reload();     
      },
      error => {
        console.log(<any>error);
      }
    )    
  }
}
