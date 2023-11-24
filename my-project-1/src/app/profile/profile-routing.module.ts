import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SignupComponent } from './signup/signup.component';
// import { LoginComponent } from './login/login.component';
// import { userAuthGuard } from '../auth/user-auth.guard';
// import { BlogComponent } from './blog/blog.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
