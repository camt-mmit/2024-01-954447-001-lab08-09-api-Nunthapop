import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPlanetViewComponent } from './sw-planet-view.component';

describe('SwPlanetViewComponent', () => {
  let component: SwPlanetViewComponent;
  let fixture: ComponentFixture<SwPlanetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPlanetViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPlanetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
