import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlEventsListComponent } from './gl-events-list.component';

describe('GlEventsListComponent', () => {
  let component: GlEventsListComponent;
  let fixture: ComponentFixture<GlEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlEventsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
