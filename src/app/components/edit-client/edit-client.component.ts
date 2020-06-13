import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './../../models/clients';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  
  id:string;
  client : Client= {
    firstname : '',
    lastname : '',
    phone : null,
    email:'',
    balance:0
  };
  private router:Router;
  constructor(
    private clientService:ClientService, private route : ActivatedRoute , private flash : FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((client)=>{
      this.client = client ;
      console.log(client);
  });
}
  onSubmit(){
    this.client.id=this.id;
    this.clientService.updateClient(this.client);
    this.flash.show('client updated',{cssClass : 'alert-warning', timeout : 4000})
    this.router.navigate(['/client/edit',this.id]);
  }
}
