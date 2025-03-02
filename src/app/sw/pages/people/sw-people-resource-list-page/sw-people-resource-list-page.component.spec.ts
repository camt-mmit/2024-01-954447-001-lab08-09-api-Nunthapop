import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPeopleResourceListPageComponent } from './sw-people-resource-list-page.component';

describe('SwPeopleResourceListPageComponent', () => {
  let component: SwPeopleResourceListPageComponent;
  let fixture: ComponentFixture<SwPeopleResourceListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPeopleResourceListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPeopleResourceListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
