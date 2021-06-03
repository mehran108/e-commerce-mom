import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfigurationService } from 'services/configuration.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    // @ViewChild('f', {static: false}) loginForm: NgForm;

    username:any='';
    password:any='';
    public loginForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public configService: ConfigurationService,
        public fb: FormBuilder,
        public snackbar: MatSnackBar
        ) { }

    ngOnInit() {

        this.loginForm=this.fb.group({
            uEmail: new FormControl('', {
               validators: [Validators.required,Validators.email]
             }),
             uPassword: new FormControl('', {
               validators: [Validators.required]
             }),
           })

        }

    // On submit button click
    onSubmit() {
        // this.loginForm.reset();
        this.router.navigate(['/dashboard']);
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    Login=(userForm)=>{

        console.log(this.loginForm);

        const LoginControls = userForm.controls;
        const loginObj={};
        loginObj['username'] = LoginControls.uEmail.value;
        loginObj['password'] = LoginControls.uPassword.value;
        loginObj['grant_type'] = 'password';
        loginObj['client_id'] = '100';
        loginObj['client_secret'] = '888';
    
        console.log({loginObj});
        //this.spinner.show();
        if(userForm.valid){
          this.configService.LoginUser(loginObj)
        .subscribe(
          data => {
            console.log("data",data)
            if(data.code == "999"){
              
             // this.spinner.hide();
              const accessToken = data.data.value.response["access_token"];
              const refreshToken = data.data.value.response["refresh_token"];
    
              this.setToken(accessToken,refreshToken);
              this.router.navigate(['/dashboard1']);
              //this.snackbar.open('Login Successfull', '×', { panelClass: ['success'], verticalPosition: 'top', duration: 5000 });
    
              //this.isLoggedIn = true;
              //localStorage.setItem('isLoggedIn',this.isLoggedIn)
              //const decodedToken = this.token_decode(this.getToken());

            }
            else if(data.code == "909"){
             
              //this.spinner.hide();
              this.snackbar.open('Error!!!'+ 'Login Failed', '×', { panelClass: ['default'], verticalPosition: 'top', duration: 3000 });
            }
            else if(data.code == "902"){
             // this.spinner.hide();
              this.snackbar.open('Error!!! '+ 'Invalid username or password', '×', { panelClass: ['default'], verticalPosition: 'top', duration: 3000 });
            }
          }
        );
        }
    }

    Logout(){

        console.log("in logout");
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/dashboard']);
      }
    
      getToken(){
        return localStorage.getItem('access_token');
      }
      setToken(accessToken,refreshToken){
        localStorage.setItem('access_token',accessToken);
        localStorage.setItem('refresh_token',refreshToken);
      }
      getTokenExpiry(token) {
        var ans;
          try{
          let jwtData = token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          let decodedJwtData = JSON.parse(decodedJwtJsonData);
          ans  = decodedJwtData.exp;
        }
        catch(e){
         // console.log('token_decode: ' + e);
        }
        finally{
          return ans;
        }
      }
      public token_decode(token: string) {
        var decodedJwtData : any;
          let jwt = token;
          try{
          let jwtData = jwt.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          decodedJwtData = JSON.parse(decodedJwtJsonData)
        }
        catch(e){
          console.log('token_decode: ' + e);
        }
          return decodedJwtData;
      }
      getCurrentTime() {
        //   return epochNow;
        return Math.round(new Date().getTime() / 1000);
      }
}
