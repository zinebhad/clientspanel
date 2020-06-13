import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string;
  password : string;
  constructor(private authService : AuthClientService , private flash : FlashMessagesService , private route : Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.route.navigate(['/']);
      }
    })
  }

  onLogin(){
    this.authService.login(this.email , this.password)
        .then(auth =>{
          if(auth){
            this.flash.show('You are loged Successfully',{cssClass : 'alert-success' , timeout : 3000});
            this.route.navigate(['/']);
          }
        })
        .catch(error =>{
          this.flash.show(error.message,{cssClass : 'alert-danger' , timeout : 10000});
        })
  }
  onLoginWithGmail(){
    this.authService.loginWithGmail()
        .then(auth =>{
          if(auth){
            this.flash.show('You are loged Successfully',{cssClass : 'alert-success' , timeout : 3000});
            this.route.navigate(['/']);
          }
        })
        .catch(error =>{
          this.flash.show(error.message,{cssClass : 'alert-danger' , timeout : 10000});
        })
  }

}
