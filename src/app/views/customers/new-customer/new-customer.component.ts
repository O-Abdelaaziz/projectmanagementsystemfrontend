import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/modules/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal  from 'sweetalert2';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
})
export class NewCustomerComponent implements OnInit {

  public customer: Customer = new Customer();
  submitted:boolean=false;

  constructor(
    private customerServise: CustomerService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {this.getCustomer();}



  getCustomer(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=params['uid'];
        if(uid){
          this.customerServise.getCustomer(uid).subscribe(
            (customer)=>{
              this.customer=customer
              // console.log('this customer' + customer)
            }      
          )
        }
      }
    )
  }

  newCustomer():void{
    this.submitted=false
    this.customer=new Customer();
  }

  createCustomer(): void {
    this.customerServise.saveCustomer(this.customer).subscribe(
      (data) =>{ 
        this.opensweetalert('New Customer','The customer is add seccessfully in the database.');
        // console.log(data)
      },
      (error) => console.log(error)
    );
    // console.log(this.customer);
    this.customer=new Customer();
    this.goToList();
  }

  editeCustomer(){
   
    this.customerServise.editeCustomer(this.customer).subscribe(
      response=>{
        this.router.navigate(['/dashboard/customers'])
        this.opensweetalert('New Customer','The Customer is updated seccessfully in the database.');
      }
    )
    // console.log(this.customer);
  }

  onSubmit(){
    this.submitted=true;
    this.createCustomer();
  }

  goToList(){
    this.router.navigateByUrl('dashboard/customers')
  }

  opensweetalert(title:string,message:string)
  {
    Swal.fire(title,message,'success')
  }
}
