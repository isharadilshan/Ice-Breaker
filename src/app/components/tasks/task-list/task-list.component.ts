import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/shared/utils/services/task.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskComponent } from '../task/task.component';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})


export class TaskListComponent implements OnInit {

  constructor(public authService: AuthService, private service: TaskService, private dialog: MatDialog, private notificationService: NotificationService) { }

  searchKey: string;
  listData: MatTableDataSource<Task>;
  displayedColumns: string[] = ["title","description","project","deadlineDate","deadlineTime","priority","addedTime","isDone","actions"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.service.getTasks().subscribe(
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
      }
    );
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
    this.dialog.open(TaskComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(TaskComponent,dialogConfig);
  }

  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
      this.service.deleteTask($key);
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
