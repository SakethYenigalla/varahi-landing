import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { LeadService, CateringLead } from '../../services/lead.service';

@Component({
  selector: 'app-catering-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="catering" class="section">
      <div class="container-narrow grid lg:grid-cols-2 gap-12 items-start">

        <!-- Left: pitch -->
        <div>
          <span class="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-catering-700">
            Catering Enquiry
          </span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold mt-3 text-slate-900 leading-tight">
            Tell us about your event — we'll plan the menu around it.
          </h2>
          <p class="mt-5 text-slate-600 leading-relaxed">
            Whether it's a 50-guest housewarming or a 1000-guest wedding, share a few details
            and our team will reach out with a tailored quote and tasting invitation.
          </p>

          <ul class="mt-8 space-y-3 text-sm text-slate-700">
            <li class="flex items-start gap-3">
              <span class="mt-1 w-5 h-5 rounded-full bg-catering-100 text-catering-700 flex items-center justify-center text-xs font-bold">✓</span>
              Free consultation &amp; menu customisation
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 w-5 h-5 rounded-full bg-catering-100 text-catering-700 flex items-center justify-center text-xs font-bold">✓</span>
              Authentic Andhra, North-Indian &amp; live counters
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 w-5 h-5 rounded-full bg-catering-100 text-catering-700 flex items-center justify-center text-xs font-bold">✓</span>
              Full setup, service staff &amp; cleanup included
            </li>
          </ul>
        </div>

        <!-- Right: form card -->
        <div class="card p-6 sm:p-8 border-t-4 border-catering-600">
          @if (submitted()) {
            <!-- ============ SUCCESS STATE ============ -->
            <div class="text-center py-8 animate-fadeIn">
              <div class="mx-auto w-16 h-16 rounded-full bg-catering-100 flex items-center justify-center text-catering-700 text-3xl">
                ✓
              </div>
              <h3 class="mt-5 font-display text-2xl font-bold text-slate-900">Thank you!</h3>
              <p class="mt-2 text-slate-600">
                We've received your catering enquiry. Our team will reach out within 24 hours.
              </p>
              <button type="button"
                      class="mt-6 btn-catering"
                      (click)="reset()">
                Submit another enquiry
              </button>
            </div>
          } @else {
            <!-- ============ FORM ============ -->
            <h3 class="font-display text-2xl font-bold text-slate-900">Plan your event</h3>
            <p class="mt-1 text-sm text-slate-500">All fields marked * are required.</p>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="mt-6 space-y-5" novalidate>
              <!-- Name -->
              <div>
                <label for="cf-name" class="form-label">Full name *</label>
                <input id="cf-name" type="text" formControlName="name"
                       class="form-input" [class.invalid]="hasError('name')"
                       placeholder="e.g. Ramesh Kumar"
                       autocomplete="name" />
                @if (hasError('name')) {
                  <p class="form-error">Please enter your name.</p>
                }
              </div>

              <!-- Email -->
              <div>
                <label for="cf-email" class="form-label">Email *</label>
                <input id="cf-email" type="email" formControlName="email"
                       class="form-input" [class.invalid]="hasError('email')"
                       placeholder="you@example.com"
                       autocomplete="email" />
                @if (form.get('email')?.touched && form.get('email')?.hasError('required')) {
                  <p class="form-error">Email is required.</p>
                } @else if (form.get('email')?.touched && form.get('email')?.hasError('email')) {
                  <p class="form-error">Enter a valid email address.</p>
                }
              </div>

              <!-- Event date + Guest count -->
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label for="cf-date" class="form-label">Event date *</label>
                  <input id="cf-date" type="date" formControlName="eventDate"
                         [min]="today"
                         class="form-input" [class.invalid]="hasError('eventDate')" />
                  @if (hasError('eventDate')) {
                    <p class="form-error">Please choose a date.</p>
                  }
                </div>
                <div>
                  <label for="cf-guests" class="form-label">Guest count *</label>
                  <input id="cf-guests" type="number" min="1" formControlName="guestCount"
                         class="form-input" [class.invalid]="hasError('guestCount')"
                         placeholder="e.g. 250" />
                  @if (form.get('guestCount')?.touched && form.get('guestCount')?.hasError('required')) {
                    <p class="form-error">Guest count is required.</p>
                  } @else if (form.get('guestCount')?.touched && form.get('guestCount')?.hasError('min')) {
                    <p class="form-error">Must be at least 1 guest.</p>
                  }
                </div>
              </div>

              <!-- Event Type -->
              <div>
                <label class="form-label">Event type *</label>
                <div class="grid grid-cols-3 gap-2">
                  @for (type of eventTypes; track type) {
                    <label class="cursor-pointer">
                      <input type="radio" formControlName="eventType" [value]="type"
                             class="peer sr-only" />
                      <span class="block text-center text-sm font-medium px-3 py-2.5 rounded-lg border border-slate-300
                                   peer-checked:bg-catering-600 peer-checked:text-white peer-checked:border-catering-600
                                   hover:border-catering-400 transition-colors">
                        {{ type }}
                      </span>
                    </label>
                  }
                </div>
                @if (hasError('eventType')) {
                  <p class="form-error">Please pick an event type.</p>
                }
              </div>

              <!-- Submit -->
              <button type="submit"
                      [disabled]="loading()"
                      class="btn-catering w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                @if (loading()) {
                  <span class="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Submitting…
                } @else {
                  Request Catering Quote &nbsp;→
                }
              </button>

              <p class="text-xs text-center text-slate-500">
                By submitting, you agree to be contacted regarding your enquiry.
              </p>
            </form>
          }
        </div>
      </div>
    </section>
  `,
})
export class CateringFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private leads = inject(LeadService);

  protected readonly eventTypes = ['Wedding', 'Corporate', 'Private'] as const;
  protected readonly today = new Date().toISOString().split('T')[0];

  protected loading = signal(false);
  protected submitted = signal(false);

  protected form: FormGroup = this.fb.group({
    name:       ['', [Validators.required, Validators.minLength(2)]],
    email:      ['', [Validators.required, Validators.email]],
    eventDate:  ['', [Validators.required]],
    guestCount: [null, [Validators.required, Validators.min(1)]],
    eventType:  ['', [Validators.required]],
  });

  protected hasError(controlName: string): boolean {
    const c: AbstractControl | null = this.form.get(controlName);
    return !!c && c.touched && c.invalid;
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show({
        title: 'Please complete the form',
        body: 'A few fields need your attention.',
        variant: 'error',
      });
      return;
    }

    this.loading.set(true);
    this.leads.submitCateringLead(this.form.value as CateringLead).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
        this.toast.show({
          title: 'Catering enquiry received',
          body: "We'll be in touch within 24 hours.",
          variant: 'catering',
        });
      },
      error: () => {
        this.loading.set(false);
        this.toast.show({
          title: 'Something went wrong',
          body: 'Please try again or call us directly.',
          variant: 'error',
        });
      },
    });
  }

  protected reset(): void {
    this.form.reset({ eventType: '' });
    this.submitted.set(false);
  }
}
