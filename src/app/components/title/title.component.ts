import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent implements OnInit {
  @Input() title: string = '';

  constructor() {
    
  }

  ngOnInit() {
  }

}
