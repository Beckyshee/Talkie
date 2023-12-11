import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';

import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';

import { PostUploadComponent } from './post-upload/post-upload.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { OtherProfileComponent } from './other-profile/other-profile.component';
import { SearchPipe } from './pipes/search.pipe';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { LogOutComponent } from './log-out/log-out.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

// import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'; 

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    
    RightSideBarComponent,
   
    PostUploadComponent,
        MessagesComponent,
        ProfileComponent,
        OtherProfileComponent,
        SearchPipe,
      
        EditProfileComponent,
        DeleteAccountComponent,
        LogOutComponent,
        HeaderComponent,
        PageNotFoundComponent,
        ResetPasswordComponent,
       
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    // NgbAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
