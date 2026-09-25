import { Component } from '@angular/core';

@Component({
  selector: 'app-download-icon',
  standalone: true,
  template: `
    <svg aria-hidden="true" viewBox="0 0 20 20" class="download-icon">
      <path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 15.5v1h12v-1" />
    </svg>
  `,
})
export class DownloadIconComponent {}
