import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  notFoundMessage:String=''
  isLoggined:boolean=false

  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}

  //form group for validation
  loginForm=this.fb.group({
    Email:['',[Validators.required,Validators.email]],
    Password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]],
  })

  //login code
 
  login(){
    
    if(this.loginForm.valid){
      let Email=this.loginForm.value.Email
      let Password=this.loginForm.value.Password
      console.log(Email)
      
      this.api.login(Email,Password).subscribe((response:any)=>{
        
        console.log(response)
        window.localStorage.setItem('InstaFlixId',response.InstaFlixId)
        window.localStorage.setItem('token',response.token)
        this.isLoggined=true
        setTimeout(() => {
          this.route.navigateByUrl(`social/home/${response.InstaFlixId}`)
        },2000);
      },(response:any)=>{
        this.notFoundMessage="Can't login incorrect Email or Password"
        setTimeout(() => {
          this.loginForm.reset()
          this.notFoundMessage=''
          
        }, 2000);
      })
      


    }else{
      this.notFoundMessage='Invalid Details'
      setTimeout(() => {
        this.loginForm.reset()
        this.notFoundMessage=''
        
      }, 2000);
       

      
      
    }
  }


}
