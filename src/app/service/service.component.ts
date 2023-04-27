import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

constructor (@Inject('BaseURL') public baseURL: any) {}

}
