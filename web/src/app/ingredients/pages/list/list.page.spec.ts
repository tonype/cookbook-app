import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsListPage } from './list.page';

describe('IngredientsListPage', () => {
  let component: IngredientsListPage;
  let fixture: ComponentFixture<IngredientsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
