import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  // onSubmit(form){
  //   this._userService.updateUser().subscribe(
  //     response => {
  //       console.log(response);
  //       window.location.reload();
  //     },
  //     error => {
  //       console.log(<any>error);
  //     }
  //   );
  // }
}
