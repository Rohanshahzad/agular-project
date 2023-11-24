import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsApiService } from 'src/app/services/blogs-api.service';
import { arrayCards } from 'src/app/interfaces/interface';
import { Store } from '@ngrx/store';
import { loadItem } from '../../store/actions';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  card : arrayCards[]=[]
  id: number = 0
  constructor(public blogsService: BlogsApiService, private router: Router, private route: ActivatedRoute, private store: Store<{users:{users:any}}>) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id']
    })
    if (this.id) {
      this.blogsService.showLoader()
      this.store.dispatch(loadItem())
    this.store.select(state => state.users?.users).subscribe((blogs: arrayCards[])=>{
        blogs.filter((blog) => {
          setTimeout(() => {
            if (this.id == blog.id) {
              this.card.push(blog)
              console.log(this.card)
              this.blogsService.hideLoader()
            }
          }, 1000)
        })
      })
    }
  }

  back() {
    this.router.navigate(["/home"])
  }
}


