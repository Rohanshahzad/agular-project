import { Component, Output, EventEmitter, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsApiService } from 'src/app/services/blogs-api.service';
import { arrayCards } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSports: boolean = false
  isEntertainment: boolean = false
  isNews: boolean = false
  isFashion: boolean = false
  isEconomy: boolean = false

  @Input() myArray: arrayCards[] = [{
    author: '',
    category: '',
    date: '',
    description: '',
    id: 0,
    image: '',
    newdate: '',
    title: '',
    username: ''
  }]
  @Output() public childsEvent = new EventEmitter()
  @Output() public searchEvent = new EventEmitter()
  sportsCount: number = 0
  entertainmentCount: number = 0
  newsCount: number = 0
  fashionCount: number = 0
  economyCount: number = 0
  constructor() {}

  handleNavigation(category: string) {
    this.childsEvent.emit(category);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['myArray']) {
      this.updateCount()
    }
  }
  ngOnInit(): void {
    this.updateCount()
  }

  updateCount() {
    if (!this.myArray || this.myArray.length == 0) {
      return;
    }
    this.sportsCount = 0
    this.entertainmentCount = 0
    this.newsCount = 0
    this.fashionCount = 0
    this.economyCount = 0
    this.myArray.filter((subBlog: any) => {
      if (subBlog.category == 'news') {
        this.newsCount++
      } if (subBlog.category == 'sports') {
        this.sportsCount++
      } if (subBlog.category == 'entertainment') {
        this.entertainmentCount++
      } if (subBlog.category == 'fashion') {
        this.fashionCount++
      } if (subBlog.category == 'economy') {
        this.economyCount++
      }
    })
  }

  searchBar(data: any) {
    this.searchEvent.emit(data)
  }
}


