import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    @if (totalPages > 1) {
      <nav class="flex items-center justify-center gap-3" aria-label="Pagination">
        <button
          type="button"
          class="group grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06] transition-all duration-300"
          style="background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);"
          [disabled]="page <= 1"
          (click)="go(page - 1)">
          <svg viewBox="0 0 24 24" class="h-4 w-4 text-slate-400 transition group-hover:text-white group-disabled:text-slate-600" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <span class="min-w-[80px] text-center text-sm text-slate-400">
          <span class="font-semibold text-white">{{ page }}</span>
          <span class="mx-1 text-slate-600">/</span>
          {{ totalPages }}
        </span>

        <button
          type="button"
          class="group grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06] transition-all duration-300"
          style="background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);"
          [disabled]="page >= totalPages"
          (click)="go(page + 1)">
          <svg viewBox="0 0 24 24" class="h-4 w-4 text-slate-400 transition group-hover:text-white group-disabled:text-slate-600" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </nav>
    }
  `,
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  go(p: number): void {
    if (p >= 1 && p <= this.totalPages) this.pageChange.emit(p);
  }
}
