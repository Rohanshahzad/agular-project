import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})

export class LoginComponent {
  isLoginPage: boolean = false
  localStorageKey: string = 'user-data'
  showPassword: boolean = false;
  constructor(private userData: UserDataService, private router: Router, private toast: MessageService) {
    localStorage.removeItem(this.localStorageKey)
    this.isLoginPage = true
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  loginForm: any = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginUser(data: any) {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((controlName: string) => {
        const control = this.loginForm.get(controlName);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }
    this.userData.getUsers().subscribe(usersData => {
      const enteredEmail = data.email;
      const enteredPassword = data.password;
      const usersArray = Object.values(usersData);
      const matchedUser = usersArray.find((user: any) => user.email === enteredEmail && user.password === enteredPassword);
      if (matchedUser) {
        usersArray.find((user: any) => {
          if (user.name) {
            if (user.email === enteredEmail && user.password === enteredPassword) {
              const enteredName = user.name
              localStorage.setItem(this.localStorageKey, JSON.stringify({ name: enteredName, email: enteredEmail }));
            }
          }
        })
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 600);
        this.toast.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome!' });
      } else {
        alert("User Invalid")
      }
    })
    }
  }



