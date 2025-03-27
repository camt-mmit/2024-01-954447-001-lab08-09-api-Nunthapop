import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlCreateContactsFormComponent } from './gl-create-contacts-form.component';

describe('GlCreateContactsFormComponent', () => {
  let component: GlCreateContactsFormComponent;
  let fixture: ComponentFixture<GlCreateContactsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlCreateContactsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlCreateContactsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
