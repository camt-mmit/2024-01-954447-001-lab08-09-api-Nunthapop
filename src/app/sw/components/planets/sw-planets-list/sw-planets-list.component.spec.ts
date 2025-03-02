import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPlanetsListComponent } from './sw-planets-list.component';

describe('SwPlanetsListComponent', () => {
  let component: SwPlanetsListComponent;
  let fixture: ComponentFixture<SwPlanetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPlanetsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPlanetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
