import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {


  /**
   * The state of the sidebar
   */
  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Toggle the sidebar of the application.
   */
  sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen;
  }

}
