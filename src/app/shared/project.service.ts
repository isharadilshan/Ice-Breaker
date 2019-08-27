import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectList: AngularFireList<any>;
  projectListForm: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) { 
    this.projectListForm = this.firebase.list('project');
    this.projectListForm.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  getTasks(){
    this.projectList = this.firebase.list('projects');
    return this.projectList.snapshotChanges(); //observable return from this function getTasks
  }

  insertTask(project){
    this.projectList.push({
      name: project.name
    });
  }

  updateProject(project){
    this.projectList.update(project.key,
    {
      name: project.name
    });
  }

  deleteProject($key: string){
    this.projectList.remove($key);
  }
}
