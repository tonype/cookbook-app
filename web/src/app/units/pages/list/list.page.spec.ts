import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsListPage } from './list.page';

describe('UnitsListPage', () => {
  let component: UnitsListPage;
  let fixture: ComponentFixture<UnitsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
