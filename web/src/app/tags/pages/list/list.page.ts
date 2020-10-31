import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Tag } from '@tags.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-tags-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class TagsListPage implements OnInit {
  tags: Tag[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.tags = data.tags;
      });
  }
}
