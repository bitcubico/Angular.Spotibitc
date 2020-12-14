import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html'
})
export class AlertsComponent implements OnInit {

  @Input() alert_type: string;
  @Input() message: string;
  @Input() show_alert: boolean;

  constructor(private _activedRoute: ActivatedRoute, 
              private _router: Router) { 
    this.show_alert = false; 
    console.log(this._activedRoute.url['_value'][0].path);
    
  }

  ngOnInit(): void {
  }

  reload(){
    this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this._router.navigate([`${this._activedRoute.url['_value'][0].path}`]);
    });
    // this._router.navigate([`/${this._activedRoute.url['_value'][0].path}`])
  }

}
