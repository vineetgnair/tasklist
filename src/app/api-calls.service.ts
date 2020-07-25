import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Task } from './_models/_tasks'

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private httpClient: HttpClient) { }

  baseApiUrl = 'http://localhost:8080/';
  tasksCollection: BehaviorSubject<[]> = new BehaviorSubject([]);
  tasksListCollection$ = this.tasksCollection.asObservable();

  getAll(){
    return this.httpClient.get<any>('http://localhost:8080/todos')
    .subscribe(data => {
      this.tasksCollection.next(data);
    })
  }

  createTodo(task) {
    let headers = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.post<Task>(`${this.baseApiUrl}todos`, task, {headers})
    .subscribe(data => {
      this.getAll();
    },
    err => {
      console.log('err ', err)
    })
  }

  updateTodo(task, id){
    let headers = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.put<Task>(`${this.baseApiUrl}todos/${id}`, task, {headers})
    .subscribe(data => {
      this.getAll();
    },
    err => {
      console.log('err ', err)
    })
  }

  deleteTodo(id){
    let headers = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.delete<Task>(`${this.baseApiUrl}todos/${id}`, {headers})
    .subscribe(data => {
      this.getAll();
    },
    err => {
      console.log('err ', err)
    })
  }
}
