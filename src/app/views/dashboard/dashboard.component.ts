import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/modules/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Project } from 'src/app/modules/project';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/modules/task';
import { TaskService } from 'src/app/services/task.service';
import { ProjectIssues } from 'src/app/modules/project-issues';
import { ProjectIssuesService } from 'src/app/services/project-issues.service';
import { Chart } from 'chart.js';

declare var $;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  projects: Project[] = [];
  projectIssueses: ProjectIssues[] = [];
  tasks: Task[] = [];
  data:number[]=[];


  public pieChartLabels: string[] =["rr","ff","hh","ll","kk"];
  public pieChartData: number[] = [];
  public pieChartType: string = 'doughnut';
  public pieChartOptions: any = {
    backgroundColor: ['#F1F2F4', '#357CA5', '#CF850F', '#BC4031', '#008D4D'],
    legend: {  
      display: false  
    },
    fill:true
  };

  constructor(
    private customerService: CustomerService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private projectIssuesService: ProjectIssuesService
  ) {}

  ngOnInit(): void {
    this.selectAllCustomert();
    this.selectAllProjects();
    this.selectAllTasks();
    this.selectAllprojectIssueses();
    this.getAllRefresh();
    this.getData();
  }

  getData(){
    let txtNotStarted:string;
    let txtInProgress:string;
    let txtInReview:string;
    let txtCanceled:string;
    let txtComplete:string;

    let countNotStarted:number=0;
    let countInProgress:number=0;
    let countInReview:number=0;
    let countCanceled:number=0;
    let countComplete:number=0;
    let data:number[]=[];
    let datast:string[]=[];
    for(let i=0 ;i<this.tasks.length;i++){
      if(this.tasks[i].statusCategory.name == "not started"){
        countNotStarted++;
        txtNotStarted="not started";
      }else if(this.tasks[i].statusCategory.name == "in progress"){
        countInProgress++;
        txtInProgress="in progress";
      }else if(this.tasks[i].statusCategory.name == "in review"){
        countInReview++;
        txtInReview="in review";
      }else if(this.tasks[i].statusCategory.name == "canceled"){
        countCanceled++;
        txtCanceled="canceled";
      }else if(this.tasks[i].statusCategory.name == "complete"){
        countComplete++;
        txtComplete="complete";
      }
    }
    data.push(countNotStarted,countInProgress,countInReview,countCanceled,countComplete);
    datast.push(txtNotStarted,txtInProgress,txtInReview,txtCanceled,txtComplete)
    this.pieChartLabels=datast;
    this.pieChartData=data;
    return data;
  }

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  getAllRefresh() {
    this.customerService.refreshNeeded$.subscribe(() => {
      this.selectAllCustomert();
    });

    this.projectService.refreshNeeded$.subscribe(() => {
      this.selectAllProjects();
    });

    this.taskService.refreshNeeded$.subscribe(() => {
      this.selectAllTasks();
    });

    this.projectIssuesService.refreshNeeded$.subscribe(() => {
      this.selectAllprojectIssueses();
    });
  }

  selectAllCustomert() {
    return this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  selectAllProjects() {
    return this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
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
    });
  }

  selectAllTasks() {
    return this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  selectAllprojectIssueses() {
    return this.projectIssuesService.getProjectIssueses().subscribe((data) => {
      this.projectIssueses = data;
    });
  }

  getcurrentLabel(statusName:String){
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
