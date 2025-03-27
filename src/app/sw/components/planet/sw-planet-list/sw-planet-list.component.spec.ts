import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPlanetListComponent } from './sw-planet-list.component';

describe('SwPlanetListComponent', () => {
  let component: SwPlanetListComponent;
  let fixture: ComponentFixture<SwPlanetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPlanetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPlanetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
