import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  isDeletionStarted:boolean=false 
  isDeleted:boolean=false
  userId:String='' //variable for holding user id

  constructor(private api:ApiService,private activatedRoute:ActivatedRoute,private fb:FormBuilder,private route:Router){}


//code for deleting the account
  deleteAccount(){
    this.activatedRoute.params.subscribe((response:any)=>{
      this.userId=response.InstaId
    })
     
    
        this.api.deleteAccount(this.userId).subscribe((response:any)=>{
          console.log(response)
          this.isDeletionStarted=true

          setTimeout(() => {
            this.isDeletionStarted=false
            this.route.navigateByUrl('/')
            
          }, 3000);
      

        })
      
  }

  //cancelling the deletion of accont

  cancelAccountDeletion(){
    this.activatedRoute.params.subscribe((response:any)=>{
          this.userId=response.InstaId
    })

    this.route.navigateByUrl(`/social/home/${this.userId}`)
  }

}
