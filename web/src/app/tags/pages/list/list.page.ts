import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'cookbook-tags-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class TagsListPage implements OnInit {
  tags: Observable<any[]>;

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tags = this.tagsService.list();
  }
}
