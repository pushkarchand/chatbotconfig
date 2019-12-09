import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public currentPage:string='';
  constructor(private router:Router) { 
    this.router.events.subscribe((event)  => {
      if(event instanceof NavigationEnd) {
          this.currentPage =  event.url;
      }
    });
  }

  ngOnInit() {
  }

  public navigate(argPath:string){
    this.router.navigate([`/${argPath}`]);
  } 

}
