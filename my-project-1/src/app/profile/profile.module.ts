import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileRoutingModule } from './profile-routing.module';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './login/login.component'
import { HttpClientModule } from "@angular/common/http"
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BlogComponent } from './blog/blog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './home-page/navbar/navbar.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { SidebarComponent } from './home-page/sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CardsComponent } from './home-page/cards/cards.component';
import { DetailsPageComponent } from './home-page/details-page/details-page.component';
import { UpdateBlogComponent } from './home-page/update-blog/update-blog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { blogReducers, userReducers } from './store/reducer';
import { EffectsComponent } from './effects/effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    BlogComponent,
    NavbarComponent,
    TruncatePipe,
    SidebarComponent,
    HomePageComponent,
    CardsComponent,
    DetailsPageComponent,
    UpdateBlogComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    MatProgressSpinnerModule,
    ToastModule,
    StoreModule.forRoot({users:blogReducers, usersdata:userReducers}),
    EffectsModule.forRoot([EffectsComponent]),
  ],
  exports: [
    LoginComponent,
    BlogComponent,
    NavbarComponent,
    SidebarComponent,
    HomePageComponent
  ],
})
export class ProfileModule { }
