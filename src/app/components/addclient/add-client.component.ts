import { AuthClientService } from 'src/app/services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from './../../client.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages'
import { Client } from 'src/app/models/clients';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]),
    lastName: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email, Validators.minLength(3)]),
    balance: new FormControl(0, Validators.required)
  })
  id:string;
client:Client={
  firstname : '',
  lastname : '',
  phone : null,
  email:'',
  balance:0,
  user:''
}
  constructor(private authService:AuthClientService,private clientService: ClientService, private router: Router,private flash: FlashMessagesService) { }
  ngOnInit(): void {
 this.authService.getAuth().subscribe(auth=>{
   this.client.user=auth.uid;
 })
  }

  onSubmit(){
    this.clientService.create(this.client);
    this.flash.show('client added',{cssClass : 'alert-warning', timeout : 4000})
    this.router.navigate(['/']);
  }

}
