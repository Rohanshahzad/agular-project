import { Injectable, HostListener } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {
//    inactivityTimer!: Observable<any>;
//  activitySubject = new Subject<void>();

//   constructor() {
//     this.setupInactivityTimer();
//     this.startInactivityDetection();
//   }

//   private setupInactivityTimer() {
//     this.inactivityTimer = timer(10000); // 10 seconds
//     this.inactivityTimer.subscribe(() => this.logout());
//   }

//   private startInactivityDetection() {
//     // Listen to user activity events
//     window.addEventListener('mousemove', this.onActivity.bind(this));
//     window.addEventListener('keydown', this.onActivity.bind(this));
//   }

//   private onActivity() {
//     // Reset the inactivity timer when there's user activity
//     this.activitySubject.next();
//   }

//   public resetTimer() {
//     // This function can be used to manually reset the timer from components.
//     this.activitySubject.next();
//   }

//   public getInactivityTimer(): Observable<any> {
//     return this.inactivityTimer;
//   }

//   private logout() {
//     console.log("msnms")
//     // Perform logout logic here, e.g., navigate to the logout page.
//     // You can also use an authentication service to handle the logout.
//   }
private userActivity: Subject<void> = new Subject<void>();
private inactivityTimer!: Subscription;
constructor() {
  this.setupUserActivityTracking();
  this.startInactivityTimer();
  this.inactivityTimer = new Subscription();
}
private setupUserActivityTracking() {
  // Listen to relevant user events (e.g., mousemove, keydown)
  window.addEventListener('mousemove', () => this.onUserActivity());
  window.addEventListener('keydown', () => this.onUserActivity());
}
private onUserActivity() {
  this.userActivity.next();
  this.restartInactivityTimer();
}
private restartInactivityTimer() {
  if (this.inactivityTimer) {
    this.inactivityTimer.unsubscribe();
  }
  // Set a timer for 10 seconds of inactivity
  this.inactivityTimer = timer(10000).subscribe(() => {
    // Perform logout action here (e.g., clear authentication, navigate to login page)
    // Example: this.authService.logout();
    console.log('expired')
  // localStorage.removeItem('token');
  });
}
private startInactivityTimer() {
  // Start the inactivity timer immediately upon service initialization
  this.restartInactivityTimer();
}
// Expose an observable to detect user activity
getUserActivity(): Observable<void> {
  return this.userActivity.asObservable();
}
}

  

