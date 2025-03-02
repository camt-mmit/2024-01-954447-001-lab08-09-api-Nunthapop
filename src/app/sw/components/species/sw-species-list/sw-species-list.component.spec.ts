import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSpeciesListComponent } from './sw-species-list.component';

describe('SwSpeciesListComponent', () => {
  let component: SwSpeciesListComponent;
  let fixture: ComponentFixture<SwSpeciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwSpeciesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwSpeciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
