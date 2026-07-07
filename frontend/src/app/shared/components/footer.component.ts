import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="relative mt-20">
      <!-- Aurora divider line -->
      <div class="mx-auto h-px max-w-5xl"
           style="background: linear-gradient(90deg, transparent, rgba(232,82,122,0.4), rgba(240,160,48,0.3), rgba(167,139,250,0.2), transparent);"></div>

      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div class="flex items-center gap-2.5">
          <span
            class="grid h-6 w-6 place-items-center rounded-lg overflow-hidden"
            style="background: linear-gradient(135deg, #E8527A 0%, #F0A030 100%);">
            <svg viewBox="0 0 24 24" class="h-3 w-3 text-white" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M4 16l4-5 3 3 4-6 5 8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <p class="text-sm text-slate-500">
            © {{ year }} Imageify. Images made with AI.
          </p>
        </div>
        <div class="flex gap-6 text-sm text-slate-500">
          <a routerLink="/pricing" class="transition hover:text-flame-400">Pricing</a>
          <a routerLink="/login" class="transition hover:text-flame-400">Log in</a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
