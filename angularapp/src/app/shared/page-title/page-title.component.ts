import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from './page-title.model';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent {
  @Input() breadcrumbItems: BreadcrumbItem[] = [];
  @Input() title: string = '';
  constructor () { }

  ngOnInit(): void {
  }
}
