import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPlanetsListPageComponent } from './sw-planets-list-page.component';

describe('SwPlanetsListPageComponent', () => {
  let component: SwPlanetsListPageComponent;
  let fixture: ComponentFixture<SwPlanetsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPlanetsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPlanetsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
