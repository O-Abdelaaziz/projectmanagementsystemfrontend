import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/modules/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  customers :Customer[]=[];
  closeResult = '';
 search:string;
  constructor(
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.customers=[];
    this.selectAllCustomert();

      this.customerService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllCustomert();
      }
    );

  }

  selectAllCustomert(){
    return this.customerService.getCustomers().subscribe(
      data=>{
        this.customers=data;
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

  selectCustomertByKeyWords(){
    return this.customerService.getCustomersByKeuWord(this.search).subscribe(
      (data)=>{
        if(data.length>0){
          this.customers=data;
        }    
      },
      (error)=>{
        console.log('Keyword not found....');
      }
    )
  }

  deleteCustomer(customer:Customer){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to delete this customer \
       ${customer.firstName} ${customer.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.customerService.removeCustomer(customer.uid).subscribe(
          response=>{
            this.customers=this.customers.filter(cli => cli !== customer)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `<h1>your going to deletethis client</h1>\
               id= ${customer.uid}\
               name= ${customer.firstName} ${customer.lastName}`,
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
}
