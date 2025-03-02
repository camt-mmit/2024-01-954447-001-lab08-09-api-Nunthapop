import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPlanetViewPageComponent } from './sw-planet-view-page.component';

describe('SwPlanetViewPageComponent', () => {
  let component: SwPlanetViewPageComponent;
  let fixture: ComponentFixture<SwPlanetViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPlanetViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPlanetViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
