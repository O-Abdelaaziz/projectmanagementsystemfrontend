import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/modules/task';
import { Category } from 'src/app/modules/category';
import { User } from 'src/app/modules/user';
import { Project } from 'src/app/modules/project';
import { ProjectService } from 'src/app/services/project.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import Swal  from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public task: Task = new Task();
  categories :Category[]=[];
  projects: Project[] =[];
  users :User[]=[];
  submitted:boolean=false;
  
  constructor(
    private taskService:TaskService,
    private projectService:ProjectService,
    private categoryService: CategoryService,
    private userService:UserService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }
 

 

  ngOnInit(): void {
    this.getTesk();
    this.selectAllUsers();
    this.selectAllProjects();
    this.selectAllCategories();
    this.taskService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllUsers();
        this.selectAllProjects();
        this.selectAllCategories();
      }
    );
  }

  getTesk(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=params['uid'];
        if(uid){
          this.taskService.getTask(uid).subscribe(
            (task)=>{
              this.task=task
            }      
          )
        }
      }
    )
  }


  newTask():void{
    this.submitted=false
    this.task=new Task();
  }

  createTask(): void {
    this.taskService.saveTask(this.task).subscribe(
      (data) => {
        this.opensweetalert('New Task','The Task is add seccessfully in the database.');    
      },
      (error) => console.log(error)
    );
    console.log(this.task);
    this.task=new Task();
    this.goToList();
  }
  
  editeTask(){
   
    this.taskService.editeTask(this.task).subscribe(
      response=>{
        this.router.navigate(['/dashboard/tasks'])
        this.opensweetalert('Task','The Task is updated seccessfully in the database.');
      }
    )
  }

  onSubmit(){
    this.submitted=true;
    this.createTask();
  }

  goToList(){
    this.router.navigateByUrl('dashboard/tasks')
  }

  selectAllUsers(){
    return this.userService.getUsers().subscribe(
      data=>{
        this.users=data;
      }
    )
  }

  selectAllProjects(){
    return this.projectService.getProjects().subscribe(
      data=>{
        this.projects=data;
      }
    )
  }

  selectAllCategories(){
    return this.categoryService.getCategories().subscribe(
      data=>{
        this.categories=data;
      }
    )
  }

  opensweetalert(title:string,message:string)
  {
    Swal.fire(title,message,'success')
  }
}
