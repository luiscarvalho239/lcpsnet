import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'lcpsnet';
  isHome: boolean;
  url: string;

  constructor(private router: Router, private location: Location) {
    
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe((r: any) => {
      this.url = this.location.path();
      this.isHome = (this.url == '' || this.url == '/home' || this.url == '/login' || this.url == '/register') ? true : false;
    });
  }

  ngOnDestroy() {
    
  }
}
