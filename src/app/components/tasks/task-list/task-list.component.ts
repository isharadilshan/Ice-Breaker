import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskComponent } from '../task/task.component';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private service: TaskService, private dialog: MatDialog, private notificationService: NotificationService) { }

  listData: MatTableDataSource<Task>;
  displayedColumns: string[] = ["title","description","project","deadlineDate","deadlineTime","priority","isDone","actions"];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

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
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        //   });
        // };
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
      this.notificationService.warn('! Deleted Successfully');
    }
  }

}

export class Task {
  title:string;
  description:string;
  project:string;
  deadlineDate: string;
  deadlineTime: string;
  category: string;
  priority: string;
  isDone: boolean;

}
