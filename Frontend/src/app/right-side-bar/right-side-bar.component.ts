import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css']
})
export class RightSideBarComponent implements OnInit{

  userDetails:any={} //for storing details of all individual
  userId:String=''
  isFollowed:boolean=false
  suggestionDetails:any={}
  postDetails:any={}
  searchTerm:String=''

  //post array for setting

  constructor(private api:ApiService,private activatedroute:ActivatedRoute){}
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((response:any)=>{
      console.log(response.Details)
      this.userDetails=response.Details
      if(this.userDetails.length>4){
        const sidebar:any=document.getElementById('side-id')
        sidebar.style.overflowY='scroll'
      }
    })
    this.activatedroute.params.subscribe((response:any)=>{
      this.userId=response.InstaId
    })
  }
  //viewing the profile of all users
  viewSuggestion(suggestionId:String){
    this.api.viewSuggestion(suggestionId).subscribe((response:any)=>{
      console.log(response.details.Name)
      this.suggestionDetails=response.details
      this.postDetails=response.details.posts
      console.log(this.postDetails)

      
    
    })
  }

 }
