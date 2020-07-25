import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiCallsService } from '../api-calls.service';

interface TaskModel {
  text: string,
  title: string
}

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {
  title: string = '';

  @Input() task;

  createMode = false;

  taskModel: TaskModel = {
    title: "",
    text: ""
  }

  constructor(public modalService: NgbModal, private apiServices: ApiCallsService) { }

  ngOnInit() {
    if(this.task.mode === 'create') {
      this.createMode = true;
      this.title = 'New Task';
    }
    else {
      this.title = 'Edit Task';
      this.taskModel.title = this.task.taskDetails.title;
      this.taskModel.text = this.task.taskDetails.text
    }
  }

  create(){
    this.apiServices.createTodo(this.taskModel);
    this.modalService.dismissAll();
  }

  update(){
    this.apiServices.updateTodo(this.taskModel, this.task.taskId);
    this.modalService.dismissAll();
  }

  close(){
    this.modalService.dismissAll();
  }

}
