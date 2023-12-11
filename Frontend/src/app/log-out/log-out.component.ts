import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit{

  
  constructor(private route:Router){}
  ngOnInit(): void {
    this.logOut()
    
 
   
  }

  logOut(){
    localStorage.clear()

    setTimeout(() => {
      this.route.navigateByUrl('/social')
    }, 2500);
  }

}
