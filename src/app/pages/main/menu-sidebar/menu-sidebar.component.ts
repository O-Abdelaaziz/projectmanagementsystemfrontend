import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {
  uid:string;
  username:string;
  dateCreated:string;
  currentUser:string;
  imageUserProfile: any;
  userProfileUid: string;

  constructor(
    private userService:UserService,
    private Token: TokenService,
    private account:AccountService,
    private activeRouter: ActivatedRoute,
    private userProfileService :UserProfileService

  ) { }

  ngOnInit(): void {

    this.account.authStatus.subscribe(res=>{
      this.currentUser=this.Token.getInfos();
    })

    this.getUserProfile();
    this.setUserProfileUid();
    this.getThumbnail();
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
}
