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
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
  })

  //login code

  login(){
console.log(this.loginForm.value);

    if(this.loginForm.valid){
      let email=this.loginForm.value.email
      let password=this.loginForm.value.password
      console.log(email)

      this.api.login(email,password).subscribe((response:any)=>{

        console.log(response)
        // window.localStorage.setItem('InstaFlixId',response.InstaFlixId)
        window.localStorage.setItem('token', response.token)
           window.localStorage.setItem('userID', response.UserID)
        this.isLoggined=true
        setTimeout(() => {
          this.route.navigateByUrl(`social/home`)
        },2000);
      }, (error: any) => {
        console.log(error);

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
