import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('',Validators.required),
    url: new FormControl('',Validators.required)
  });

  constructor(private firebase: AngularFireDatabase) { }

  serverList: AngularFireList<any>;

  initializeFormGroup(){  
    this.form.setValue({
      $key: null,
      title: '',
      url: ''
    });
  }

  getServers(){
    this.serverList = this.firebase.list('servers');
    return this.serverList.snapshotChanges();
  }

  insertServer(server){
    this.serverList.push({
      title: server.title,
      url: server.url
    });
  }

  updateServer(server){
    this.serverList.update(server.$key,{
      title: server.title,
      url: server.url
    });
  }

  deleteServer($key: string){
    this.serverList.remove($key);
  }

  populateForm(server){
    this.form.setValue(server);
  }
}
