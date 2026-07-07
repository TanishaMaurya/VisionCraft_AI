import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GeneratedImage } from '../../core/models/image.model';
import { ToastService } from '../../core/services/toast.service';

/**
 * Displays a single generated image with quick actions:
 * download, copy prompt, favorite toggle, delete.
 */
@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [DatePipe],
  template: `
    <figure
      class="image-card group overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500"
      style="background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%); box-shadow: 0 8px 32px rgba(0,0,0,0.25);">

      <div class="relative aspect-square overflow-hidden">
        <img
          [src]="image.imageUrl"
          [alt]="image.prompt"
          loading="lazy"
          class="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" />

        <!-- Favorite badge -->
        <button
          type="button"
          (click)="favorite.emit(image)"
          class="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-all duration-300 hover:scale-110"
          style="background: rgba(0,0,0,0.4); backdrop-filter: blur(12px);"
          [attr.aria-pressed]="image.isFavorite"
          [attr.aria-label]="image.isFavorite ? 'Remove from favorites' : 'Add to favorites'">
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" [attr.fill]="image.isFavorite ? '#FB7185' : 'none'" stroke="currentColor" stroke-width="2">
            <path d="M12 21s-7-4.35-9.5-8.5C1 9 3 5.5 6.5 5.5c2 0 3.5 1.5 5.5 3.5 2-2 3.5-3.5 5.5-3.5C21 5.5 23 9 21.5 12.5 19 16.65 12 21 12 21z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Hover action bar -->
        <div
          class="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 p-3 transition-all duration-500 group-hover:translate-y-0"
          style="background: linear-gradient(to top, rgba(5,6,8,0.9), rgba(5,6,8,0.6), transparent); backdrop-filter: blur(4px);">
          <button type="button" (click)="download()" class="pill" title="Download">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button type="button" (click)="copyPrompt()" class="pill" title="Copy prompt">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>
          </button>
          @if (showDelete) {
            <button type="button" (click)="remove.emit(image)" class="pill ml-auto !border-rose-500/20 !text-rose-400 hover:!bg-rose-500/10" title="Delete">
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V4h6v3m-8 0l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          }
        </div>
      </div>

      <figcaption class="space-y-2.5 p-4">
        <p class="line-clamp-2 text-sm text-slate-300" [title]="image.prompt">
          {{ image.prompt }}
        </p>
        <div class="flex items-center gap-2 text-xs text-slate-500">
          <span class="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-0.5">{{ image.style }}</span>
          <span class="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-0.5">{{ image.aspectRatio }}</span>
          <span class="ml-auto">{{ image.createdAt | date: 'MMM d' }}</span>
        </div>
      </figcaption>
    </figure>
  `,
  styles: [
    `
      .image-card:hover {
        border-color: rgba(124, 108, 255, 0.15);
        box-shadow: 0 12px 48px rgba(0,0,0,0.35), 0 0 40px -10px rgba(124, 108, 255, 0.15) !important;
        transform: translateY(-4px);
      }
      .pill {
        @apply grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-white transition-all duration-300;
        background: rgba(255,255,255,0.06);
        backdrop-filter: blur(12px);
      }
      .pill:hover {
        @apply border-white/20;
        background: rgba(255,255,255,0.12);
        transform: scale(1.05);
      }
    `,
  ],
})
export class ImageCardComponent {
  @Input({ required: true }) image!: GeneratedImage;
  @Input() showDelete = true;
  @Output() favorite = new EventEmitter<GeneratedImage>();
  @Output() remove = new EventEmitter<GeneratedImage>();

  private toast = inject(ToastService);

  download(): void {
    const a = document.createElement('a');
    a.href = this.image.imageUrl;
    a.download = `imageify-${this.image.id}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async copyPrompt(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.image.prompt);
      this.toast.success('Prompt copied to clipboard.');
    } catch {
      this.toast.error('Could not copy the prompt.');
    }
  }
}
