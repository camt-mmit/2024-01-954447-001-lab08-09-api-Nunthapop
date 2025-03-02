import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPeopleFetchListPageComponent } from './sw-people-fetch-list-page.component';

describe('SwPeopleFetchListPageComponent', () => {
  let component: SwPeopleFetchListPageComponent;
  let fixture: ComponentFixture<SwPeopleFetchListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPeopleFetchListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPeopleFetchListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
