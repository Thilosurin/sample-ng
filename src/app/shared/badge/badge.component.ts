import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'c-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() label: string;
  @Input() color: string = 'white';
  @Input() backgroundColor: string = '#486491';
  @Input() padding: string = '10px 20px';
  @Input() border: string = '1px solid #486491';
  @Input() borderRadius: string = '24px';
  @Input() iconSize: string = '0.75rem';
  @Input() iconWeight: string = 'bold';
  @Input() iconColor: string = '#982827';
  @Output() onRemove: EventEmitter<void> = new EventEmitter<void>();
}
