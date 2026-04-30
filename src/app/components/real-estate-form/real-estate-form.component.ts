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
import { LeadService, RealEstateLead } from '../../services/lead.service';

@Component({
  selector: 'app-real-estate-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="realestate" class="section bg-parchment-100/60 border-y border-brand-gold/15">
      <div class="container-narrow grid lg:grid-cols-2 gap-12 items-start">

        <!-- Form card on the left for contrast vs the catering layout -->
        <div class="card p-6 sm:p-8 border-t-4 border-realestate-700 lg:order-1 order-2">
          @if (submitted()) {
            <!-- ============ SUCCESS STATE ============ -->
            <div class="text-center py-8 animate-fadeIn">
              <div class="mx-auto w-16 h-16 rounded-full bg-realestate-100 flex items-center justify-center text-realestate-700 text-3xl">
                ✓
              </div>
              <h3 class="mt-5 font-display text-2xl font-bold text-slate-900">Thank you!</h3>
              <p class="mt-2 text-slate-600">
                We've received your real-estate enquiry. Our advisor will reach out shortly.
              </p>
              <button type="button"
                      class="mt-6 btn-realestate"
                      (click)="reset()">
                Submit another enquiry
              </button>
            </div>
          } @else {
            <!-- ============ FORM ============ -->
            <h3 class="font-display text-2xl font-bold text-slate-900">Property enquiry</h3>
            <p class="mt-1 text-sm text-slate-500">All fields marked * are required.</p>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="mt-6 space-y-5" novalidate>
              <!-- Name -->
              <div>
                <label for="rf-name" class="form-label">Full name *</label>
                <input id="rf-name" type="text" formControlName="name"
                       class="form-input" [class.invalid]="hasError('name')"
                       placeholder="e.g. Sita Rao"
                       autocomplete="name" />
                @if (hasError('name')) {
                  <p class="form-error">Please enter your name.</p>
                }
              </div>

              <!-- Email -->
              <div>
                <label for="rf-email" class="form-label">Email *</label>
                <input id="rf-email" type="email" formControlName="email"
                       class="form-input" [class.invalid]="hasError('email')"
                       placeholder="you@example.com"
                       autocomplete="email" />
                @if (form.get('email')?.touched && form.get('email')?.hasError('required')) {
                  <p class="form-error">Email is required.</p>
                } @else if (form.get('email')?.touched && form.get('email')?.hasError('email')) {
                  <p class="form-error">Enter a valid email address.</p>
                }
              </div>

              <!-- Interest (segmented buttons) -->
              <div>
                <label class="form-label">I am interested in *</label>
                <div class="grid grid-cols-3 gap-2">
                  @for (option of interests; track option) {
                    <label class="cursor-pointer">
                      <input type="radio" formControlName="interest" [value]="option"
                             class="peer sr-only" />
                      <span class="block text-center text-sm font-medium px-3 py-2.5 rounded-lg border border-slate-300
                                   peer-checked:bg-realestate-700 peer-checked:text-white peer-checked:border-realestate-700
                                   hover:border-realestate-500 transition-colors">
                        {{ option }}
                      </span>
                    </label>
                  }
                </div>
                @if (hasError('interest')) {
                  <p class="form-error">Please select an option.</p>
                }
              </div>

              <!-- Property Type + Budget -->
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label for="rf-type" class="form-label">Property type *</label>
                  <select id="rf-type" formControlName="propertyType"
                          class="form-input" [class.invalid]="hasError('propertyType')">
                    <option value="" disabled>Select…</option>
                    @for (t of propertyTypes; track t) {
                      <option [value]="t">{{ t }}</option>
                    }
                  </select>
                  @if (hasError('propertyType')) {
                    <p class="form-error">Please choose a property type.</p>
                  }
                </div>

                <div>
                  <label for="rf-budget" class="form-label">Budget range *</label>
                  <select id="rf-budget" formControlName="budgetRange"
                          class="form-input" [class.invalid]="hasError('budgetRange')">
                    <option value="" disabled>Select…</option>
                    @for (b of budgetRanges; track b) {
                      <option [value]="b">{{ b }}</option>
                    }
                  </select>
                  @if (hasError('budgetRange')) {
                    <p class="form-error">Please choose a budget range.</p>
                  }
                </div>
              </div>

              <!-- Submit -->
              <button type="submit"
                      [disabled]="loading()"
                      class="btn-realestate w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                @if (loading()) {
                  <span class="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Submitting…
                } @else {
                  Request Property Details &nbsp;→
                }
              </button>

              <p class="text-xs text-center text-slate-500">
                By submitting, you agree to be contacted regarding your enquiry.
              </p>
            </form>
          }
        </div>

        <!-- Right: pitch -->
        <div class="lg:order-2 order-1">
          <span class="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-realestate-700">
            Real Estate Enquiry
          </span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold mt-3 text-slate-900 leading-tight">
            Find the right plot — or the right buyer.
          </h2>
          <p class="mt-5 text-slate-600 leading-relaxed">
            Open plots, agricultural lands, residential layouts and ready properties.
            Tell us what you're looking for and our advisor will share matching listings within 48 hours.
          </p>

          <ul class="mt-8 space-y-3 text-sm text-slate-700">
            <li class="flex items-start gap-3">
              <span class="mt-1 w-5 h-5 rounded-full bg-realestate-100 text-realestate-700 flex items-center justify-center text-xs font-bold">✓</span>
              Verified titles &amp; transparent pricing
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 w-5 h-5 rounded-full bg-realestate-100 text-realestate-700 flex items-center justify-center text-xs font-bold">✓</span>
              End-to-end documentation &amp; registration support
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 w-5 h-5 rounded-full bg-realestate-100 text-realestate-700 flex items-center justify-center text-xs font-bold">✓</span>
              Honest advice — no pressure tactics
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class RealEstateFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private leads = inject(LeadService);

  protected readonly interests = ['Buy', 'Sell', 'Rent'] as const;
  protected readonly propertyTypes = [
    'Plot',
    'Apartment',
    'Independent House',
    'Commercial',
  ] as const;
  protected readonly budgetRanges = [
    'Under ₹10 Lakh',
    '₹10 – 25 Lakh',
    '₹25 – 50 Lakh',
    '₹50 Lakh – 1 Cr',
    '₹1 Cr – 2 Cr',
    'Above ₹2 Cr',
  ] as const;

  protected loading = signal(false);
  protected submitted = signal(false);

  protected form: FormGroup = this.fb.group({
    name:         ['', [Validators.required, Validators.minLength(2)]],
    email:        ['', [Validators.required, Validators.email]],
    interest:     ['', [Validators.required]],
    propertyType: ['', [Validators.required]],
    budgetRange:  ['', [Validators.required]],
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
    this.leads.submitRealEstateLead(this.form.value as RealEstateLead).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
        this.toast.show({
          title: 'Real-estate enquiry received',
          body: 'Our advisor will share matching listings shortly.',
          variant: 'realestate',
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
    this.form.reset({ interest: '', propertyType: '', budgetRange: '' });
    this.submitted.set(false);
  }
}
