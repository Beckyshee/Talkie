import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  isLoggined:boolean=false
  isOtp:boolean=false
  isResetting:boolean=false
  notFoundMessage:string=''
  minutes:any
  seconds:any
  otpDetails:any
  email:any
  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}

  ResetForm=this.fb.group({
    Email:['',[Validators.required,Validators.email]]
  })
  OtpForm=this.fb.group({
    Otp:['']
  })
  ResetPassword=this.fb.group({
    pass1:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]],
    Password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]]

  })

  requestOtp(){
    if(this.ResetForm.valid){
      this.isOtp=true
    this.isResetting=false
   let Email=this.ResetForm.value.Email
   this.email=Email
   this.api.getOtp(Email).subscribe((response:any)=>{
   console.log(response)
      this.otpDetails=response.otp
   }) 
  

   

    }
    

  }
  EnterOtp(){
    if(this.OtpForm.valid){
      let otp=this.OtpForm.value.Otp
      if(otp==this.otpDetails){
        this.isOtp=false
        this.isResetting=true
      }
    }

  }

  resetPassword(){
    if(this.ResetPassword.valid){
      let pass1=this.ResetPassword.value.Password
      let  pass2=this.ResetPassword.value.pass1
      this.api.changePassword(this.email,pass1).subscribe((response:any)=>{
        alert('Successfullly resetted password')
        this.route.navigateByUrl('/')
        
      })
    }
  }
}
