import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypingEffectService {
  private phrases: string[] = [
    'build things for the web',
    'create amazing experiences',
    'develop modern applications',
    'design beautiful interfaces'
  ];
  private typingSpeed: number = 100;
  private deletingSpeed: number = 50;
  private pauseDuration: number = 2000;
  private currentPhraseIndex: number = 0;
  private currentCharIndex: number = 0;
  private isDeleting: boolean = false;
  private currentTextSubject = new BehaviorSubject<string>('');
  currentText$ = this.currentTextSubject.asObservable();

  constructor() {
    this.typeText();
  }

  private typeText() {
    const currentPhrase = this.phrases[this.currentPhraseIndex];

    if (this.isDeleting) {
      this.currentTextSubject.next(currentPhrase.substring(0, this.currentCharIndex - 1));
      this.currentCharIndex--;

      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        setTimeout(() => this.typeText(), 500);
        return;
      }
    } else {
      this.currentTextSubject.next(currentPhrase.substring(0, this.currentCharIndex + 1));
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
}
