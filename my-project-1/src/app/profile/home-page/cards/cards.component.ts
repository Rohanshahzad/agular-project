import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BlogsApiService } from 'src/app/services/blogs-api.service';
import { MessageService } from 'primeng/api';
import { enteretNameInfo, arrayCards } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [MessageService]
})
export class CardsComponent implements OnInit {
  @Input() myArray: arrayCards[] = []
  @Input() searchData: string = ''
  @Output() public childEvent = new EventEmitter()
  @Output() public updateEvent = new EventEmitter()

  names: string | null = ''
  enteredName: enteretNameInfo | undefined
  data: string = ''
  splitEmail: string | null = ''
  constructor(private blog_service: BlogsApiService, private toast: MessageService) {
  }

  ngOnInit() {

    this.names = localStorage.getItem("user-data")
    this.enteredName = this.names ? JSON.parse(this.names) : null
    if (this.enteredName) {
      this.data = this.enteredName.email
      this.splitEmail = this.data.split('@')[0]
    }
  }
  delete(id: number, event: Event) {
    event.stopPropagation();
    const confirmed: any = confirm('Do you want to delete this blog?')
    if (confirmed) {
      this.childEvent.emit(id)
      this.blog_service.delete(id).subscribe((result) => {
        this.myArray = this.myArray.filter((blog: any) => blog.id !== id);
        this.toast.add({ severity: 'info', summary: 'Blog Deleted' });
      })
    }
  }
  update(id: Number) {
    this.updateEvent.emit(id)
  }
}