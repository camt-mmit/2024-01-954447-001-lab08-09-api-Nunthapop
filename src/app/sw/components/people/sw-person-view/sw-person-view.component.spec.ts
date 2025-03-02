import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPersonViewComponent } from './sw-person-view.component';

describe('SwPersonViewComponent', () => {
  let component: SwPersonViewComponent;
  let fixture: ComponentFixture<SwPersonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPersonViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPersonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
