import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-w3m-core-button-wrapper',
  templateUrl: './w3-mcore-button-component-wrapper.component.html',
  styleUrls: ['./w3-mcore-button-component-wrapper.component.scss']
})
export class W3MCoreButtonComponentWrapperComponent {
  @Input() balance: 'show'|'hide' = 'show';
  
}
