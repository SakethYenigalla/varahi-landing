import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface CateringLead {
  name: string;
  email: string;
  eventDate: string;
  guestCount: number;
  eventType: 'Wedding' | 'Corporate' | 'Private';
}

export interface RealEstateLead {
  name: string;
  email: string;
  interest: 'Buy' | 'Sell' | 'Rent';
  propertyType: 'Plot' | 'Apartment' | 'Independent House' | 'Commercial';
  budgetRange: string;
}

/**
 * Lead service — Phase 1 stub.
 *
 * Phase 2 will swap these `of(...)` calls for real HTTP requests
 * to the backend (Firebase / Node API / Forms endpoint).
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  submitCateringLead(payload: CateringLead): Observable<{ ok: true }> {
    console.info('[Lead][Catering] submitted', payload);
    return of({ ok: true as const }).pipe(delay(700));
  }

  submitRealEstateLead(payload: RealEstateLead): Observable<{ ok: true }> {
    console.info('[Lead][RealEstate] submitted', payload);
    return of({ ok: true as const }).pipe(delay(700));
  }
}
