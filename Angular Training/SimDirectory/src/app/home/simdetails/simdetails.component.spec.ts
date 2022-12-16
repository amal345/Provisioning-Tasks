import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimdetailsComponent } from './simdetails.component';

describe('SimdetailsComponent', () => {
  let component: SimdetailsComponent;
  let fixture: ComponentFixture<SimdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
