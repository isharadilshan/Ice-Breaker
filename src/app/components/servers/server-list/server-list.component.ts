import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ServerService } from 'src/app/shared/utils/server.service';
import { ServerComponent } from '../server/server.component';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit {

  constructor(public authService: AuthService, private service: ServerService, private dialog: MatDialog, private notificationService: NotificationService) { }

  listData: MatTableDataSource<Server>;
  displayedColumns: string[] = ['title','url','actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {

    this.service.getServers().subscribe(
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
    this.dialog.open(ServerComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ServerComponent,dialogConfig);
  }

  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
      this.service.deleteServer($key);
      this.notificationService.warn('Deleted Successfully');
    }
  }

  //SOLID Principle 
  signOut(){
    try{
      this.authService.signOut();
    }catch(err){
      console.log("Error occurs when trying to sign out ///"+err);
    }
  }

}

export class Server{
  title: string;
  url: string;

}
