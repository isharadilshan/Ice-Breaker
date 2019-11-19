import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ServerService } from 'src/app/shared/utils/services/server.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})


export class ServerComponent implements OnInit {

  constructor(public service: ServerService, private notificationService: NotificationService, public dialogRef: MatDialogRef<ServerComponent>) { }

  ngOnInit() {
    this.service.getServers();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
        this.service.insertServer(this.service.form.value);
        this.notificationService.success('Submitted Successfully');
      }else{
        this.service.updateServer(this.service.form.value);
        this.notificationService.success('Updated Successfully');
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
