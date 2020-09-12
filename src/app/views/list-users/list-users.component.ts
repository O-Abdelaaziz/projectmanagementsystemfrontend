import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { User } from 'src/app/modules/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public user: User = new User();
  users :User[]=[];
  submitted:boolean=false;
  closeResult = '';
  search:string;

  
  constructor(
    private userService: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.users=[];
    this.getUser();
    this.userService.refreshNeeded$.subscribe(
      ()=>{
        this.goToList();
      }
    );
    this.goToList();
  }

  newUser():void{
    this.submitted=false
    this.user=new User();
  }

  getUser(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=params['uid'];
        if(uid){
          this.userService.getUser(uid).subscribe(
            (user)=>{
              this.user=user
              console.log('this user' + user)
            }      
          )
        }
      }
    )
  }

  createUser(): void {
    this.userService.saveUser(this.user).subscribe(
      (data) =>{
         console.log(data)
         this.opensweetalert('User','The User is add seccessfully in the database.');
        },
      (error) => console.log('send error',error)
    );
    console.log(this.user);
    this.user=new User();
    this.goToList();
  }

  onSubmit(){
    this.submitted=true;
    this.createUser();
  }

  editeUser(){
   
    this.userService.editeUser(this.user).subscribe(
      response=>{
        //this.router.navigate(['/dashboard/customers'])
        this.opensweetalert('User','The User is updated seccessfully in the database.');
      }
    )
    console.log(this.user);
  }

  selectAllUsers(){
    return this.userService.getUsers().subscribe(
      data=>{
        this.users=data;console.log(data);
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
    this.selectAllUsers();
  }

  deleteCustomer(user:User){
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
       ${user.username}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.userService.removeUser(user.uid).subscribe(
          response=>{
            this.users=this.users.filter(cli => cli !== user)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `<h1>your going to delete this user</h1>\
               id= ${user.uid}\
               name= ${user.username}`,
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
