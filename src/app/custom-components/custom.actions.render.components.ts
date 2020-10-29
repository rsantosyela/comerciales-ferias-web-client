import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../app/services/user.service';

@Component({
  template: `
    <button (click)="deleteUser(this.rowData._id)">Borrar</button> 
  `,
})
export class CustomActionsRenderComponent implements ViewCell, OnInit {
   
    constructor(
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {}

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    deleteUser(id){
    this._userService.deleteUser(id).subscribe(
        response => {
            console.log(response); 
            window.location.reload();     
        },
            error => {
                console.log(<any>error);
            }
        )    
    }
}