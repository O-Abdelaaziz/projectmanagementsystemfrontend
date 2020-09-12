import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/modules/notice';
import { NoticeService } from 'src/app/services/notice.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  public notice: Notice = new Notice();
  notices :Notice[]=[];
  submitted:boolean=false;
  closeResult = '';
  search:string;

  
  constructor(
    private noticeService: NoticeService,
    private router: Router,
    private activeRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.notices=[];
    this.getNotice();
    this.noticeService.refreshNeeded$.subscribe(
      ()=>{
        this.goToList();
      }
    );
    this.goToList();
  }

  newNotice():void{
    this.submitted=false
    this.notice=new Notice();
  }

  getNotice(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=params['uid'];
        if(uid){
          this.noticeService.getNotice(uid).subscribe(
            (notice)=>{
              this.notice=notice
            }      
          )
        }
      }
    )
  }

  createNotice(): void {
    this.noticeService.saveNotice(this.notice).subscribe(
      (data) =>{
         this.opensweetalert('Notice','The Notice is add seccessfully in the database.');
        },
      (error) => console.log('send error',error)
    );
    this.notice=new Notice();
    this.goToList();
  }

  onSubmit(){
    this.submitted=true;
    this.createNotice();
  }

  editeNotice(){
   
    this.noticeService.editeNotice(this.notice).subscribe(
      response=>{
        this.opensweetalert('Notice','The Notice is updated seccessfully in the database.');
      }
    )
  }

  selectAllNotices(){
    return this.noticeService.getNotices().subscribe(
      data=>{
        this.notices=data;
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
    this.selectAllNotices();
  }

  deleteCustomer(notice:Notice){
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
       ${notice.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.noticeService.removeNotice(notice.uid).subscribe(
          response=>{
            this.notices=this.notices.filter(cli => cli !== notice)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `<h1>your going to delete this notice</h1>\
               id= ${notice.uid}\
               name= ${notice.name}`,
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

  getNoticeValidity(statusName:boolean){
    var classList='';
    if(statusName === true){
       classList = 'label label-success'; 
    }else if (statusName ===false){
      classList = 'label label-danger';
    }
    return classList;
  }

}
