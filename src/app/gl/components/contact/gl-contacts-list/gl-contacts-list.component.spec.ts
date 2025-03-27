import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlContactsListComponent } from './gl-contacts-list.component';

describe('GlContactsListComponent', () => {
  let component: GlContactsListComponent;
  let fixture: ComponentFixture<GlContactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlContactsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
