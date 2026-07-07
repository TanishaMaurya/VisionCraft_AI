import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../core/services/image.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { SpinnerComponent } from '../../shared/components/spinner.component';
import { ImageCardComponent } from '../../shared/components/image-card.component';
import {
  AspectRatio,
  GeneratedImage,
  ImageStyle,
} from '../../core/models/image.model';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SpinnerComponent, ImageCardComponent],
  template: `
    <section class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header class="mb-8 animate-fade-up">
        <h1 class="font-display text-3xl font-bold text-white">Generate an image</h1>
        <p class="mt-1 text-sm text-slate-400">
          One credit per image ·
          <span class="font-semibold text-gold-400">{{ credits() }} credit{{ credits() === 1 ? '' : 's' }}</span> left
        </p>
      </header>

      <div class="grid gap-8 lg:grid-cols-[420px_1fr]">
        <!-- Form sidebar -->
        <div class="card h-fit animate-fade-up-delay-1"
             style="border-color: rgba(255,255,255,0.08);">
          @if (credits() < 1) {
            <div class="rounded-xl border border-gold-500/20 bg-gold-500/[0.06] p-4 text-sm text-gold-300">
              <div class="flex items-center gap-2 font-semibold">
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M12 3l9.5 16.5H2.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                You're out of credits
              </div>
              <p class="mt-1.5 text-xs text-gold-400/70">Buy more to keep generating.</p>
              <a routerLink="/pricing" class="btn-primary mt-3 w-full py-2.5">Buy credits</a>
            </div>
          } @else {
            <form [formGroup]="form" (ngSubmit)="generate()" class="space-y-5">
              <div>
                <label class="label" for="prompt">Prompt</label>
                <textarea
                  id="prompt"
                  formControlName="prompt"
                  rows="4"
                  class="input resize-none"
                  placeholder="A lighthouse on a cliff at golden hour, dramatic clouds…"></textarea>
                @if (invalid('prompt')) {
                  <p class="mt-1 text-xs text-flame-400">Prompt must be at least 3 characters.</p>
                }
              </div>

              <div>
                <span class="label">Style</span>
                <div class="grid grid-cols-2 gap-2">
                  @for (s of styles; track s) {
                    <button
                      type="button"
                      (click)="form.controls.style.setValue(s)"
                      class="chip"
                      [class.chip-active]="form.controls.style.value === s">
                      {{ s }}
                    </button>
                  }
                </div>
              </div>

              <div>
                <span class="label">Aspect ratio</span>
                <div class="grid grid-cols-3 gap-2">
                  @for (r of ratios; track r) {
                    <button
                      type="button"
                      (click)="form.controls.aspectRatio.setValue(r)"
                      class="chip"
                      [class.chip-active]="form.controls.aspectRatio.value === r">
                      {{ r }}
                    </button>
                  }
                </div>
              </div>

              <button type="submit" class="btn-primary w-full py-3" [disabled]="loading()">
                @if (loading()) { <app-spinner /> Generating… } @else {
                  <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Generate image
                }
              </button>
            </form>
          }
        </div>

        <!-- Preview canvas -->
        <div class="flex min-h-[420px] items-center justify-center animate-fade-up-delay-2">
          @if (loading()) {
            <div class="w-full max-w-md text-center">
              <div class="skeleton mx-auto aspect-square w-full rounded-2xl"></div>
              <p class="mt-4 text-sm text-slate-500">
                Rendering your image… the model may take a few seconds to warm up.
              </p>
            </div>
          } @else if (result()) {
            <div class="w-full max-w-md animate-develop">
              <app-image-card
                [image]="result()!"
                [showDelete]="false"
                (favorite)="onFavorite($event)" />
            </div>
          } @else {
            <div class="text-center text-slate-500">
              <div class="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl border border-white/[0.06]"
                   style="background: linear-gradient(135deg, rgba(232,82,122,0.04) 0%, rgba(240,160,48,0.03) 100%);">
                <svg viewBox="0 0 24 24" class="h-9 w-9 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6" stroke-linecap="round"/></svg>
              </div>
              <p class="text-sm">Your generated image will appear here.</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .chip {
        @apply rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300;
      }
      .chip:hover {
        @apply border-white/15 bg-white/[0.05];
      }
      .chip-active {
        border-color: rgba(232, 82, 122, 0.4) !important;
        background: rgba(232, 82, 122, 0.08) !important;
        color: #FF9CAF !important;
        box-shadow: 0 0 15px -3px rgba(232, 82, 122, 0.2);
      }
    `,
  ],
})
export class GenerateComponent {
  private fb = inject(FormBuilder);
  private imageService = inject(ImageService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  styles: ImageStyle[] = ['Realistic', 'Anime', 'Digital Art', 'Sketch'];
  ratios: AspectRatio[] = ['1:1', '16:9', '9:16'];

  loading = signal(false);
  result = signal<GeneratedImage | null>(null);
  credits = computed(() => this.auth.credits());

  form = this.fb.nonNullable.group({
    prompt: ['', [Validators.required, Validators.minLength(3)]],
    style: this.fb.nonNullable.control<ImageStyle>('Realistic'),
    aspectRatio: this.fb.nonNullable.control<AspectRatio>('1:1'),
  });

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  generate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.imageService.generate(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.result.set(res.data.image);
        this.auth.setCredits(res.data.credits); // sync balance in navbar
        this.toast.success('Image generated!');
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onFavorite(image: GeneratedImage): void {
    this.imageService.toggleFavorite(image.id).subscribe({
      next: (res) => this.result.set(res.data.image),
    });
  }
}
