import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

 

  //register api call

  registerUser(Name:any,Email:any,Password:any){
     
    const body={
      Name,
      Email,
      Password
    }
    return this.http.post('http://localhost:5000/social/register',body)
  }
  //login api call
  login(Email:any,Password:any){
    const body={
      Email,Password
    }
    return this.http.post('http://localhost:5000/social/login',body)
  }

   //appending the token
   appendToken(){
    let token=localStorage.getItem('token')
   
    let headers=new HttpHeaders()

    if(token){
      headers=headers.append("shots-token",token)
      options.headers=headers
      
    }
    return options
  }



  getDetails(InstaId:any){
    return this.http.get(`http://localhost:5000/social/getdetails/${InstaId}`,this.appendToken())
  }
  getAllUsers(){
    return this.http.get('http://localhost:5000/social/getallusers',this.appendToken())
  }
  viewSuggestion(suggestionId:any){
    return this.http.get(`http://localhost:5000/social/viewSuggestion/${suggestionId}`,this.appendToken())
  }
  

 
  followUser(personalId:any,followId:any){
    const body={
      followId
    }
    return this.http.post('http://localhost:5000/social/updatefollower/'+personalId,body,this.appendToken())
  }
  addComments(filename:any,from_id:any,to_id:any,comment:any){
    const body={
      filename,from_id,to_id,comment
    }
    console.log(body)
    return this.http.post('http://localhost:5000/social/uploadcomment',body,this.appendToken())
  }

  readComments(filename:any){
    
    return this.http.get(`http://localhost:5000/social/readcomments/${filename}`,this.appendToken())
  }

  unFollow(userId:any,followId:any){
    const body={
      followId
    }
    return this.http.put('http://localhost:5000/social/unfollow/'+userId,body,this.appendToken())
  }

  //starting a message inbox
  startMessage(person1:any,person2:any){

    const body={
      person1,person2
    }
    return this.http.post('http://localhost:5000/social/startinbox',body,this.appendToken())
  }

  //starting outgoing message
  outGoing(person1:any,person2:any){
    const body={
      person2
    }
    return this.http.post('http://localhost:5000/social/outgoing/'+person1,body,this.appendToken())
  }

  //first incoming message
  inComming(person1:any,person2:any){
    const body={
      person1
    }
    return this.http.post('http://localhost:5000/social/incomming/'+person2,body,this.appendToken())
  }

  //finding chats inside messages collection
  findChats(person1:any,person2:any){
    return this.http.get(`http://localhost:5000/social/findchat/${person1}/${person2}`,this.appendToken())
  }

  //sending messages
  messagePerson1(person1:any,person2:any,message:any,user_id:any){
    
    const body={
      message,user_id
    }
    return this.http.post(`http://localhost:5000/social/messagefromperson1/${person1}/${person2}`,body,this.appendToken())

  }

  messagePerson2(person1:any,person2:any,message:any,user_id:any){
    
    const body={
      message,user_id
    }
    return this.http.post(`http://localhost:5000/social/messagefromperson2/${person1}/${person2}`,body,this.appendToken())

  }

  //adding likes
  likes(filename:any,likeId:any){
    const body={
      likeId
    }
    return this.http.post(`http://localhost:5000/social/addlikes/${filename}`,body,this.appendToken())
  }

  //getting likes
  getLikes(filename:any){
    return this.http.get(`http://localhost:5000/social/getlikes/${filename}`,this.appendToken())
  }

 

  //api call for deleting post
  deletePost(userId:any,filename:any){
    const body={
       filename
    }
    return this.http.put(`http://localhost:5000/social/deletepost/${userId}`,body,this.appendToken())
  }

  //editing the profile
  editProfile(userId:any,editingDetails:any){
    const body={
      editingDetails
    }
    return this.http.post(`http://localhost:5000/social/updateprofile/${userId}`,body,this.appendToken())
  }

  //changePassword
  
  //change password from profile
  changePasswordFromProfile(userId:any,Password:any){
    const body={
      Password
    }
    return this.http.post(`http://localhost:5000/social/changepasswordfromprofile/${userId}`,body,this.appendToken())

  }

  //delete account from server
  deleteAccount(userId:any){
    
    
    return this.http.delete(`http://localhost:5000/social/deleteaccount/${userId}`,this.appendToken())

  }

  //upload post to nodejs server
  uploadPost(formData:any,userId:any){
    return this.http.post(`http://localhost:5000/social/uploadFile/${userId}`,formData,this.appendToken())
  }

  //uploading profile picture
  uploadProfilePic(formData:any,userId:any){
    return  this.http.post('http://localhost:5000/social/profilepic/'+userId,formData,this.appendToken())
  }

  //reemove peoplewhofollow
  removePeopleWhoFollow(_id:any,followId:any){
    const body={
      _id,followId
    }
    return this.http.put('http://localhost:5000/social/removepeoplewhofollow',body,this.appendToken())
  }

  //like adding to manipulate dom
  individualLikes(filename:any,likeId:any){
    const body={
      filename,likeId
    }
    return this.http.post('http://localhost:5000/social/addindividuallikes',body,this.appendToken())
  }

  //getting the individual likes
  getIndividualLikes(likeId:any){
 
    return this.http.get(`http://localhost:5000/social/individual/${likeId}`,this.appendToken())
  }

  //change oassword
  getOtp(Email:any){
    const body={
      Email
    }
    return this.http.post('http://localhost:5000/social/changepass',body)
  }

  changePassword(Email:any,Password:any){
    const body={
      Email,Password
    }
    return this.http.post('http://localhost:5000/social/changepass2',body)
  }

}

