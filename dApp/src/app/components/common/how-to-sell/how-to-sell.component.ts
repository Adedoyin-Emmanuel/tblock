import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-how-to-sell',
    templateUrl: './how-to-sell.component.html',
    styleUrls: ['./how-to-sell.component.scss']
})
export class HowToSellComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}