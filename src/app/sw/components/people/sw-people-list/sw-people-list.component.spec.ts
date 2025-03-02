import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPeopleListComponent } from './sw-people-list.component';

describe('SwPeopleListComponent', () => {
  let component: SwPeopleListComponent;
  let fixture: ComponentFixture<SwPeopleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwPeopleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwPeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
