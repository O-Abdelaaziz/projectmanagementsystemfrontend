import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { User } from 'src/app/modules/user';
import { UserService } from 'src/app/services/user.service';
import Swal  from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { AccountService } from 'src/app/services/account.service';
declare var $;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User = new User();
  submitted:boolean=false;


  constructor(
    private auth: AuthService,
    private token:TokenService,
    private router: Router,
    private account:AccountService,
    private userService:UserService
  ) { }
  

 

  ngOnInit() {
    $('body').addClass('hold-transition login-page');
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });
  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

   newUser():void{
    this.submitted=false
    this.user=new User();
  }

  createUser() {
    this.auth.register(this.user).subscribe(
      (data) =>{
        //  console.log(data)
         this.opensweetalert('User','The User is add seccessfully in the database.');
        },
      (error) => console.log('send error',error)
    );
    // console.log(this.user);
    this.user=new User();
  }

  opensweetalert(tisit:string ,message:string)
  {
    Swal.fire(tisit,message,'success')
  }

}
