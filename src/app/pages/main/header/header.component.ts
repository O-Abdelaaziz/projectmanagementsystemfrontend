import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/modules/user';
import { NoticeService } from 'src/app/services/notice.service';
import { Notice } from 'src/app/modules/notice';
import { Task } from 'src/app/modules/task';
import { TaskService } from 'src/app/services/task.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User=new User();
  notices :Notice[]=[];
  tasks :Task[]=[];
  uid:string;
  username:string;
  dateCreated:string;
  currentUser:null;
  imageUserProfile: any;
  userProfileUid: string;

  constructor(
    private noticeService: NoticeService,
    private taskService:TaskService,
    private userService:UserService,
    private account:AccountService,
    private Token: TokenService,
    private router:Router,
    private activeRouter: ActivatedRoute,
    private userProfileService :UserProfileService) { }

  ngOnInit(): void {
    this.account.authStatus.subscribe(res=>{
      this.currentUser=this.Token.getInfos();
    })

    this.getAllSubscribersSubjects();
    this.getUserProfile();
    this.selectAllTasks();
    this.selectAllNotices();
    this.setUserProfileUid();
    this.getThumbnail();
  }


  getThumbnail(): void {

    this.userProfileService.getUserProfileImage(this.userProfileUid).subscribe(
      (val) => {
        this.createImageFromBlob(val);
      },
      (response) => {
        console.log('POST - getThumbnail - in error', response);
      },
      () => {
        console.log('POST - getThumbnail - observable is now completed.');
      }
    );
  }
  
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageUserProfile = reader.result;
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getUserProfile(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=this.Token.getId();
        if(uid){
         
          this.userService.getUser(uid).subscribe(
            (user)=>{
              this.uid=user.uid;
              this.username=`${user.username}`;
              this.dateCreated=`${user.date_created}`;
            }      
          )
        }
      }
    )
  }

  setUserProfileUid() {
    let uid=this.Token.getId();
      if (uid) {
        this.userProfileUid = uid;
      } 
  }


  getAllSubscribersSubjects(){
    this.tasks=[];
    this.taskService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllTasks();
      }
    );

    this.selectAllTasks();

    this.notices=[];
    this.noticeService.refreshNeeded$.subscribe(
      ()=>{
        this.selectAllNotices();
      }
    );

    this.selectAllNotices();
  }


  selectAllNotices(){
    return this.noticeService.getNotices().subscribe(
      data=>{
        this.notices=data;
      }
    )
  }

  selectAllTasks(){
    return this.taskService.getTasks().subscribe(
      data=>{
        this.tasks=data;
    }
    )
  }

  lougOut(){
    this.Token.remove();
    this.account.changeAuthStatus(false);
    this.router.navigateByUrl("/login");

  }

  getCountNoticeIfNotComplete(){
    let count:number=0;
    for(let i=0 ;i<this.notices.length;i++){
      if(this.notices[i].confirmed == false ){
        count++;
      }
    }
    return count;
  }

  getCountNoticeIfNotCompleteName(){
    let noteName:string='';
    for(let i=0 ;i<this.notices.length;i++){
      if(this.notices[i].confirmed === false ){
        noteName=this.notices[i].name;
      }
    }
    return noteName;
  }

  getCountTaskIfNotComplete(){
    let count:number=0;
    for(let i=0 ;i<this.tasks.length;i++){
      if(this.tasks[i].statusCategory.name !== "complete"){
        count++;
      }
    }
    return count;
  }

}
