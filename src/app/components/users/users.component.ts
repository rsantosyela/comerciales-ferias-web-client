import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ UserService ]
})
export class UsersComponent implements OnInit {
  public show_form: boolean;
  public user: User;
  public users: Array<User>;
  public newPassword: string;
  public userForm: FormGroup;

  private defaultValuesUserForm = () => {
    return {
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    };
  }

  settings = {
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'resetAction', title: '<i class="btn-reset">Cambiar contraseña</i>'},
        { name: 'editAction', title: '<i class="btn-edit">Editar</i>'},
        { name: 'deleteAction', title: '<i class="btn-delete">Eliminar</i>'},    
      ],
      position: 'right',
    },    
    columns: {
      name: {
        title: 'Nombre',
        sortDirection: 'asc'
      },
      email: {
        title: 'Correo electrónico'
      },
    },
    noDataMessage: "No hay usuarios registrados"
  };

  constructor(
    private _userService : UserService, 
    private _router: Router,
    private _route: ActivatedRoute,
    private ngxSmartModalService: NgxSmartModalService,
  ) 
  { 
    this.show_form = false;
    this.user = new User("","","","","");
    this.newPassword = "";
  }

  ngOnInit(){
    this.getUsers();
    this.resetControllers();
  }

  resetControllers(){
    this.userForm = new FormBuilder().group(this.defaultValuesUserForm());
  }

  customActions(event){
    this.user = event.data;
    switch (event.action) {
 
      case "editAction":
        this.userForm.setValue({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password 
        });
        this.ngxSmartModalService.getModal("updateUserModal").open();
      break;
      
      case "resetAction":
         this.userForm.setValue({
          name: this.user.name,
          email: this.user.email,
          password: "" 
        });
        this.ngxSmartModalService.getModal("updatePasswordModal").open();
      break;

      case "deleteAction":
        this.ngxSmartModalService.getModal("deleteUserModal").open();
      break;
      
      default:

      break;
    }
  }
  
  reload(){
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['usuarios']);
  }
  
  getUsers(){
    this._userService.getUsers().subscribe(
      response => {
        this.users = response.users;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  startNewUserModal(){
    this.ngxSmartModalService.getModal("createUserModal").open();
  }
  
  createUser(){
    this.user = new User("","","","","");
    this.user.name = this.userForm.value.name;
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;
    this._userService.createUser(this.user).subscribe(
      response => {
        console.log(response);
        this.ngxSmartModalService.getModal("createUserModal").close();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
 
  updateUser(){
    this.user.name = this.userForm.value.name;
    this.user.email = this.userForm.value.email;
    this._userService.updateUser(this.user).subscribe(
      response => {
        console.log(response);
        this.ngxSmartModalService.getModal("updateUserModal").close();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  updatePassword(){
    console.log(this.userForm.value);
    this.user.password = this.userForm.value.password;
    this._userService.updateUser(this.user).subscribe(
      response => {
        console.log(response);
        this.ngxSmartModalService.getModal("updatePasswordModal").close();
      },
      error => {
        console.log(<any>error);
      }
    );  
  }

  closeDeleteUserModal(){
    this.ngxSmartModalService.getModal("deleteUserModal").close();
  }

  deleteUser(id){
    if(this.users.length > 1){
      this._userService.deleteUser(id).subscribe(
        response => {
          console.log(response);
          this.ngxSmartModalService.getModal("deleteUserModal").close();        
        },
        error => {
          console.log(<any>error);
        }
      ) 
    }else{
      this.ngxSmartModalService.getModal("lastUserModal").open();
    }
  }
}
