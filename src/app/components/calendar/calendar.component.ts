import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Output() onDateChange = new EventEmitter<Date>();;

  date: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  changeDate(date: Date) {
    this.date = date
    this.onDateChange.emit(this.date)
  }
}
