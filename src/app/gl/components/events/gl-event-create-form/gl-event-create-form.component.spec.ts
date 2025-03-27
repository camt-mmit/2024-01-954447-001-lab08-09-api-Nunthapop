import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlEventCreateFormComponent } from './gl-event-create-form.component';

describe('GlEventCreateFormComponent', () => {
  let component: GlEventCreateFormComponent;
  let fixture: ComponentFixture<GlEventCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlEventCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlEventCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
