import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListPage } from './list.page';

describe('TagsListPage', () => {
  let component: TagsListPage;
  let fixture: ComponentFixture<TagsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
