import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsDetailsPage } from './details.page';

describe('UnitsComponent', () => {
  let component: UnitsDetailsPage;
  let fixture: ComponentFixture<UnitsDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsDetailsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
