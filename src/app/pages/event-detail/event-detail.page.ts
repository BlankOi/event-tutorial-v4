import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  public currentEvent: any = {};
  public guestName: string;
  public guestPicture: string = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private cameraPlugin: Camera
  ) {}

  ngOnInit() {
    const eventId: string = this.route.snapshot.paramMap.get('id');
    this.eventService.getEventDetail(eventId).on('value', eventSnapshot => {
      this.currentEvent = eventSnapshot.val();
      this.currentEvent.id = eventSnapshot.key;
    });
  }

  addGuest(guestName: string): void {
    this.eventService
      .addGuest(
        guestName,
        this.currentEvent.id,
        this.currentEvent.price,
        this.guestPicture
      )
      .then(() => {
        this.guestName = '';
        this.guestPicture = null;
      });
  }

  async takePicture(): Promise<void> {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      encodingType: this.cameraPlugin.EncodingType.PNG,
    };
    try {
      const profilePicture = await this.cameraPlugin.getPicture(cameraOptions);
      this.guestPicture = profilePicture;
    } catch (error) {
      console.error(error);
    }
  }
}
