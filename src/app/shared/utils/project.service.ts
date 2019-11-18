import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('',Validators.required),
    code: new FormControl('',Validators.required)
  });

  constructor(private firebase: AngularFireDatabase) {}

  projectList: AngularFireList<any>;

  initializeFormGroup(){  
    this.form.setValue({
      $key: null,
      title: '',
      code: ''
    });
  }

  getProjects(){
    this.projectList = this.firebase.list('projects');
    return this.projectList.snapshotChanges();
  }

  insertProject(project){
    this.projectList.push({
      title: project.title,
      code: project.code
    });
  }

  updateProject(project){
    this.projectList.update(project.$key,{
      title: project.title,
      code: project.code
    });
  }

  deleteProject($key: string){
    this.projectList.remove($key);
  }

  populateForm(project){
    this.form.setValue(project);
  }

}