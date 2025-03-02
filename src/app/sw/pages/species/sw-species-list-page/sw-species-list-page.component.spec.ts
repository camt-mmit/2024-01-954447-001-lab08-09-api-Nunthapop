import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSpeciesListPageComponent } from './sw-species-list-page.component';

describe('SwSpeciesListPageComponent', () => {
  let component: SwSpeciesListPageComponent;
  let fixture: ComponentFixture<SwSpeciesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwSpeciesListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwSpeciesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
