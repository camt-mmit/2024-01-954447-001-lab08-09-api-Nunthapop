import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlEventsListPageComponent } from './gl-events-list-page.component';

describe('GlEventsListPageComponent', () => {
  let component: GlEventsListPageComponent;
  let fixture: ComponentFixture<GlEventsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlEventsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlEventsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
