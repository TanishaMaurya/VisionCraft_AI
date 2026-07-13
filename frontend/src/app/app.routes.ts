import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

/**
 * All feature pages are lazy-loaded via loadComponent for smaller
 * initial bundles.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'VisionCraft AI — AI Image Generation',
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./features/pricing/pricing.component').then((m) => m.PricingComponent),
    title: 'Pricing — VisionCraft AI',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
    title: 'Log in — VisionCraft AI',
  },
  {
    path: 'signup',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/signup.component').then((m) => m.SignupComponent),
    title: 'Sign up — VisionCraft AI',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard — VisionCraft AI',
  },
  {
    path: 'generate',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/generate/generate.component').then((m) => m.GenerateComponent),
    title: 'Generate — VisionCraft AI',
  },
  {
    path: 'history',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/history/history.component').then((m) => m.HistoryComponent),
    title: 'History — VisionCraft AI',
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
    title: 'Profile — VisionCraft AI',
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/transactions/transactions.component').then(
        (m) => m.TransactionsComponent
      ),
    title: 'Transactions — VisionCraft AI',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page not found — VisionCraft AI',
  },
];
