import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit{

  profileId:String='' //holding id of other peple
  profileDetails:any={} //holding profile details
  noPosts:boolean=false
  totalPosts:any={} //holding post details
  isSameUser:boolean=true
  isFollowing=true
  unFollowBtn:boolean=false
  profilepic:String=''
  isSettingsShown:Boolean=false
  userId:any=window.localStorage.getItem('InstaFlixId') //taking usrid freom localstorage
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService,private route:Router){}
  ngOnInit(): void {
   this.getOtherDetails()
  
   //follow button will not be present for the same user
   if(this.userId==this.profileId){
    this.isSameUser=false
   }
    
  }

  //getting detials of a specific person
  getOtherDetails(){
    let userId=window.localStorage.getItem('InstaFlixId')
    
    this.activatedRoute.params.subscribe((data:any)=>{
      this.profileId=data.otherId
      console.log(this.profileId)
      
  
      this.api.getDetails(this.profileId).subscribe((response:any)=>{
        
        console.log(response.details)
        this.profileDetails=response.details
        this.totalPosts=response.details.posts
        console.log(this.totalPosts)
       
      },(response:any)=>{
        //if no response page not found
        this.route.navigateByUrl('**')
      })
      this.api.getDetails(userId).subscribe((response:any)=>{
        console.log(response.details.Followers)
        this.profilepic=response.details.profilepic[0].path
          for(let i=0;i<response.details.Followers.length;i++){
            if(this.profileId==response.details.Followers[i].followId){

                 this.isFollowing=false
                 this.unFollowBtn=true
                 
            }
          }
      },(response:any)=>{
        //if no response page not found
        this.route.navigateByUrl('**')
      })
    })
  }
  //fuctionns in sidebar
  toHome(){
    let userId=window.localStorage.getItem('InstaFlixId')
   this.route.navigateByUrl(`social/home/${userId}`)
  }
  addPostPage(){
    let userId=window.localStorage.getItem('InstaFlixId')
    this.route.navigateByUrl(`social/uploadpost/${userId}`)

  }
  toMessage(){
    let userId=window.localStorage.getItem('InstaFlixId')
    this.route.navigateByUrl(`social/messages/${userId}`)

  }
  toProfile(){
    let userId=window.localStorage.getItem('InstaFlixId')
    this.route.navigateByUrl(`social/myprofile/${userId}`)

  }
  //following a user
  followUser(){
    let personalId=localStorage.getItem('InstaFlixId')
    this.api.followUser(personalId,this.profileId).subscribe((response:any)=>{
      
      this.getOtherDetails()
    },(response:any)=>{
      this.getOtherDetails()
      
    })
  }
//unfollowing a user
  unFollow(){
    let userId=window.localStorage.getItem('InstaFlixId')
    this.api.unFollow(userId,this.profileId).subscribe((response:any)=>{
      this.getOtherDetails()
      this.isFollowing=true
      this.unFollowBtn=false
    },(response:any)=>{
     this.getOtherDetails()
    })

  }

  logOut(){
   
    this.route.navigateByUrl(`/social/logout/${this.userId}`)
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
