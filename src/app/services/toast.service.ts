import { Injectable, signal } from '@angular/core';

export type ToastVariant = 'catering' | 'realestate' | 'success' | 'error';

export interface ToastMessage {
  id: number;
  title: string;
  body?: string;
  variant: ToastVariant;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  /** Reactive signal holding the currently visible toasts. */
  readonly toasts = signal<ToastMessage[]>([]);

  show(message: Omit<ToastMessage, 'id'>, durationMs = 4500): void {
    const id = this.nextId++;
    this.toasts.update(list => [...list, { ...message, id }]);

    // Auto-dismiss
    setTimeout(() => this.dismiss(id), durationMs);
  }

  dismiss(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
