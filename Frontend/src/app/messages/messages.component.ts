import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  userId:string=''
  followHeads:any[]=[]
  searchTerm:string=''
  chatPerson:any={}
  isStarting:boolean=true
  chatHeads:any[]=[]
  finalChatHead:any={}
  isChatSidePresent:boolean=false
  individualChatDetails:any={}
  message:String=''
  YourMessages:any={}
  theirMessages:any={}
  user_id:String=''
  finalMessage:any[]=[]
  isMessagePresent:boolean=false
  profilepic:String=''
  isSettingsShown:Boolean=false

  //last message posrtion
  final:any[]=[]
  

  //individual data into a variable
  individualChatHead:any[]=[]
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService,private route:Router){}
  ngOnInit(): void {

    //code for reloading the the same page
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;


  this.activatedRoute.params.subscribe((response:any)=>{
      this.userId=response.InstaId
  })
  //getting your details
  this.getUserDetails()

  //getting all the chat heads
  this.getAllChatHeads()

  //disable sent btn
  if(this.message!=''){
    this.isMessagePresent=true
  }

 
  
  }

  getAllChatHeads(){
    //getting chat details
  this.api.getDetails(this.userId).subscribe((response:any)=>{
    // console.log(response.details.outgoing)
    this.user_id=response.details._id

    //pushing datas into a variable
    this.chatHeads.push(response.details.outgoing)
   
    this.chatHeads.push(response.details.incomming)

    console.log(this.chatHeads.flat())
    this.finalChatHead=this.chatHeads.flat()

    //getting data of each individual
    for(let i=0;i<this.finalChatHead.length;i++){
      this.api.getDetails(this.finalChatHead[i]).subscribe((response:any)=>{
        console.log(response.details)
        this.individualChatHead.push(response.details)
      },(response:any)=>{
        const deletedUser={
          _id:this.finalChatHead[i],
          profilepic:[{path:"images/file_1695290185515.jpg"}],
          Name:'Shots User'
        }
        this.individualChatHead.push(deletedUser)
      })
    }

  },(response:any)=>{
    //if no response page not found
    this.route.navigateByUrl('**')
  })
  }


  getUserDetails(){
    this.api.getDetails(this.userId).subscribe((response:any)=>{
      console.log(response.details.Followers)
      this.profilepic=response.details.profilepic[0].path
      for(let i=0;i<response.details.Followers.length;i++){
        console.log(response.details.Followers[i].followId)
        this.api.getDetails(response.details.Followers[i].followId).subscribe((data:any)=>{
          
          this.followHeads.push(data.details)
          console.log(this.followHeads)
        })
      }
    })
  }

  startMessage(person2:String){
     this.api.startMessage(this.userId,person2).subscribe((response:any)=>{
     this.route.navigateByUrl(`social/messages/${this.userId}`)
     
      this.isStarting=true
      
      this.findChats(person2)
     
      
     },(response:any)=>{
      this.route.navigateByUrl(`social/messages/${this.userId}`)
      this.isStarting=true
    
      this.findChats(person2)
     })
  }

  //find the chats
  findChats(person2:String){
     this.api.findChats(this.userId,person2).subscribe((response:any)=>{
      console.log(response.details)
        if(this.userId==response.details.person1){
          this.api.outGoing(response.details.person1,person2).subscribe((response:any)=>{
            console.log(response)
            this.route.navigateByUrl(`social/messages/${this.userId}`)
          })
          this.api.inComming(response.details.person1,person2).subscribe((response:any)=>{
            console.log(response)
            this.route.navigateByUrl(`social/messages/${this.userId}`)
          })
        }
      
     },(response:any)=>{
       
     })
  }

  //boolean value changing function
  addPeople(){
    this.isStarting=!this.isStarting
  }

  //starting chat screen
  startChat(chatId:any){
    this.isChatSidePresent=true
    this.api.getDetails(chatId).subscribe((response:any)=>{
      console.log(response.details)
      this.individualChatDetails=response.details
      
    },(response:any)=>{
      const deletedUser={
        _id:chatId,
        profilepic:[{path:"images/file_1695290185515.jpg"}],
        Name:'Shots User'
      }
      this.individualChatDetails=deletedUser
    })

  }


  //start sending messages
  sendMessage(recepientId:any){

    if(this.message==''){
        
    }else{
      this.api.findChats(this.userId,recepientId).subscribe((response:any)=>{
        console.log(response.details)
        if(response.details==null){
          this.api.findChats(recepientId,this.userId).subscribe((response:any)=>{
            this.api.messagePerson2(recepientId,this.userId,this.message,this.user_id).subscribe((response:any)=>{
              console.log(response)
              this.getMessages(recepientId)
              this.message=''
              
            })
          })
        }else{
          if(this.userId==response.details.person1){
            this.api.messagePerson1(this.userId,recepientId,this.message,this.user_id).subscribe((response:any)=>{
              console.log(response)
              this.getMessages(recepientId)
              this.message=''
            })
          }

        }
        
        
      })
    }
    
     

    
    }

    
      //get all the messages from the server
      getMessages(recepientId:any){
        this.finalMessage=[]
        this.api.findChats(this.userId,recepientId).subscribe((response:any)=>{
          
          if(response.details==null){
            this.api.findChats(recepientId,this.userId).subscribe((response:any)=>{
              
                 this.YourMessages=response.details.fromPerson2
                 console.log(this.YourMessages.length)
                 this.theirMessages=response.details.fromPerson1
                 console.log(this.theirMessages.length)
                 this.finalMessage.push(this.YourMessages)
                 this.finalMessage.push(this.theirMessages)
                 
                 this.final=this.finalMessage.flat().reverse()

                 for(let i=0;i<this.final.length;i++){
                  if(this.final[i].messageId==this.userId){
                    this.final[i]['fromWho']="You"
                    
                  }else{
                    this.final[i]['fromWho']=this.individualChatDetails.Name
                  }
                 }
                 console.log(this.final)
                 this.final=this.final.sort((a,b)=>(a.date-b.date))
                 this.final=this.final.sort((a:any, b:any) => (a.date > b.date ? 1 : -1));
                
              
            })
          }else{
           
            this.YourMessages=response.details.fromPerson1
            console.log(this.YourMessages.length)
            this.theirMessages=response.details.fromPerson2
            console.log(this.theirMessages.length)  

            this.finalMessage.push(this.YourMessages)
            this.finalMessage.push(this.theirMessages)
            

            this.final=this.finalMessage.flat().reverse()

            for(let i=0;i<this.final.length;i++){
             if(this.final[i].messageId==this.userId){
            
              this.final[i]['fromWho']='you'
             }else{
              this.final[i]['fromWho']=this.individualChatDetails.Name
             }
            }
            console.log(this.final)
            this.final=this.final.sort((a,b)=>(a.date-b.date))
            this.final=this.final.sort((a:any, b:any) => (a.date > b.date ? 1 : -1));
           
          }
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


