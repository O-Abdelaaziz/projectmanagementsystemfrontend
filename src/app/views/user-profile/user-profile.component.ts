import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/modules/user-profile';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/modules/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public user: User = new User();
  userProfile: UserProfile = new UserProfile();
  userProfiles: UserProfile[] = [];
  userProfileUid: string;
  imageUserProfile: any;
  userFile;
  public imagePath;
  imgURL: any;
  public message: string;
  submitted: boolean = false;

  constructor(
    public userProfileService: UserProfileService,
    private userService: UserService,
    private toastr: ToastrService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setUserProfileUid();
    this.setetUserProfilUserId();

    this.getUserProfile();
    this.getUser();
    this.getThumbnail();
    this.userProfileService.refreshNeeded$.subscribe(() => {
      this.setUserProfileUid();
      this.setetUserProfilUserId();
      this.getUserProfile();
    });
  }


  getUser(){
    this.activeRouter.params.subscribe(
      params=>{
        let uid=params['uid'];
        if(uid){
          this.userService.getUser(uid).subscribe(
            (user)=>{
              this.user=user
              // console.log('this user' + user)
            }      
          )
        }
      }
    )
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

  setUserProfileUid() {
    this.activeRouter.params.subscribe((params) => {
      let uid = params['uid'];

      if (uid) {
        this.userProfileUid = uid;
        this.userProfile.uid = this.userProfileUid;
      }
    });
  }

  setetUserProfilUserId() {
    this.activeRouter.params.subscribe((params) => {
      let uid = params['uid'];
      if (uid) {
        this.userService.getUser(uid).subscribe((user) => {
          this.userProfile.user.id = user.id;
        });
      }
    });
  }

  getUserProfile() {
    this.activeRouter.params.subscribe((params) => {
      let uid = params['uid'];
      if (uid) {
        this.userProfileService.getUserProfile(uid).subscribe((userProfile) => {
          this.userProfile = userProfile;
        });
      }
    });
  }

  createUserProfile(): void {
    const formData = new FormData();
    const userProfile = this.userProfile;

    formData.append('userProfile', JSON.stringify(userProfile));
    formData.append('file', this.userFile);

    this.userProfileService.saveUserProfile(formData).subscribe(
      (data) => {
        // console.log(data);
        this.opensweetalert('Profile', 'The Profile has created seccessfully.');
      },
      (error) => console.log(error)
    );
    this.userProfile.uid = this.userProfileUid;
    this.setetUserProfilUserId();
    this.opensweetalert('Profile', 'The Profile has created seccessfully.');
  }

  editeUserProfile(): void {
    const formData = new FormData();
    const userProfile = this.userProfile;

    formData.append('userProfile', JSON.stringify(userProfile));
    formData.append('file', this.userFile);

    this.userProfileService
      .editeUserProfile(formData, this.userProfileUid)
      .subscribe(
        (data) => {
          // console.log(data);
          this.opensweetalert(
            'Profile',
            'The Profile has updated seccessfully.'
          );
          // console.log('after sweet');
        },
        (error) => console.log(error)
      );
    this.userProfile.uid = this.userProfileUid;
    this.setetUserProfilUserId();
    this.opensweetalert('Profile', 'The Profile has updated seccessfully.');
  }

  onSubmit() {
    this.submitted = true;
    this.createUserProfile();
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        this.showSuccess('Image Format', this.message);
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  showSuccess(title: string, message: string) {
    this.toastr.error(message, title, {
      timeOut: 10000,
      positionClass: 'toast-top-right',
    });
  }

  opensweetalert(title: string, message: string) {
    Swal.fire(title, message, 'success');
  }
}
