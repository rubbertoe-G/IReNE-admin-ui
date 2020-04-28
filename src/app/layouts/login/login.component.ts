import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { ForbiddenUsernameValidator } from "src/app/shared/forbiddenUsername.directive"
import { ForbiddenPasswordValidator } from "src/app/shared/forbiddenPassword.directive"
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

/**
 * Component that manages all the necessary procedures for a user to login.
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Forms with the fields and validators that are going to be used in the login form.
  */
  loginForm: FormGroup;

  /**
   * Variable that determines if the login is still waiting for the backend response.
  */
  loading = false;

  /**
   * Url that the user is going to go to after login in.
  */
  returnUrl: string;

  /**
   * Flag variable that tells if there are any incorrect fields.
  */
  incorrectFields = false;

  /**
   * Construct the Login component with a router, an authentication service, an activated route and a form builder.
   * 
   * @param {Router} router router object to be used
   * @param {AuthenticationService} authenticationService authentication server for backend communication
   * @param {ActivatedRoute} route route to access query params
   * @param {FormBuilder} fb form builder for the login form
   */
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
      }
     }

  /**
   * Initialization function that gives the form builder all the validators needed for each field.
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [
          Validators.required,
          ForbiddenUsernameValidator()
        ]),
      password: new FormControl('', [
          Validators.required,
          ForbiddenPasswordValidator()
        ])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/revision-history';
  }

  /**
   * 
   * @ignore 
   */
  keyDownLogin(e: KeyboardEvent){
    if(e.keyCode == 13){
      this.login()
    }
  }

  /**
   * Login function that performs the necessary procedures to try and acquire a token.
   */
  login(){
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
        .pipe(first())
        .subscribe(
          data => {
            // Simulate long request
            setTimeout(() => {
              this.router.navigate([this.returnUrl]);
            }, 1500);
          },
          error => {
            this.loading = false
            this.incorrectFields = true;
            //this.loginForm.reset()
            throw error;
          });
  }
  
  /**
   * @ignore
   */
  toDashboard() {
    this.router.navigate(['/']);

  }

}
