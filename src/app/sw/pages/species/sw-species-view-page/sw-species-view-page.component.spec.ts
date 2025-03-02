import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSpeciesViewPageComponent } from './sw-species-view-page.component';

describe('SwSpeciesViewPageComponent', () => {
  let component: SwSpeciesViewPageComponent;
  let fixture: ComponentFixture<SwSpeciesViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwSpeciesViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwSpeciesViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
