import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
    this.scrollToSection('');
    this.startInterval();
    const sections = ['home', 'about', 'services', 'contact'];
    window.addEventListener('scroll', this.onScroll.bind(this));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeTab = entry.target.id;
          }
        });
      },
      { threshold: 0.3 } // Trigger when 50% of the element is visible
    );

    // Observe each section
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });
  }
  constructor() { }

  tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];
  activeTab = 'home';

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
    // this.activeTab = sectionId;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  onScroll() {
    const sections = ['home', 'about', 'services', 'contact'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && this.isElementInViewport(element)) {
        this.activeTab = section;
        break;
      }
    }
  }

  isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
}
