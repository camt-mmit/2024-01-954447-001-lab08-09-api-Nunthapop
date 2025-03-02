import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlAuthorizationPageComponent } from './gl-authorization-page.component';

describe('GlAuthorizationPageComponent', () => {
  let component: GlAuthorizationPageComponent;
  let fixture: ComponentFixture<GlAuthorizationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlAuthorizationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlAuthorizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
