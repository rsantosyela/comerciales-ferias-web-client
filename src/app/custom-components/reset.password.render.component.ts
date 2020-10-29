import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'modal',
  template: `
  <a (click)="sendRowData($event)">Resetear contraseña</a>
  `
})
export class ResetPasswordRenderComponent implements ViewCell, OnInit {
    //public showInput: boolean;
   
    public passwordField: string;

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() getRowData = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _ngxSmartModalService: NgxSmartModalService
    ) {
        this.passwordField = " "
        //this.showInput = false;  
    }
   
    ngOnInit() {
        //this.renderValue = this.value.toString().toUpperCase();
    }

    hey(){
        console.log("Hey!");
        this._ngxSmartModalService.get("myModal").open();
    }

    onSubmit(form){       
        this.rowData.password = this.passwordField.trim();
        console.log(this.passwordField);
        this._userService.updateUser(this.rowData).subscribe(
            data => {
                console.log(data);
                form.reset();
            },
            error => {
                console.log(error);
        });
    }
    
    sendRowData(event){
        console.log(event);
        this.getRowData.emit(this.rowData);
    }
    
    // toggleResetPassword(boolean){
    //     this.showInput = boolean;
    // }

    // onSubmit(form){
    //     this._userService.updateUser().subscribe(
    //         data => {
    //             this._router.navigate(['/usuarios']);
    //             console.log(data);
    //         },
    //         error => {
    //           console.log(error);
    //         });
    //   }

}