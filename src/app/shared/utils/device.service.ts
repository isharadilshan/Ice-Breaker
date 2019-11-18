import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('',Validators.required),
    code: new FormControl('',Validators.required)
  });

  constructor(private firebase: AngularFireDatabase) { }

  deviceList: AngularFireList<any>;

  initializeFormGroup(){  
    this.form.setValue({
      $key: null,
      title: '',
      code: ''
    });
  }

  getDevices(){
    this.deviceList = this.firebase.list('devices');
    return this.deviceList.snapshotChanges();
  }

  insertDevice(device){
    this.deviceList.push({
      title: device.title,
      code: device.code
    });
  }

  updateDevice(device){
    this.deviceList.update(device.$key,{
      title: device.title,
      code: device.code
    });
  }

  deleteDevice($key: string){
    this.deviceList.remove($key);
  }

  populateForm(device){
    this.form.setValue(device);
  }
}
