import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPeopleHttpClientListPageComponent } from './sw-people-http-client-list-page.component';

describe('SwPeopleHttpClientListPageComponent', () => {
  let component: SwPeopleHttpClientListPageComponent;
  let fixture: ComponentFixture<SwPeopleHttpClientListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPeopleHttpClientListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPeopleHttpClientListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
