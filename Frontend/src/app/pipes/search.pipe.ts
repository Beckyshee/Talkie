import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Followers:any[],searchTerm:any,propName:any): any[] {

    const result:any[]=[]
    if(!Followers||searchTerm==''||propName==''){
      return Followers
    }else{
      Followers.forEach((details:any)=>{
        if(details[propName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
             result.push(details)
        }
      });
      return result;
    }

  
  }

}
