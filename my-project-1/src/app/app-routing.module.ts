import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './profile/signup/signup.component';
import { LoginComponent } from './profile/login/login.component';
import { BlogComponent } from './profile/blog/blog.component';
import { userAuthGuard } from './auth/user-auth.guard';
import { HomePageComponent } from './profile/home-page/home-page.component';
import { DetailsPageComponent } from './profile/home-page/details-page/details-page.component';
import { UpdateBlogComponent } from './profile/home-page/update-blog/update-blog.component';
import { loginguardGuard } from './auth/loginguard.guard';

const routes: Routes = [
  { path: "signup", component: SignupComponent, canActivate: [loginguardGuard]},
  { path: "login", component: LoginComponent, canActivate: [loginguardGuard] },
  { path: "", component: LoginComponent, canActivate: [loginguardGuard]  },
  { path: "blogDetails/:id", component: DetailsPageComponent, canActivate: [userAuthGuard] },
  { path: "createBlog", component: BlogComponent, canActivate: [userAuthGuard] },
  { path: "home", component: HomePageComponent, canActivate: [userAuthGuard] },
  { path: "updateBlog/:id", component: UpdateBlogComponent, canActivate: [userAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
