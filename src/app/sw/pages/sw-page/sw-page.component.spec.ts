import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPageComponent } from './sw-page.component';

describe('SwPageComponent', () => {
  let component: SwPageComponent;
  let fixture: ComponentFixture<SwPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
