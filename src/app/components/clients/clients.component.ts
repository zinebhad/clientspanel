import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { Client } from 'src/app/models/clients';
import { ClientService } from './../../client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients : Client[];
  total : number = 0;
  searchClient : Client[];
  constructor(private clientService : ClientService ,private authService : AuthClientService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth=>{
      this.clientService.getAll(auth.uid).subscribe((resp)=>{
        this.searchClient=this.clients = resp;
        this.total = this.getTotal();
        
      })
    })
    
  }
  search(query : string){
    this.searchClient= (query) ? this.clients.filter(client => client.firstname.toLowerCase().includes(query.toLowerCase()) ||
     client.lastname.toLowerCase().includes(query.toLowerCase())  ) :this.clients;
  }

  getTotal(){
    return this.clients.reduce((total:number , client)=>{
      
      let x = +client.balance;
      return total +  x;
    }, 0)
  }

}
