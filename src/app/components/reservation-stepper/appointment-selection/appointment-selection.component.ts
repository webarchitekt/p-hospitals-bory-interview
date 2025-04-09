import {Component, EventEmitter, Input, model, OnInit, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCalendar, MatCalendarCellClassFunction, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {EndpointsService} from "../../../services/endpoints.service";
import {Slot, SlotsByDate} from "../../../models/slot.interface";
import {MatButtonModule} from "@angular/material/button";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CalendarUtil} from "../../../utils/calendar.util";
import {Doctors} from "../../../models/doctors.interface";
import {RANDOM_DOCTORS} from "../../../../mocks/names";

@Component({
    selector: 'appointment-selection',
    imports: [CommonModule, MatCalendar, MatDatepickerModule, MatCardModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './appointment-selection.component.html',
    styleUrl: './appointment-selection.component.scss',
})
export class AppointmentSelectionComponent implements OnInit {
    @Input() formGroup: FormGroup = new FormGroup({});
    @Output() dateSelected = new EventEmitter<any>();

    @ViewChild('calendar') calendar!: MatCalendar<Date>;

    public selected = model<Date | null>(null);
    public slots: SlotsByDate = {};
    public parseDate: Date[] = [];
    public randomDoctors: Doctors = {name: '', surname: ''};


    constructor(
        public endpointService: EndpointsService,
        public calendarUtil: CalendarUtil,
    ) {}

    get selectedSlots(): Slot[] {
        const selectedDate = this.selected();
        if (!selectedDate) return [];

        const key = this.calendarUtil.formatDateKey(selectedDate);
        return this.slots[key] || [];
    }

    public ngOnInit() {
        this.getAllAvailableSlots();
        this.pickRandomName();
    }

    public getAllAvailableSlots() {
        this.endpointService.getAvailableSlots().pipe().subscribe({
            next: (response: any) => {
                this.slots = response.slots
                    if (this.calendar) {
                        this.calendar.updateTodaysDate();
                    }
                },

            }
        )
    }

    public selectSlot(slot: Slot, dateKey: string) {
        this.formGroup.controls['date'].setValue(dateKey);
        this.formGroup.controls['slot'].setValue(slot.time);
        this.dateSelected.emit({
            date: dateKey,
            slot: slot.time,
            slotId: slot.id
        });
    }

    public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
        if (view !== 'month') return '';

        const rawDates = Object.keys(this.slots);
        const parsedDates = this.calendarUtil.parseSlotKeysToDates(rawDates);

        return this.calendarUtil.shouldHighlightDate(cellDate, parsedDates) ? 'highlight-date' : '';
    };

    public onDateChange() {
        this.formGroup.controls['slot'].reset();
        this.dateSelected.emit('');
    }

    public pickRandomName(): void {
        const index = Math.floor(Math.random() * RANDOM_DOCTORS.length);
        this.randomDoctors = RANDOM_DOCTORS[index];
    }

}
