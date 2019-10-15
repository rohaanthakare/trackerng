import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: any;
  @Input() depth: number;
  expanded: boolean;
  constructor() { }

  ngOnInit() {
    if (!this.depth) {
      this.depth = 0;
    }
  }

  onMenuClicked(item) {
    if (item.items && item.items.length) {
      this.expanded = !this.expanded;
    }
  }

}
