import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsDetailsPage } from './details.page';

describe('IngredientsComponent', () => {
  let component: IngredientsDetailsPage;
  let fixture: ComponentFixture<IngredientsDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsDetailsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
