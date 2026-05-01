import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl, FormBuilder, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';

type ServiceKey = 'catering' | 'plot' | 'house' | 'both';

interface ServiceOption { k: ServiceKey; l: string; }

interface InquiryPayload {
  service: ServiceKey;
  name: string;
  phone: string;
  eventDate: string | null;
  guests: string | null;
  message: string;
}

/**
 * InquiryFormComponent
 * --------------------
 * Single Reactive form matching the Contact form in "Varahi Home Simple.html":
 *   • Pill toggle (Catering / Plot / House / Both) sets the `service` field.
 *   • When `service` is "catering" or "both", reveals Event Date + Guest count.
 *   • Validates name + phone (10-digit India). Email is optional in the design,
 *     but we add a soft validation for any value entered.
 *   • On submit: shows a transient success state + a toast.
 */
@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()"
          class="bg-cream border border-line rounded-xl p-7" novalidate>

      <!-- Service-type pills -->
      <div class="field">
        <label>I'm interested in</label>
        <div class="pill-row">
          @for (opt of serviceOptions; track opt.k) {
            <button type="button"
                    class="pill"
                    [class.active]="form.value.service === opt.k"
                    (click)="setService(opt.k)">
              {{ opt.l }}
            </button>
          }
        </div>
      </div>

      <!-- Name + Phone -->
      <div class="field-row">
        <div class="field">
          <label for="ifName">Name</label>
          <input id="ifName" type="text" formControlName="name"
                 placeholder="Your full name" autocomplete="name" />
          @if (showError('name')) {
            <p class="field-error">Please enter your name.</p>
          }
        </div>
        <div class="field">
          <label for="ifPhone">Phone</label>
          <input id="ifPhone" type="tel" formControlName="phone"
                 placeholder="+91 ..." autocomplete="tel" />
          @if (form.get('phone')?.touched && form.get('phone')?.hasError('required')) {
            <p class="field-error">Phone number is required.</p>
          } @else if (form.get('phone')?.touched && form.get('phone')?.hasError('pattern')) {
            <p class="field-error">Enter a valid 10-digit number.</p>
          }
        </div>
      </div>

      <!-- Conditional: catering details -->
      @if (showCateringFields()) {
        <div class="field-row animate-fadeIn">
          <div class="field">
            <label for="ifDate">Event Date</label>
            <input id="ifDate" type="date" formControlName="eventDate" [min]="today" />
          </div>
          <div class="field">
            <label for="ifGuests">Approx. Guests</label>
            <select id="ifGuests" formControlName="guests">
              <option value="" disabled>Select</option>
              <option>Under 100</option>
              <option>100 – 300</option>
              <option>300 – 700</option>
              <option>700+</option>
            </select>
          </div>
        </div>
      }

      <!-- Message -->
      <div class="field">
        <label for="ifMessage">Message</label>
        <textarea id="ifMessage" formControlName="message"
                  placeholder="Tell us a little about what you need..."></textarea>
      </div>

      <!-- Submit -->
      <button type="submit"
              class="btn-primary w-full justify-center py-3"
              [disabled]="loading()">
        @if (loading()) {
          <span class="inline-block w-4 h-4 border-2 border-white/40 border-t-white
                       rounded-full animate-spin"></span>
          Sending…
        } @else if (submitted()) {
          ✓ Thank you — we'll be in touch
        } @else {
          Send Inquiry
        }
      </button>
    </form>
  `,
})
export class InquiryFormComponent {
  private fb    = inject(FormBuilder);
  private toast = inject(ToastService);

  protected readonly serviceOptions: ServiceOption[] = [
    { k: 'catering', l: 'Catering' },
    { k: 'plot',     l: 'Plot / Land' },
    { k: 'house',    l: 'House' },
    { k: 'both',     l: 'Both' },
  ];

  protected readonly today = new Date().toISOString().split('T')[0];

  protected readonly loading   = signal(false);
  protected readonly submitted = signal(false);

  protected readonly form: FormGroup = this.fb.group({
    service:   ['catering' as ServiceKey, Validators.required],
    name:      ['', [Validators.required, Validators.minLength(2)]],
    phone:     ['', [Validators.required, Validators.pattern(/^[+0-9 ()-]{10,16}$/)]],
    eventDate: [''],
    guests:    [''],
    message:   [''],
  });

  /** Reactive flag: should we show catering-only fields? */
  protected readonly showCateringFields = computed(() => {
    // Read from the form's value — re-evaluates on valueChanges
    const v = this.serviceSig();
    return v === 'catering' || v === 'both';
  });

  // signal that mirrors form.service so showCateringFields() reacts to it
  private readonly serviceSig = signal<ServiceKey>('catering');

  constructor() {
    this.form.get('service')!.valueChanges
      .subscribe((v: ServiceKey) => this.serviceSig.set(v));
  }

  protected setService(k: ServiceKey): void {
    this.form.patchValue({ service: k });
  }

  protected showError(name: string): boolean {
    const c: AbstractControl | null = this.form.get(name);
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

    const payload = this.form.value as InquiryPayload;
    const enriched = {
      ...payload,
      submittedAt: new Date().toISOString(),
      userAgent:   navigator.userAgent,
      pageUrl:     window.location.href,
    };

    void this.sendInquiry(enriched);
  }

  /**
   * POST to the Apps Script endpoint. Uses `text/plain` content-type so the
   * browser treats it as a CORS-simple request (no preflight). Apps Script
   * reads the raw body via `e.postData.contents` regardless of content-type.
   *
   * Falls back to log-only mode when no endpoint is configured.
   */
  private async sendInquiry(payload: object): Promise<void> {
    const url = environment.inquiryEndpoint;
    const isPlaceholder = !url || url.includes('PASTE_YOUR_DEPLOYMENT_ID');

    try {
      if (isPlaceholder) {
        console.info('[Inquiry][dev] no endpoint configured — payload:', payload);
      } else {
        await fetch(url, {
          method: 'POST',
          // Simple-CORS: no preflight, no headers Apps Script can't echo back.
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          // Apps Script web apps don't return CORS headers — opaque response is OK.
          mode: 'no-cors',
          redirect: 'follow',
        });
      }

      this.loading.set(false);
      this.submitted.set(true);
      this.toast.show({
        title: 'Inquiry received',
        body: "We'll be in touch within a few hours.",
        variant: 'success',
      });
      setTimeout(() => this.submitted.set(false), 4000);
    } catch (err) {
      console.error('[Inquiry] submit failed', err);
      this.loading.set(false);
      this.toast.show({
        title: "Couldn't send inquiry",
        body: 'Please try again, or call us directly at +91 77992 46666.',
        variant: 'error',
      });
    }
  }
}
