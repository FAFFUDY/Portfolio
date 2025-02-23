import { isPlatformBrowser } from '@angular/common';
import {Component, ElementRef, HostListener, ViewChild, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],

})export class CardComponent implements OnInit {
  currentText: string = '';
  private phrases: string[] = [
    'SOFTWARE ENGINEER',
    'JAVA DEVELOPER',
    'WEB DEVELOPER',
    'FULL STACK DEV.',
    'DATA ANALYST'
  ];
  private typingSpeed: number = 100;
  private deletingSpeed: number = 50;
  private pauseDuration: number = 2000;
  private currentPhraseIndex: number = 0;
  private currentCharIndex: number = 0;
  private isDeleting: boolean = false;

  ngOnInit() {
    this.initAnimations();
    this.typeText();
  }

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo('.intro-text', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo('.name',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    )
    .fromTo('.title',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    )
    .fromTo('.description',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    )
    .fromTo('.cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );
  }

  private typeText() {
    const currentPhrase = this.phrases[this.currentPhraseIndex];
    
    if (this.isDeleting) {
      this.currentText = currentPhrase.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        setTimeout(() => this.typeText(), 500);
        return;
      }
    } else {
      this.currentText = currentPhrase.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      
      if (this.currentCharIndex === currentPhrase.length) {
        setTimeout(() => {
          this.isDeleting = true;
          this.typeText();
        }, this.pauseDuration);
        return;
      }
    }

    setTimeout(
      () => this.typeText(),
      this.isDeleting ? this.deletingSpeed : this.typingSpeed
    );
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
}