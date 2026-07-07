import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <span
      class="inline-block animate-spin rounded-full"
      [style.width.px]="size"
      [style.height.px]="size"
      style="border: 2px solid transparent; border-top-color: #7C6CFF; border-right-color: #22D3EE; border-bottom-color: #34D399;"
      role="status"
      aria-label="Loading"></span>
  `,
})
export class SpinnerComponent {
  @Input() size = 18;
}
