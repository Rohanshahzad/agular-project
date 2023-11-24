import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
})
export class NavbarComponent {
  @Output() public childEvent = new EventEmitter()
  constructor(private router: Router, private toast: MessageService) {
  }

  handleNavigation(category: string) {
    this.childEvent.emit(category);
  }

  logout() {
    const confirmation = confirm('Do you want to Log out?')
    if (confirmation) {
      localStorage.removeItem('user-data')
      localStorage.removeItem('blogs-data')
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 600);
      this.toast.add({ severity: 'info', summary: 'Logging Out', detail: 'GoodBye!' });
    }
  }
  createBlog() {
    this.router.navigate(['/createBlog'])
  }
}
