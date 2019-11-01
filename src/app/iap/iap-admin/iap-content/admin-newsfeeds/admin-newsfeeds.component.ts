import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AdminNewsfeedsService } from './admin-newsfeeds.service';

export interface PeriodicElement {
  id: number;
  title: string;
  headline: string;
  status: string;
  lastModifier: string;
  publishDate?: string;
}

@Component({
  selector: 'app-admin-newsfeeds',
  templateUrl: './admin-newsfeeds.component.html',
  styleUrls: ['../admin-announcements/admin-announcements.component.css']
  // styleUrls: ['./admin-newsfeeds.component.css']
})
export class AdminNewsfeedsComponent implements OnInit {
  ELEMENT_DATA: any[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild('PostEditBox', { static: true }) PostEditBox: TemplateRef<any>;
  displayedColumns: string[] = [
    'title',
    'headline',
    'status',
    'lastModifier',
    'publish Date',
    'id',
    'Delete'
  ];
  dataSource: MatTableDataSource<any>;
  constructor(private service: AdminNewsfeedsService) {}
  ngOnInit() {
    this.refreshData();
    this.paginator.pageSize = 10;
  }

  refreshData() {
    this.ELEMENT_DATA = this.service.getAllNewsFeed();
    console.log('get base', this.ELEMENT_DATA);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'publish Date':
          return item.publishDate;
        default:
          return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePost(id: number) {
    this.service.deleteOneNewsFeed(id);
    this.refreshData();
  }

  // using HTML is better @_@
  // editRow(id: number) {
  //   this.route.navigateByUrl(`/newsfeed/${id}`);
  // }
}
