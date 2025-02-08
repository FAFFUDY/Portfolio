import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
    this.scrollToSection('home');
    this.startInterval();
  }

  constructor() { }

  tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

   // Array of div content
   divs: string[] = ['WEB DEVELOPER', 'SOFTWARE DEVELOPER', 'ANGULAR DEVELOPER', 'SPRING BOOT DEVELOPER'];

   // Index of the currently displayed div
   currentIndex: number = 0;
 
   // Interval reference
   private intervalId: any;
 
   // Get the current div content
   get currentDiv(): string {
     return this.divs[this.currentIndex];
   }

   ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    this.clearInterval();
  }

  // Start the interval
  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.showNext();
    }, 2000); // Change div every 2 seconds
  }

  // Clear the interval
  clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Show the next div
  showNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.divs.length; // Loop back to the first div after the last one
  }


  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}
