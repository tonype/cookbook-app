import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsDetailsPage } from './details.page';

describe('TagsComponent', () => {
  let component: TagsDetailsPage;
  let fixture: ComponentFixture<TagsDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsDetailsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
