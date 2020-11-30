import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() artists: any[] = [];
  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
  }

}
