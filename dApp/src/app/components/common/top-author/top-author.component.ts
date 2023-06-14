import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-author',
    templateUrl: './top-author.component.html',
    styleUrls: ['./top-author.component.scss']
})
export class TopAuthorComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}