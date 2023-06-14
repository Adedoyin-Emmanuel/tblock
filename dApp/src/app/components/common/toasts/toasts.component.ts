import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToastService } from 'src/app/services/app-toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts',
  // standalone: true,
  // imports: [CommonModule, NgbToastModule],
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {
  constructor(public toastService: AppToastService) {

  }


}
