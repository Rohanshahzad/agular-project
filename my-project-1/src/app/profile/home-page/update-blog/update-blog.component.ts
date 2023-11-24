import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogsApiService } from 'src/app/services/blogs-api.service';
import { MessageService } from 'primeng/api';
import { arrayCards } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css'],
  providers: [MessageService]
})
export class UpdateBlogComponent implements OnInit {
  prevTitle: string = ''
  prevDescription: string = ''
  prevCategory: string = ''
  prevImage: string = ''
  file: any
  base64Encoded : string =''
  id: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private blogsService: BlogsApiService, private toaster: MessageService) { }
  @Output() public dateEvent = new EventEmitter()
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id']
    })
    if (this.id) {
      this.blogsService.getBlogs().subscribe((blogs: arrayCards[]) => {
        const singleBlog = Object.values(blogs)
        singleBlog.filter((blog: arrayCards) => {
          if (this.id == blog.id) {
            this.prevTitle = blog.title
            this.prevDescription = blog.description
            this.prevCategory = blog.category
            this.prevImage = blog.image
            this.blogs.patchValue({
              title: this.prevTitle,
              description: this.prevDescription,
              category: this.prevCategory,
            });
          }
        })
      })
    }
  }
  blogs: any = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl(this.prevImage),
    newdate: new FormControl(new Date().toISOString()),
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
  onChange(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      const formData = new FileReader();

      formData.onload = (e: any) => {
        this.base64Encoded = "data:image/png;base64," + e.target.result.split(',')[1];
        this.prevImage=this.base64Encoded
      };

      formData.readAsDataURL(this.file);
    }
  }
  updateBlog(blogs: any) {
    if (this.blogs.invalid) {
      Object.keys(this.blogs.controls).forEach((controlName: string) => {
        const control = this.blogs.get(controlName);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }
    const uploadData = { ...blogs, image: this.prevImage };
    this.blogsService.patch(this.id, uploadData).subscribe((result) => {
      this.toaster.add({ severity: 'success', summary: 'Blog Updated!', detail: 'Enjoy!' });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 600);
    })
  }
  back() {
    this.router.navigate(["/home"])
  }
}
