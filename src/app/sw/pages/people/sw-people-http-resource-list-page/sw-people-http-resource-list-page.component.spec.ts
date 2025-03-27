import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPeopleHttpResourceListPageComponent } from './sw-people-http-resource-list-page.component';

describe('SwPeopleHttpResourceListPageComponent', () => {
  let component: SwPeopleHttpResourceListPageComponent;
  let fixture: ComponentFixture<SwPeopleHttpResourceListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPeopleHttpResourceListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPeopleHttpResourceListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
