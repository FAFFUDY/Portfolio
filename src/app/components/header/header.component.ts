import { Component, HostListener, Input, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollToSection('home');
      this.startInterval();
      const sections = ['home', 'about', 'career', 'project'];
      window.addEventListener('scroll', this.onScroll.bind(this));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              // entry.target.classList.add('tab-show');
              this.activeTab = entry.target.id;
            }else{
              entry.target.classList.remove('glow');
              // entry.target.classList.add('tab-show');
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% of the element is visible
      );
    
      const hiddenSections = document.querySelectorAll('.hidden');
      hiddenSections.forEach((el) => observer.observe(el));

      // const glow = document.querySelectorAll('.tab-hidden');
      // hiddenSections.forEach((el) => observer.observe(el));

      // Observe each section
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.observe(element);
        }
      });
    }
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'career', label: 'Career' },
    { id: 'project', label: 'Project' },
    // { id: 'contact', label: 'Contact' }
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


  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }


  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const sections = ['home', 'about', 'career', 'project'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && this.isElementInViewport(element)) {
          this.activeTab = section;
          break;
        }
      }
    }
  }

  isElementInViewport(el: HTMLElement): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
  
      // Check if the element is at the center point
      const elementAtCenter = document.elementFromPoint(centerX, centerY);
      return elementAtCenter === el || el.contains(elementAtCenter);
    }
    return false;
  }

  downloadMyFile() {
    if (isPlatformBrowser(this.platformId)) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', '/assets/Ankush_Sonar.pdf');
      link.setAttribute('download', `Ankush_Sonar.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  goToWebsite(String: any) {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = 'https://www.linkedin.com/in/ankush-sonar-15b4ba205/';
    }
  }



  // observeHiddenSections(): void {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {  
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('active');
  //       } else {
  //         entry.target.classList.remove('remove');
  //       }
  //     });
  //   });

  //   const hiddenSections = document.querySelectorAll('.hidden');
  //   hiddenSections.forEach((el) => observer.observe(el));
  // }
}
