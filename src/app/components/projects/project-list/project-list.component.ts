import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/shared/project.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  listData: MatTableDataSource<Project>;
  displayedColumns: string[] = ['title','code','actions'];
  searchKey: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ProjectService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.getProjects().subscribe(
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
    this.searchKey = "";
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
    dialogConfig.width = "40%";
    this.dialog.open(ProjectComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(ProjectComponent,dialogConfig);
  }

}

export class Project{
  title: string;
  code: string;
}
