import {FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
email:string;
password:string;
  constructor(private authService:AuthClientService,private route:Router,private flash:FlashMessagesService) { }

  ngOnInit(): void {
  }
  onRegister(){
    this.authService.register(this.email,this.password)
      .then(register =>{
          this.flash.show('Congratulation you are logged', {cssClass : 'alert-success' , timeout : 4000});
          this.route.navigate(['/']);
        
      })
      .catch(error =>{
        this.flash.show(error.message, {cssClass : 'alert-danger' , timeout : 4000});
      })
  }

}
