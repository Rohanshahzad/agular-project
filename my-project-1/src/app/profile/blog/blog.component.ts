import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { MessageService } from 'primeng/api';
import { enteretNameInfo } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [MessageService]
})
export class BlogComponent {
  base64Encoded: string = '';
  file: any
  enteredName : enteretNameInfo
  names: string | null

  constructor(private router: Router, private service: UserDataService, private toast: MessageService) {
    this.names = localStorage.getItem("user-data")
    this.enteredName = this.names ? JSON.parse(this.names) : null
  }
  blogs: any = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    date: new FormControl(new Date().toISOString()),
  });

  get title() {
    return this.blogs.get('title');
  }
  get description() {
    return this.blogs.get('description');
  }
  get image() {
    return this.blogs.get('image');
  }
  get category() {
    return this.blogs.get('category');
  }
  back() {
    this.router.navigate(["/home"])
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const formData: any = new FileReader();
      formData.onload = (e: any) => {
        this.base64Encoded = "data:image/png;base64," + e.target.result.split(',')[1];
      };
      formData.readAsDataURL(this.file);
    }
  }

  onUpload(data: any) {
    if (this.blogs.invalid) {
      Object.keys(this.blogs.controls).forEach((controlName: string) => {
        const control = this.blogs.get(controlName);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }
    if(this.enteredName) {
      const enteredEmail = this.enteredName.email.split('@')[0]
      const uploadData = { ...data, image: this.base64Encoded, author: this.enteredName.name, username: enteredEmail };
      this.service.upload(uploadData).subscribe(
        (event: any) => {
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 600);
          this.toast.add({ severity: 'success', summary: 'Blog Created!', detail: 'Enjoy!' });
        }
      );
    }
  }
}
