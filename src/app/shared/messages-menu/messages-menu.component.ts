import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/modules/notice';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-messages-menu',
  templateUrl: './messages-menu.component.html',
  styleUrls: ['./messages-menu.component.css']
})
export class MessagesMenuComponent implements OnInit {

  notices :Notice[]=[];

  constructor(private noticeService:NoticeService) { }

  ngOnInit(): void {
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

  getCountNoticeIfNotComplete(){
    let count:number=0;
    for(let i=0 ;i<this.notices.length;i++){
      if(this.notices[i].confirmed === false ){
        count++;
      }
    }
    return count;
  }

}
