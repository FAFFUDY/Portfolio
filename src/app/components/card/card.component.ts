import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = 'Card Title'; // Input for card title
  @Input() links: { text: string, url: string }[] = []; // Input for links
}