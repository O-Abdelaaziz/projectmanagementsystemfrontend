import { Component, OnInit } from '@angular/core';
import { ProjectStatus } from 'src/app/modules/project-status';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectStatusService } from 'src/app/services/project-status.service';
import Swal  from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {
  public projectStatus: ProjectStatus = new ProjectStatus();
  projectStatuses :ProjectStatus[]=[];
  submitted:boolean=false;
  closeResult = '';
  search:string;

  
  constructor(
    private projectStatusService: ProjectStatusService,
    private router: Router,
    private activeRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.projectStatuses=[];
    this.getProjectStatus();
    this.projectStatusService.refreshNeeded$.subscribe(
      ()=>{
        this.goToList();
      }
    );
    this.goToList();
  }

  newProjectStatus():void{
    this.submitted=false
    this.projectStatus=new ProjectStatus();
  }

  getProjectStatus(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=params['uid'];
        if(uid){
          this.projectStatusService.getProjectStatus(uid).subscribe(
            (projectStatus)=>{
              this.projectStatus=projectStatus
            }      
          )
        }
      }
    )
  }

  createProjectStatus(): void {
    this.projectStatusService.saveProjectStatus(this.projectStatus).subscribe(
      (data) =>{
         this.opensweetalert('Status','The Status is add seccessfully in the database.');
        },
      (error) => console.log('send error',error)
    );
    this.projectStatus=new ProjectStatus();
    this.goToList();
  }

  onSubmit(){
    this.submitted=true;
    this.createProjectStatus();
  }

  editeProjectStatus(){
   
    this.projectStatusService.editeProjectStatus(this.projectStatus).subscribe(
      response=>{
        //this.router.navigate(['/dashboard/customers'])
        this.opensweetalert('Status','The Status is updated seccessfully in the database.');
      }
    )
  }

  selectAllProjectStatuses(){
    return this.projectStatusService.getProjectStatuses().subscribe(
      data=>{
        this.projectStatuses=data;console.log(data);
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
    this.selectAllProjectStatuses();
  }

  deleteCustomer(projectStatus:ProjectStatus){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to delete this status \
       ${projectStatus.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.projectStatusService.removeProjectStatus(projectStatus.uid).subscribe(
          response=>{
            this.projectStatuses=this.projectStatuses.filter(cli => cli !== projectStatus)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `<h1>your going to deletethis client</h1>\
               id= ${projectStatus.uid}\
               name= ${projectStatus.name}`,
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
}
