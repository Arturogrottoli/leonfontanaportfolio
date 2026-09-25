import { Component } from '@angular/core';

@Component({
  selector: 'app-arrow-icon',
  standalone: true,
  template: `
    <svg aria-hidden="true" viewBox="0 0 20 20" class="arrow-icon">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  `,
})
export class ArrowIconComponent {}
