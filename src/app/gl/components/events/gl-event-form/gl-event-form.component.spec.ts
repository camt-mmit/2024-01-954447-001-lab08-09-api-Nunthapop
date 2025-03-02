import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlEventFormComponent } from './gl-event-form.component';

describe('GlEventFormComponent', () => {
  let component: GlEventFormComponent;
  let fixture: ComponentFixture<GlEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlEventFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
