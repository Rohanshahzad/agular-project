import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent {
  showPassword: boolean = false;
  localStorageKey: string = 'user-data'
  constructor(private userData: UserDataService, private router: Router, private toast: MessageService) { }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  signupForm: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+$')]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  get name() {
    return this.signupForm.get('name')
  }
  get email() {
    return this.signupForm.get('email')
  }
  get password() {
    return this.signupForm.get('password')
  }

  postData(data: any) {
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach((controlName: string) => {
        const control = this.signupForm.get(controlName);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }
    this.userData.getUsers().subscribe((result) => {
      if(result){
      const enteredName = data.name;
      const enteredEmail = data.email;
      const usersArray = Object.values(result);
      const matchedUser = usersArray.find((user: any) => user.email == enteredEmail);
      if (!matchedUser) {
        this.userData.saveUsers(data).subscribe((result) => {
          localStorage.setItem(this.localStorageKey, JSON.stringify({ name: enteredName, email: enteredEmail }));
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 600);
          this.toast.add({ severity: 'success', summary: 'Signup Successful', detail: 'Enjoy!' });
        })
      } else {
        this.toast.add({ severity: 'error', summary: 'Email already exists!', detail: 'Sorry' });
      }
    }
    });
  }
}

