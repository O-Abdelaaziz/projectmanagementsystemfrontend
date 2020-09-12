import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/modules/task';

@Component({
  selector: 'app-badge-label',
  templateUrl: './badge-label.component.html',
  styleUrls: ['./badge-label.component.css']
})
export class BadgeLabelComponent implements OnInit {
  tasks :Task[]=[];

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.tasks=[];
    this.taskService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllTasks();
      }
    );

    this.selectAllTasks();
  }

  selectAllTasks(){
    return this.taskService.getTasks().subscribe(
      data=>{
        this.tasks=data;
      }
    )
  }

  getCountTaskIfNotComplete(){
    let count:number=0;
    for(let i=0 ;i<this.tasks.length;i++){
      if(this.tasks[i].statusCategory.name !== "complete"){
        count++;
      }
    }
    return count;
  }

}
