import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken: string;

  constructor(

  ) {
    this.accessToken = sessionStorage.getItem('access_token');
  }

  canActivate(){
    
  }
}
