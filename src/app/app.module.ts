import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { PostsComponent } from './features/posts/posts.component';
import { AdminComponent, HomeComponent, NewsfeedComponent, ProfileComponent } from './pages';
import { LoginComponent, RegisterComponent } from './pages/auth';
import { SafehtmlPipe } from './pipes/safehtml.pipe';

@NgModule({
  declarations: [
    SafehtmlPipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PostsComponent, 
    AdminComponent, 
    LoginComponent, 
    RegisterComponent, 
    HomeComponent, 
    NewsfeedComponent, 
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
