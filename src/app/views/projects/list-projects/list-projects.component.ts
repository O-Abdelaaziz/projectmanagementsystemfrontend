import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/modules/project';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';
import { Customer } from 'src/app/modules/customer';
import { ProjectStatus } from 'src/app/modules/project-status';
import { ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {
  projects :Project[]=[];
  closeResult = '';
  search:string;

  constructor(
    private projectService:ProjectService
  ) { }

  ngOnInit(): void {
    this.projects=[];
    this.projectService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllProjects();
      }
    );

    this.selectAllProjects();
  }

  selectAllProjects(){
    return this.projectService.getProjects().subscribe(
      data=>{
        this.projects=data;
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


  deleteProject(project:Project){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to delete this project \
       ${project.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.projectService.removeProject(project.uid).subscribe(
          response=>{
            this.projects=this.projects.filter(cli => cli !== project)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `<h1>your going to deletethis client</h1>\
               id= ${project.uid}\
               name= ${project.name}`,
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

}
