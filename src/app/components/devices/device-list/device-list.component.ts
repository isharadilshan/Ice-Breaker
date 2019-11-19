import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from 'src/app/shared/utils/services/device.service';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { DeviceComponent } from '../device/device.component';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})


export class DeviceListComponent implements OnInit {

  constructor(public authService: AuthService, private service: DeviceService, private dialog: MatDialog, private notificationService: NotificationService) { }

  searchKey: string;
  listData: MatTableDataSource<Device>;
  displayedColumns: string[] = ['type','description','comments','status','actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  ngOnInit() {

    this.service.getDevices().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });

        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data,filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          })  
        };

      });
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeviceComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeviceComponent,dialogConfig);
  }

  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
      this.service.deleteDevice($key);
      this.notificationService.warn('Deleted Successfully');
    }
  }

  signOut(){
    try{
      this.authService.signOut();
    }catch(err){
      console.log("Error occurs when trying to sign out ///"+err);
    }
  }

}
