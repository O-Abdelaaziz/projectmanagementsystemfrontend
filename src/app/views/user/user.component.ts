import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/modules/task';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

declare var $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  tasks :Task[]=[];
  uid:string;

  closeResult = '';
  search:string;
  constructor(
    private taskService:TaskService,
    private userService:UserService,
    private Token: TokenService,
    private account:AccountService,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tasks=[];
    this.taskService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllTasks();
      }
    );

    this.selectAllTasks();

    this.getUserProfile();
  }

  getUserProfile(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=this.Token.getId();
        if(uid){
          this.userService.getUser(uid).subscribe(
            (user)=>{
              this.uid=user.uid;
              // console.log('this user' + user);
            }      
          )
        }
      }
    )
  }

  selectAllTasks(){
    return this.taskService.getTasks().subscribe(
      data=>{
        this.tasks=data;console.log(data);
        $(()=> {
          $('#example1').DataTable()
          $('#example2').DataTable({
            'paging': true,
            'lengthChange':false ,
            'searching': false, /* optional */
            'ordering':true,
            'info':true,
            'autoWidth':false
          })
        })
      }
    )
  }

  getTaskPriority(statusName:String){
    var classList='';
    if(statusName === 'Low'){
       classList = 'label label-primary'; 
    }else if (statusName ==='Meduim'){
      classList = 'label label-warning';
    }else if (statusName ==='Hight'){
      classList = 'label label-hight';
    }else if (statusName ==='Urgent'){
      classList = 'label label-danger';
    }
    return classList;
  }

  getTaskPrograssBadge(progress:number){
    let classList:string='';
    if(progress > 0 && progress <=45){
      classList ='label label-primary';      
    }else if (progress > 45 && progress <=75){
      classList = 'label label-warning';
    }else if (progress > 75 && progress <=100){
      classList = 'label label-success';
    }  
    return classList
  }

  getcurrentLabelProject(statusName:String){
    var classList='';
    if(statusName === 'new'){
       classList = 'label label-primary'; 
    }else if (statusName ==='not started'){
        classList = 'label label-default';
    }else if (statusName ==='on hold'){
      classList = 'label label-warning';
    }else if (statusName ==='in progress'){
      classList = 'label label-warning';
    }else if (statusName ==='canceled'){
      classList = 'label label-danger';
    }else if (statusName ==='paused'){
      classList = 'label label-paused';
    }else if (statusName ==='finished'){
      classList = 'label label-success';
    }
    return classList;
  }

  getTaskPrograss(progress:number){
    let classList:string='';
    if(progress > 0 && progress <=45){
      classList ='progress-bar progress-bar-primary';      
    }else if (progress > 45 && progress <=75){
      classList = 'progress-bar progress-bar-yellow';
    }else if (progress > 75 && progress <=100){
      classList = 'progress-bar progress-bar-success';
    }  
    return classList
  }

  getcurrentLabelTask(statusName: String) {
    var classList = '';
    if (statusName === 'not started') {
      classList = 'label label-default';
    } else if (statusName === 'in progress') {
      classList = 'label label-primary';
    } else if (statusName === 'in review') {
      classList = 'label label-warning';
    } else if (statusName === 'canceled') {
      classList = 'label label-danger';
    } else if (statusName === 'complete') {
      classList = 'label label-success';
    }
    return classList;
  }


}
