import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor (
    @Inject('BaseURL') public baseURL: any) {}

  ngOnInit() {}

}
