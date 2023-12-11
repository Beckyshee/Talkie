import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PostUploadComponent } from './post-upload/post-upload.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { OtherProfileComponent } from './other-profile/other-profile.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { LogOutComponent } from './log-out/log-out.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'',redirectTo:'social',pathMatch:'full'
  },
  {
    path:'social',component:StartPageComponent
  },
  {
    path:'social/login',component:LoginComponent
  },
  {
    path:'social/register',component:RegisterComponent
  },
  {
    path:'social/home',component:HomeComponent
  },
  {
    path:'social/uploadpost',component:PostUploadComponent
  },
  {
    path:'social/messages',component:MessagesComponent
  },
  {
    path:'social/myprofile',component:ProfileComponent
  },
  {
    path:'social/profile',component:OtherProfileComponent
  },

  {
    path:'social/editprofile',component:EditProfileComponent
  },
  {
    path:'social/deleteprofile',component:DeleteAccountComponent
  },
  {
    path:'social/logout',component: LogOutComponent
  },{
    path:'social/search',component:RightSideBarComponent
  },
  {
    path:'social/resetpassword',component:ResetPasswordComponent
  },
  {
    path:'**',component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
