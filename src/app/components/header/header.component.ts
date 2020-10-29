import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(){
  }

  startUserLogOutModal(){
    this.ngxSmartModalService.getModal("userLogOutModal").open();
  }

  closeUserLogOutModal(){
    this.ngxSmartModalService.getModal("userLogOutModal").close();
  }
  
  userLogOut(){   
    this._authenticationService.logout()
    this._router.navigate(["/"]);
  }
}
