import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlEventCreatePageComponent } from './gl-event-create-page.component';

describe('GlEventCreatePageComponent', () => {
  let component: GlEventCreatePageComponent;
  let fixture: ComponentFixture<GlEventCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlEventCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlEventCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
