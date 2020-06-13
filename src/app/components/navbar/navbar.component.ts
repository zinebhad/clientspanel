import { Router } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn:Boolean=false;
userLoggedIn:string;
  constructor(private authService:AuthClientService,private flash :FlashMessagesModule,private route:Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
 this.isLoggedIn=true;
 this.userLoggedIn=auth.email;
      }
      else{
        this.isLoggedIn=false;
      }
    })
  }
  onLogOut(){
    this.authService.logOut();
    this.isLoggedIn=false;
   return  this.route.navigate(['/login']);
  }

}
