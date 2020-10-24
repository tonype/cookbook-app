import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListPage } from './list.page';

describe('RecipeListPage', () => {
  let component: RecipeListPage;
  let fixture: ComponentFixture<RecipeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
