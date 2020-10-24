import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsPage } from './details.page';

describe('DetailsComponent', () => {
  let component: RecipeDetailsPage;
  let fixture: ComponentFixture<RecipeDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
