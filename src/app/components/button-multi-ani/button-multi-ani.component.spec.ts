import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMultiAniComponent } from './button-multi-ani.component';

describe('ButtonMultiAniComponent', () => {
  let component: ButtonMultiAniComponent;
  let fixture: ComponentFixture<ButtonMultiAniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonMultiAniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonMultiAniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
