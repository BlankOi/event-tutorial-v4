import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit() { }

  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventCost: number
  ): void {
    console.log(eventName, eventDate, eventPrice, eventCost);
    this.eventService
      .createEvent(eventName, eventDate, eventPrice, eventCost)
      .then(newEvent => {
        this.router.navigateByUrl('');
      });
  }

}
