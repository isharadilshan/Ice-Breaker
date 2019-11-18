import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    server: new FormControl('',Validators.required),
    project: new FormControl('',Validators.required),
    buildDate: new FormControl(''),
    buildTime: new FormControl(''),
    buildExpireDate: new FormControl(''),
    buildExpireTime: new FormControl(''),
    buildVersion: new FormControl('',Validators.required),
    buildURL: new FormControl('',Validators.required)
  });

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  buildList: AngularFireList<any>;

  initializeFormGroup(){

    this.form.setValue({
      $key: null,
      server: '',
      project: '',
      buildDate: '',
      buildTime: '',
      buildExpireDate: '',
      buildExpireTime: '',
      buildVersion: '',
      buildURL: ''
    });
  }

  getBuilds(){
    this.buildList = this.firebase.list('builds');
    return this.buildList.snapshotChanges(); //observable return from getTasks
  }

  insertBuild(build){

    this.buildList.push({
      server: build.server,
      project: build.project,
      buildDate: build.buildDate=="" ? "" : this.datePipe.transform(build.buildDate, 'yyyy-MM-dd'),
      buildTime: build.buildTime,
      buildExpireDate: build.buildExpireDate=="" ? "" : this.datePipe.transform(build.buildExpireDate, 'yyyy-MM-dd'),
      buildExpireTime: build.buildExpireTime,
      buildVersion: build.buildVersion,
      buildURL: build.buildURL,
      buildTimestamp: build.buildDate !== null ? Date.parse(build.buildDate)+build.buildTime.split(':')[0]*3600000+build.buildTime.split(':')[1]*60000 : null,
      buildExpireTimestamp: build.buildExpireDate !== null ? Date.parse(build.buildExpireDate)+build.buildExpireTime.split(':')[0]*3600000+build.buildExpireTime.split(':')[1]*60000 : null,
      addedTime: Date.now(),

    });
  }

  updateBuild(build){

    this.buildList.update(build.$key,
      {
        server: build.server,
        project: build.project,
        buildDate: build.buildDate,
        buildTime: build.buildTime,
        buildExpireDate: build.buildExpireDate,
        buildExpireTime: build.buildExpireTime,
        buildVersion: build.buildVersion,
        buildURL: build.buildURL,
        buildTimestamp: build.buildDate !== null ? Date.parse(build.buildDate)+build.buildTime.split(':')[0]*3600000+build.buildTime.split(':')[1]*60000 : null,
        buildExpireTimestamp: build.buildExpireDate !== null ? Date.parse(build.buildExpireDate)+build.buildExpireTime.split(':')[0]*3600000+build.buildExpireTime.split(':')[1]*60000 : null,
        addedTime: Date.now(),//var date = new Date(timestamp) // Wed Nov 23 2016 18:03:25 GMT+0800 (WITA)

    });
  }

  deleteBuild($key: string){
    this.buildList.remove($key);
  }

  populateForm(build){
    this.form.setValue(_.omit(build,'addedTime','buildExpireTimestamp','buildTimestamp'));
  }
}
