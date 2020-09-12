import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/modules/task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';


declare var $;

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks :Task[]=[];
  closeResult = '';
  search:string;
  constructor(
    private taskService:TaskService
  ) { }

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


  deleteTask(task:Task){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to delete this task \
       ${task.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.taskService.removeTask(task.uid).subscribe(
          response=>{
            this.tasks=this.tasks.filter(cli => cli !== task)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `<h1>your going to deletethis client</h1>\
               id= ${task.uid}\
               name= ${task.name}`,
              'success'
            )
          }
        )
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Cancelled this operation',
          'error'
        )
      }
    })
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

}
