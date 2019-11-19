import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    type: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    comments: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    barcode: new FormControl('',Validators.required)
  });

  constructor(private firebase: AngularFireDatabase) { }

  deviceList: AngularFireList<any>;

  initializeFormGroup(){  
    this.form.setValue({
      $key: null,
      type: '',
      description: '',
      comments: '',
      status: '',
      barcode: ''
    });
  }

  getDevices(){
    this.deviceList = this.firebase.list('devices');
    return this.deviceList.snapshotChanges();
  }

  insertDevice(device){
    this.deviceList.push({
      type: device.type,
      description: device.description,
      comments: device.comments,
      status: device.status,
      barcode: device.barcode
    });
  }

  updateDevice(device){
    this.deviceList.update(device.$key,{
      type: device.type,
      description: device.description,
      comments: device.comments,
      status: device.status,
      barcode: device.barcode
    });
  }

  deleteDevice($key: string){
    this.deviceList.remove($key);
  }

  populateForm(device){
    this.form.setValue(device);
  }
}
