import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CalendarUtil {
    public formatDateKey(date: Date | null): string {
        if (!date) return '';
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    }

    public filterDates = (date: Date | null): boolean => {
        if (!date) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return date >= today;
    };

    public datesAreEqual(a: Date, b: Date): boolean {
        return (
            a.getDate() === b.getDate() &&
            a.getMonth() === b.getMonth() &&
            a.getFullYear() === b.getFullYear()
        );
    }

    public getTodayWithoutTime(): Date {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }

    public parseSlotKeysToDates(slotKeys: string[]): Date[] {
        return slotKeys.map(dateStr => {
            const [day, month, year] = dateStr.split('/').map(Number);
            return new Date(year, month - 1, day);
        });
    }

    public shouldHighlightDate(cellDate: Date, availableDates: Date[]): boolean {
        const today = this.getTodayWithoutTime();

        const match = availableDates.find(d => this.datesAreEqual(d, cellDate));

        return !!match && cellDate >= today;
    }

    public skFormatDate(input: string): string {
        if (!input) return '';

        const parts = input.split('/');
        if (parts.length !== 3) return '';

        const [day, month, year] = parts;
        const date = new Date(Number(year), Number(month) - 1, Number(day));

        if (isNaN(date.getTime())) return '';

        return new Intl.DateTimeFormat('sk-SK', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    }
}