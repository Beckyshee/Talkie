import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  invalidDetails:string=''
  isRegistered:boolean=false

  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}

  registerForm=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]],
    pass2:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]]

  })
  registerUser() {
          console.log(this.registerForm.value);

    if(this.registerForm.valid){
      if(this.registerForm.value.password==this.registerForm.value.pass2){
         let name=this.registerForm.value.name
         let email=this.registerForm.value.email
         let password=this.registerForm.value.password

      this.api.registerUser(name,email,password).subscribe((response:any)=>{
         console.log(response)
         this.isRegistered=true

         setTimeout(() => {
          this.route.navigateByUrl('social/login')
          this.isRegistered=false

         }, 2000);


      },(response:any)=>{
        this.invalidDetails=response.error.message;
        setTimeout(() => {
          this.invalidDetails=''
          this.registerForm.reset()

         }, 2000);
      })

      }else{
        this.invalidDetails='Passwords are not same'
        setTimeout(() => {
          this.invalidDetails=''
          this.registerForm.reset()

        }, 2000);
      }
    }else{
      this.invalidDetails='Please provide valid details'
      setTimeout(() => {
        this.invalidDetails=''
        this.registerForm.reset()

      }, 2000);
    }


  }


}
