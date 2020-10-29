import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
  providers: [ ContactService ]
})
export class EditContactComponent implements OnInit {
  public showEditForm: boolean;
  
  @Input() contact

  constructor(
    private _contactService : ContactService, 
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  toggleEditForm(check){
    this.showEditForm = check;
  }

  onSubmit(form){
    console.log(this.contact);
    this._contactService.updateContact(this.contact).subscribe(
      response => {
        window.location.reload();
        //this._router.navigate(['/ferias']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteContact(id){
    this._contactService.deleteContact(id).subscribe(
      response => {
        window.location.reload();     
      },
      error => {
        console.log(<any>error);
      }
    )    
  }
}
