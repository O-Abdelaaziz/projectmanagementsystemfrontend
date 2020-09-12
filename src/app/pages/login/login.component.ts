import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private auth: AuthService,
    private token:TokenService,
    private router: Router,
    private account:AccountService,
    private toastr: ToastrService
    
    ) {}

  ngOnInit() {
    $('body').addClass('hold-transition login-page');
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */,
      });
    });
  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe((res) => this.handleResponse(res));
  }


  handleResponse(data) {
   this.token.handle(data);
   this.account.changeAuthStatus(true);
   this.router.navigateByUrl("/dashboard")
   this.showSuccess()
  }

  showSuccess() {
    this.toastr.success('Welcome To Your Dashboar', 'Have fun!',{
      timeOut:10000,
      positionClass:'toast-top-right'
    });
  }

}
