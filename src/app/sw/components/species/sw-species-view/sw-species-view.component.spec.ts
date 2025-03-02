import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSpeciesViewComponent } from './sw-species-view.component';

describe('SwSpeciesViewComponent', () => {
  let component: SwSpeciesViewComponent;
  let fixture: ComponentFixture<SwSpeciesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwSpeciesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwSpeciesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
