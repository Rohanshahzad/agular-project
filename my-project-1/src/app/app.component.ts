import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
// import { LoaderServiceService } from './services/loader-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:any='jj'

  constructor() {
    // this.loaderService.getUserActivity().subscribe((res:any)=>{   
    // })
   }



}

