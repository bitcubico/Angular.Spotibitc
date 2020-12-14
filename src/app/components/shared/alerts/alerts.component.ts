import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html'
})
export class AlertsComponent implements OnInit {

  @Input() alert_type: string;
  @Input() message: string;
  @Input() show_alert: boolean;

  constructor() { this.show_alert = false; }

  ngOnInit(): void {
  }

}
