import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Client } from './models/clients';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection : AngularFirestoreCollection<Client>;
  clients :Observable<Client[]>;
  clientsDoc:AngularFirestoreDocument<Client>;
  constructor(private afs: AngularFirestore) {
    this.clientsCollection=this.afs.collection('clients');
   
  }

  getAll(user : string){ 
    return this.afs.collection('clients',ref => ref.where('user', '==' , user)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
 }

  create(data: Client) {
    return this.clientsCollection.add(data);
  }
  update(data: Client) {
    return this.clientsCollection.doc(data.id).update(data);
  }

  delete(id: string) {
  this.clientsCollection.doc(id).delete();
  }
 getClient(id:string){
   return this.clientsCollection.doc(id).valueChanges();
 }
 updateClient(client){
   this.clientsDoc =  this.clientsCollection.doc(client.id);
   this.clientsDoc.update(client);
 }

}
