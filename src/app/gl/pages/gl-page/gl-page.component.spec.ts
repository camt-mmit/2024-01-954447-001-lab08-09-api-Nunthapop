import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlPageComponent } from './gl-page.component';

describe('GlPageComponent', () => {
  let component: GlPageComponent;
  let fixture: ComponentFixture<GlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
