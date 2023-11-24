import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsApiService } from 'src/app/services/blogs-api.service';
import { arrayCards } from 'src/app/interfaces/interface';
import { Store } from '@ngrx/store';
import { loadItem } from '../store/actions';
// import { LoaderServiceService } from 'src/app/services/loader-service.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  sortedAsc: arrayCards[] = []
  array: arrayCards[] = []
  array2: arrayCards[] = []
  msg: string | boolean = ''
  searchData: string = ''
  arrayid: number = 0
  noMatch: boolean = false

  constructor(public blog_service: BlogsApiService, private store: Store<{users:{users:any}}>) {}
  getData(data: string) {
    this.msg = data
    this.array2 = []
    this.sortedAsc = []
    this.getBlogs()
  }
  getSearchData(data: string) {
    this.searchData = data
    this.array2 = []
    this.sortedAsc = []
    this.getBlogs()
  }
  ngOnInit() {
    this.store.dispatch(loadItem())
    this.store.select(state => state.users?.users).subscribe((blogsData: arrayCards[])=>{
      if(blogsData){
        this.array = blogsData
        this.getBlogs()
      }
    })
  }

  delete(id: number) {
    if (id) {
      this.arrayid = id
      this.array = this.array.filter((blog: arrayCards) => blog.id !== id);
    }
  }

  getBlogs() {
    this.noMatch = false
    this.blog_service.showLoader()

    setTimeout(() => {
      if (this.msg == "home") {
        this.msg = !this.msg;
      }

      if (!this.searchData) {
        this.array2 = this.array.filter((blogs: arrayCards) =>
          blogs.category == this.msg || this.msg == "home" || !this.msg
        );
        this.sortedAsc = this.array2.sort(
          (objA, objB) => {
            return String(objB.date).localeCompare(String((objA.date)))
          }
        );
      } else {
        this.array2 = this.array.filter((blogs: arrayCards) =>
          blogs.title.toLowerCase().includes(this.searchData.trim()) &&
          (blogs.category == this.msg || blogs.category == "home" || !this.msg)
        );
        this.sortedAsc = this.array2.sort(
          (objA, objB) => {
            return String(objB.date).localeCompare(String((objA.date)))
          }
        );
        if (this.sortedAsc.length == 0) {
          this.noMatch = true
        }
      }
      this.blog_service.hideLoader()
    }, 1000);
  }
}