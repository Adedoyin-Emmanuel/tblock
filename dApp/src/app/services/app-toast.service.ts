import { Injectable } from '@angular/core';


export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
  cssClasses?: string; // bg-success text-light
}

@Injectable({ providedIn: 'root' })
export class AppToastService {
  toasts: ToastInfo[] = [];

  show(header: string, body: string, delay?: number, cssClasses?: string) {
    
    this.toasts.push({ header, body, delay , cssClasses});
  }

  hide(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}