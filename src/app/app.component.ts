import { Component, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { TaskListComponent } from './components/task/task-list/task-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';
  taskName: string = "";
  todoList: string[] = [];
  copyTodoList: string[] = [];
  completeIdTask: number[] = [];
  allCompleteTask: boolean = false;
  idTasksForDelete: number[] = [];
  unfilfilledTaskList: string[] = [];
  taskLeft: number = 0;
  

  @ViewChildren(TaskListComponent) taskComponents!: QueryList<TaskListComponent>;

  deleteCompleteTask():void {
    let completeQueryList = this.taskComponents.filter(el => el.completeTask == false);
    console.log(completeQueryList)
    completeQueryList.forEach(el=>{
      this.unfilfilledTaskList.push(el.taskName);
    })
    this.todoList = this.unfilfilledTaskList;
    this.unfilfilledTaskList = [];
  }

  public changeAllTask() : void{
    this.allCompleteTask = !this.allCompleteTask;
    console.log("here")
    this.countTaskLeft();
  }

  public addTask() : void {
    if (this.taskName != "") this.todoList.push(this.taskName);
    this.copyTodoList = this.todoList;
    this.taskName = "";
    this.countTaskLeft();
  }

  public removeTask(idTask: number){
    this.todoList.splice(idTask, 1);
  }

  public viewAllTask(): void{
    this.todoList = this.copyTodoList;
    // let allTaskArr: string[] = [];
    // this.taskComponents.forEach((taskComponent)=>{
    //   allTaskArr.push(taskComponent.taskName);
    // })
    // this.todoList = allTaskArr;
    // console.log(this.taskComponents);
  }

  public viewActiveTask():void{
    this.copyTodoList = this.todoList;
    let activeTaskArr: string[] = [];
    this.taskComponents.forEach((taskComponent):void => {
      if (taskComponent.completeTask == false) activeTaskArr.push(taskComponent.taskName);
    })
    this.todoList = activeTaskArr;
  }

  public countTaskLeft() {
    // this.taskLeft = this.todoList.length;
    let countArr = [];
    this.taskComponents.forEach((taskComponent)=>{
      if (taskComponent.completeTask == false) countArr.push(taskComponent);
    })
    this.taskLeft = countArr.length;
    console.log("after taskLeft " + this.taskLeft);
  }
}