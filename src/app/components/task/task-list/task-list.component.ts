import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() completeTask : boolean = false;
  @Input() taskName : string = "";
  @Input() id : number = -1;
  @Output() delNameTask = new EventEmitter<number>();
  @Output() countTaskLeft = new EventEmitter();

  public removeTask():void{
    this.delNameTask.emit(this.id);
    this.countTaskLeft.emit();
  }

  public changeTask():void{
    this.completeTask = !this.completeTask;
    this.countTaskLeft.emit();
  }
}
