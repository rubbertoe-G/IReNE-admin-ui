import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AuthenticationService } from "src/app/shared/services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  home(){
    this.router.navigate(['/']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
