import { Component, OnInit } from '@angular/core';
import { ProjectIssues } from 'src/app/modules/project-issues';
import { ProjectIssuesService } from 'src/app/services/project-issues.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal  from 'sweetalert2';
import { ProjectStatus } from 'src/app/modules/project-status';
import { Project } from 'src/app/modules/project';
import { ProjectStatusService } from 'src/app/services/project-status.service';
import { ProjectService } from 'src/app/services/project.service';

declare var $;

@Component({
  selector: 'app-project-issues',
  templateUrl: './project-issues.component.html',
  styleUrls: ['./project-issues.component.css']
})
export class ProjectIssuesComponent implements OnInit {

  public projectIssue: ProjectIssues = new ProjectIssues();
  projectIssueses :ProjectIssues[]=[];
  submitted:boolean=false;
  closeResult = '';
  search:string;

  projectStatuses :ProjectStatus[]=[];
  projects:Project[]=[];



  constructor(
    private projectService:ProjectService,
    private projectStatusService: ProjectStatusService,
    private projectIssuesService: ProjectIssuesService,
    private router: Router,
    private activeRouter: ActivatedRoute

  ) { }
 
  ngOnInit(): void {
    this.projectIssueses=[];
    this.getprojectIssues();
    this.projectIssuesService.refreshNeeded$.subscribe(
      ()=>{
        this.goToList();
        this.selectAllProjectStatuses();
        this.selectAllProjects();
      }
    );
    this.goToList();
    this.selectAllProjectStatuses();
    this.selectAllProjects();
  }

  newprojectIssues():void{
    this.submitted=false
    this.projectIssue=new ProjectIssues();
  }

  getprojectIssues(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=params['uid'];
        if(uid){
          this.projectIssuesService.getProjectIssues(uid).subscribe(
            (projectIssues)=>{
              this.projectIssue=projectIssues
            }      
          )
        }
      }
    )
  }

  createprojectIssues(): void {
    this.projectIssuesService.saveProjectIssues(this.projectIssue).subscribe(
      (data) => {
        this.opensweetalert('Project Issues','The Project Issues is add seccessfully in the database.');

      },
      (error) => console.log(error)
    );
    //console.log(this.projectIssue);
    this.projectIssue=new ProjectIssues();
    this.goToList();
  }

  onSubmit(){
    this.submitted=true;
    this.createprojectIssues();
  }

  editeprojectIssues(){
   
    this.projectIssuesService.editeProjectIssues(this.projectIssue).subscribe(
      response=>{
        //this.router.navigate(['/dashboard/customers'])
        this.opensweetalert('Project Issues','The Project Issues is updated seccessfully in the database.');
      }
    )
    // console.log(this.projectIssue);
  }

  selectAllprojectIssueses(){
    return this.projectIssuesService.getProjectIssueses().subscribe(
      data=>{
        this.projectIssueses=data;
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

  goToList(){
    this.selectAllprojectIssueses();
  }

  deleteCustomer(projectIssues:ProjectIssues){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to delete this Project Issues \
       ${projectIssues.project.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.projectIssuesService.removeProjectIssues(projectIssues.uid).subscribe(
          response=>{
            this.projectIssueses=this.projectIssueses.filter(cli => cli !== projectIssues)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `<h1>your going to deletethis client</h1>\
               id= ${projectIssues.uid}\
               name= ${projectIssues.project.name}`,
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


  opensweetalert(title:string,message:string)
  {
    Swal.fire(title,message,'success')
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

  selectAllProjectStatuses(){
    return this.projectStatusService.getProjectStatuses().subscribe(
      data=>{
        this.projectStatuses=data;
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

}
