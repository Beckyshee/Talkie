import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userId:string=''
  profilepic:any={}
  isPicPresent:boolean=true
  ifProfilePicExist:boolean=false
  userDetails:any={}
  posts:any={}
  followers:String=''
  postNumber:String=''
  postPath:String=''
  comments:any={}
  isCommentPresent:boolean=false
  commentCount:String=''
  likesCount:String=''
  postName:String=''
  openModal:Boolean=false
  isEdit:boolean=false
  isMainPage:boolean=true
  editingDetails:any={}
  isSettingsShown:Boolean=false
  following:string=''
  followingDetails:any[]=[]
  followerDetails:any[]=[]
  isFollowedBySomeone:boolean=true
  isFollowingSomeone:boolean=true
  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,private api:ApiService,private route:Router){}
  ngOnInit(): void {

    //code for refreshing the page
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    //getting user id
  this.activatedRoute.params.subscribe((response:any)=>{
      this.userId=response.InstaId
  })
  this.getDetails()

  //getting the specific user details
 
  }

  //getting user details in profile page
  getDetails(){
    this.api.getDetails(this.userId).subscribe((details:any)=>{
      console.log(details.details.profilepic[0])
      this.profilepic=details.details.profilepic[0].path
      // console.log(this.profilepic)
      this.userDetails=details.details
      this.posts=details.details.posts
      console.log(this.posts)
      //getting the counts
      this.followers=details.details.Followers.length
      this.postNumber=details.details.posts.length
      this.following=details.details.Following.length

      if(details.details.Followers.length==0){
       
        this.isFollowingSomeone=false
      }

      if(details.details.Following.length==0){
        this.isFollowedBySomeone=false
      }

      //getting follower details
      for(let i=0;i<details.details.Followers.length;i++){
           this.api.getDetails(details.details.Followers[i].followId).subscribe((response:any)=>{
               console.log(response)  
               this.followingDetails.push(response.details)
               console.log(this.followingDetails)
           },(response:any)=>{
            //removing following person if the account was deleted
            this.api.unFollow(this.userId,details.details.Followers[i].followId).subscribe((response:any)=>{

            })
           })
      }
//getting details of followers
      for(let i=0;i<details.details.Following.length;i++){
        this.api.getDetails(details.details.Following[i].followerId).subscribe((response:any)=>{
            console.log(response)  
            this.followerDetails.push(response.details)
            console.log(this.followerDetails)
        },(response:any)=>{
          //removing the follower if account was deleted
          this.api.removePeopleWhoFollow(this.userId,details.details.Following[i].followerId).subscribe((response:any)=>{
            
          })
        })
   }
  
  
      if(details.details.profilepic.length>0){
          this.isPicPresent=false
          this.ifProfilePicExist=true
      }
    },(response:any)=>{
      //if no response page not found
      this.route.navigateByUrl('**')
    })
  }

  //function to upload profile pic
  profilePicUpload(event:any){
     if(event.target.files.length>0){
      const file=event.target.files[0]; //file in 0th position of files array
      const formData=new FormData //creating a new formdata
      formData.append('file',file) //append file in formdata
    
      console.log(file)
      //calling the function and passing formdata
      this.api.uploadProfilePic(formData,this.userId).subscribe((response:any)=>{
        console.log(response)
        if(response){
          this.getDetails()
        }
        
       })
       
     }else{
      alert('Please provide an input')
     }
     
  }

  //getting the details of posts in modal
  getPostDetails(path:any,filename:any){
    this.postPath=path
    this.postName=filename
    this.openModal=true
    this.api.getLikes(filename).subscribe((response:any)=>{
      // console.log(response)
       this.likesCount=response.response.likes.length
    })

  }

  //getting comments in modal
  getComments(filename:any){
      this.api.readComments(filename).subscribe((response:any)=>{
        
        this.comments=response.details
        this.commentCount=response.details.length
        if(this.comments.length==0){
          this.isCommentPresent=true
        }else{
          this.isCommentPresent=false
        }
       
//getting the comment details and the one who put the comments
        for(let i=0;i<response.details.length;i++){
          this.api.getDetails(response.details[i].from_id).subscribe((data:any)=>{
            console.log(data.details)
            //insewrting it to the comment object
            this.comments[i]['fromName']=data.details.Name
            this.comments[i]['profilepic']=data.details.profilepic[0].path
          })
        }
        //sorting according to the time and date
        this.comments=this.comments.sort((a:any, b:any) => (a.date > b.date ? -1 : 1));
        console.log(this.comments)
      })
  }

  //function for deleting a post
  deletePost(filename:any){
    this.api.deletePost(this.userId,filename).subscribe((response:any)=>{
      // this.route.navigateByUrl(`social/myprofile/${this.userId}`)
      console.log(response)
      this.openModal=false
      
      this.getDetails()
     
    })

  }
  //getting details for editing profile
  getDetailsForEditing(){
    this.isMainPage=false
    this.api.getDetails(this.userId).subscribe((response:any)=>{
      console.log(response)
      this.editingDetails=response.details
    })
  }

  //function for editing profile
  editProfile(){
    this.api.editProfile(this.userId,this.editingDetails).subscribe((response:any)=>{
      this.isMainPage=true
      this.getDetails()
    })
  }

  cancel(){
    this.isMainPage=true
  }

  logOut(){
    localStorage.clear()
    this.route.navigateByUrl('/social')
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

 //unfollow user
  unFollow(followId:any){
    this.api.unFollow(this.userId,followId).subscribe((response:any)=>{
      this.followingDetails=[]
      this.getDetails()
     
    })
  }

  //remove people who follow
  removePeopleWhoFollow(followId:any){
    this.api.removePeopleWhoFollow(this.userId,followId).subscribe((response:any)=>{
      this.followerDetails=[]
      this.getDetails()
    })
  }
}
