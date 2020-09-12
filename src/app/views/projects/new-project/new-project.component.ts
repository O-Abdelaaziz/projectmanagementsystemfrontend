import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/modules/project';
import { ProjectStatusService } from 'src/app/services/project-status.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectStatus } from 'src/app/modules/project-status';
import { Customer } from 'src/app/modules/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projectStatuses: ProjectStatus[] = [];
  customers: Customer[] = [];
  public project: Project = new Project();
  public projectStatus: ProjectStatus = new ProjectStatus();
  submitted: boolean = false;

  customerid: number;
  statusid: number = 10;

  constructor(
    private projectService: ProjectService,
    private projectStatusService: ProjectStatusService,
    private customerService: CustomerService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProject();
    this.selectAllProjectStatuses();
    this.selectAllCustomers();
    this.GetAllRefrech();
  
  }

  GetAllRefrech(){
    this.projectService.refreshNeeded$.subscribe(
      ()=>{
        this.getProject();
      }
    );
    this.projectStatusService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllProjectStatuses();
      }
    );
    this.customerService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllCustomers();
      }
    );
  }
  getProject() {
    this.activeRouter.params.subscribe((params) => {
      let uid = params['uid'];
      if (uid) {
        this.projectService.getProject(uid).subscribe((project) => {
          this.project = project;
        });
      }
    });
  }
  newProject(): void {
    this.submitted = false;
    this.project = new Project();
  }

  createProject(): void {
    this.projectService.saveProject(this.project).subscribe(
      (data) => {
        this.opensweetalert(
          'New Project',
          'The Pproject is add seccessfully in the database.'
        );
      },
      (error) => console.log(error)
    );
    this.project = new Project();
    this.goToList();
  }

  editeProject() {
    this.projectService.editeProject(this.project).subscribe((response) => {
      this.router.navigate(['/dashboard/projects']);
      this.opensweetalert(
        'Project',
        'The Project is updated seccessfully in the database.'
      );
    });
    // console.log(this.project);
  }

  onSubmit() {
    this.submitted = true;
    this.createProject();
  }

  goToList() {
    this.router.navigateByUrl('dashboard/projects');
  }

  createProjectStatus(): void {
    this.projectStatusService.saveProjectStatus(this.projectStatus).subscribe(
      (data) => {
        this.opensweetalert(
          'New Status',
          'The Status is add seccessfully in the database.'
        );
      },
      (error) => console.log(error)
    );
    // console.log(this.projectStatus);
    this.projectStatus = new ProjectStatus();
    this.selectAllProjectStatuses();
  }

  selectAllProjectStatuses() {
    return this.projectStatusService.getProjectStatuses().subscribe((data) => {
      this.projectStatuses = data;
      // console.log(data);
    });
  }

  selectAllCustomers() {
    return this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      // console.log(data);
    });
  }

  opensweetalert(title: string, message: string) {
    Swal.fire(title, message, 'success');
  }
}
