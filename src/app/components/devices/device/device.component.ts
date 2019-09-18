import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/shared/utils/device.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ProjectComponent } from '../../projects/project/project.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  constructor(public service: DeviceService, private notificationService: NotificationService, public dialogRef: MatDialogRef<ProjectComponent>) { }

  ngOnInit() {
    this.service.getDevices();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
        this.service.insertDevice(this.service.form.value);
      }else{
        this.service.updateDevice(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted Successfully');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
