import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class SkDateAdapter extends NativeDateAdapter {
    override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        return ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So'];
    }

    override getFirstDayOfWeek(): number {
        return 1;
    }
}

