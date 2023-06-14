import { Component, OnInit } from '@angular/core';
import { EventsListService } from 'src/app/services/events-list.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-explore-page-one',
    templateUrl: './explore-page-one.component.html',
    styleUrls: ['./explore-page-one.component.scss']
})
export class ExplorePageOneComponent implements OnInit {

    allEvents: any;
    POSTS: any;
    totalItems: number = 10;
    page: number = 1;
    count: number = 0;
    tableSize: number = 1;
    tableSizes: any = [3, 6, 9, 12];

    constructor(private eventService: EventsListService) { }

    ngOnInit(): void {
        this.allEvents = this.eventService.get();
        this.fetchPost();
    }

    fetchPost(): void {
        this.eventService.get()
    }

    onTableDataChange(event: any) {
        this.page = event;
        this.fetchPost();
    }

    onTableSizeChange(event: any): void {
        this.tableSize = event.target.value;
        this.page = 1;
        this.fetchPost();
    }

}