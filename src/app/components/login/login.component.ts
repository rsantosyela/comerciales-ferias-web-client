import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';

//
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
//import { UserService} from '../../services/user.service';

import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService, ]
})
export class LoginComponent implements OnInit {
  public login: Login;
  public errorMessage: string;
  public showErrorMessage: boolean;
   
    constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute
  ){ 
    this.login = new Login("","");
    this.errorMessage = "Correo electrónico o Contraseña incorrectos"
    this.showErrorMessage = false;
  }
 
  ngOnInit(){ 
  
  }

  toggleErrorMessage(boolean){
    this.showErrorMessage = boolean;
  }

  onSubmit(form){
    this._authenticationService.login(this.login.email, this.login.password).subscribe(
        data => {
            this._router.navigate(['/usuarios']);
            console.log(data);
        },
        error => {
          console.log(error);
          //form.reset() 
          //this.error = error;
          //this.loading = false;
        });
  }

  ///
 
 
  // onSubmit(form){
  //   console.log(this.login);
  //   this._loginService.userLogin(this.login).subscribe(
  //     response => {
  //       this.showErrorMessage = false;
  //       console.log(response.token);
  //       window.localStorage.setItem("token", response.token);
  //       this._router.navigate(['/usuarios']);
  //     },
  //     error => {
  //       console.log(error.status);
  //       if(error.status == 404){
  //         form.reset();
  //         this.showErrorMessage = true;
  //       }
  //     }
  //   );
  // }

  // onSubmit(form){
  //   this._authenticationService.login(this.login.email, this.login.password)
  //   .pipe(first())
  //   .subscribe(
  //       data => {
  //           this._router.navigate(['/usuarios']);
  //           console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //         //form.reset() 
  //         //this.error = error;
  //         //this.loading = false;
  //       });
  // }



}


