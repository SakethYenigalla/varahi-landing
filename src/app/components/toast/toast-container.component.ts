import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastVariant } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      @for (t of toasts(); track t.id) {
        <div
          class="pointer-events-auto animate-slideIn rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden bg-white"
          role="status"
        >
          <div class="flex">
            <!-- Accent bar -->
            <div [class]="accentBar(t.variant)" class="w-1.5 shrink-0"></div>

            <div class="flex-1 p-4">
              <div class="flex items-start gap-3">
                <div [class]="iconWrap(t.variant)"
                     class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg">
                  ✓
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-slate-900">{{ t.title }}</p>
                  @if (t.body) {
                    <p class="mt-0.5 text-sm text-slate-600">{{ t.body }}</p>
                  }
                </div>
                <button
                  type="button"
                  class="text-slate-400 hover:text-slate-700 transition-colors"
                  (click)="toast.dismiss(t.id)"
                  aria-label="Dismiss notification"
                >
                  <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 11-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"
                      clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  protected toast = inject(ToastService);
  protected toasts = computed(() => this.toast.toasts());

  accentBar(v: ToastVariant): string {
    switch (v) {
      case 'catering':   return 'bg-catering-600';
      case 'realestate': return 'bg-realestate-700';
      case 'error':      return 'bg-red-500';
      default:           return 'bg-emerald-500';
    }
  }

  iconWrap(v: ToastVariant): string {
    switch (v) {
      case 'catering':   return 'bg-catering-600';
      case 'realestate': return 'bg-realestate-700';
      case 'error':      return 'bg-red-500';
      default:           return 'bg-emerald-500';
    }
  }
}
