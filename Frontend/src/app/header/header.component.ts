import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

 userId:any={}
 profilepic:String=''
  isSettingsShown: boolean=false
 constructor(private api:ApiService){}
  ngOnInit(): void {
     this.userId=localStorage.getItem('InstaFlixId')
     this.api.getDetails(this.userId).subscribe((response:any)=>{
         this.profilepic=response.details.profilepic[0].path
     })
  }

  showSettings(){
    this.isSettingsShown=!this.isSettingsShown
    const settings:any=document.getElementById('setting')
    settings.style.backgroundColor='white'
    settings.style.color='#194954'

    if(this.isSettingsShown==false){
      settings.style.backgroundColor='#194954'
    settings.style.color='white'
    }
}

}
