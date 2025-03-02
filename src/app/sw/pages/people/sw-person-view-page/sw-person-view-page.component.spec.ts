import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPersonViewPageComponent } from './sw-person-view-page.component';

describe('SwPersonViewPageComponent', () => {
  let component: SwPersonViewPageComponent;
  let fixture: ComponentFixture<SwPersonViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPersonViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPersonViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
