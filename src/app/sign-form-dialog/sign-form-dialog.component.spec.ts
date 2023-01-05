import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignFormDialogComponent } from './sign-form-dialog.component';

describe('SignFormDialogComponent', () => {
  let component: SignFormDialogComponent;
  let fixture: ComponentFixture<SignFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
