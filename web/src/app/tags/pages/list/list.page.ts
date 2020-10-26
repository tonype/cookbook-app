import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TagsService } from '../../services/tags.service';

@UntilDestroy()
@Component({
  selector: 'cookbook-tags-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class TagsListPage implements OnInit {
  tags: any[];

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.list()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((tags) => {
        this.tags = tags;
      });
  }
}
