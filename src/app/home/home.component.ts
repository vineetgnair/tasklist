import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { Observable } from 'rxjs';
import { Task } from '../_models/_tasks'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { DetailsModalComponent } from '../details-modal/details-modal.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private services: ApiCallsService, private modalService: NgbModal) { }
  
  taskList:Task[] = [];

  ngOnInit() {
    this.services.getAll();
    this.listAll();
  }


  listAll() {
    this.services.tasksListCollection$.subscribe(data => {
      this.taskList = data;
    });
  }

  change(e, task){
    task.completed = e.target.checked;
    console.log(task.completed)
  } 

  createTask(){
    const modalRef = this.modalService.open(DetailsModalComponent);

    modalRef.componentInstance.task = {
      mode: 'create',
      taskDetails: {
        title: "",
        text: ""
      }
    }
  }

  editTask(task){
    const modalRef = this.modalService.open(DetailsModalComponent);
    modalRef.componentInstance.task = {
      mode: 'edit',
      taskId: task.id,
      taskDetails: {
        title: task.title,
        text: task.text
      }
    }
  }

  deleteTask(task) {
    this.services.deleteTodo(task.id)
  }

}
