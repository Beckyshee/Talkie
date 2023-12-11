import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  userId:String=''
  profilepic:String=''
  isSettingsShown:boolean=true
  profileDetails:any={} //profiledetails for holding the ngModel values
  isPassword:boolean=false
  isSuccessful:boolean=false
  notSame:boolean=false

  constructor(private http: HttpClient,private api:ApiService,private activatedRoute:ActivatedRoute,
    private route:Router,private fb:FormBuilder) {}


    // the form group to check validation of the password
    resetPassword=this.fb.group({
      Password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]],
      Pass1:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]],

    })
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response:any)=>{
      this.userId=response.InstaId
   })
   this.api.getDetails(this.userId).subscribe((response:any)=>{
     this.profilepic=response.details.profilepic[0].path
     this.profileDetails=response.details
   },(response:any)=>{
    this.route.navigateByUrl('**')
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

  //for editing the details

  editDetails(){
    this.api.editProfile(this.userId,this.profileDetails).subscribe((response:any)=>{
       this.isSuccessful=true
       setTimeout(() => {
        this.route.navigateByUrl(`/social/myprofile/${this.userId}`)
        this.isSuccessful=false
       }, 2000);
    })
  }
  toPassword(){
    this.isPassword=true
  }

  //for editing the password
  changePassword(){
    if(this.resetPassword.valid){
      let Password=this.resetPassword.value.Password
      let Pass1=this.resetPassword.value.Pass1
      if(Pass1==Password){
        this.api.changePasswordFromProfile(this.userId,Password).subscribe((response:any)=>{
          this.isSuccessful=true
          setTimeout(() => {
            this.route.navigateByUrl(`/social/myprofile/${this.userId}`)
            this.isSuccessful=false
           }, 2000);
        })
      }else{
        this.notSame=true
        setTimeout(() => {
          this.notSame=false
          this.resetPassword.reset()
        }, 2000);
      }

    }
  }

  cancelEditing(){
    this.route.navigateByUrl(`/social/myprofile/${this.userId}`)
  }

}
