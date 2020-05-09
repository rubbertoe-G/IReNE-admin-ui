import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

/**
* Service that manages all the notifications sent to the user.
*/
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

  /**
   * Initializes the necessary objects for the notifications to work
   * 
   * @param {MatSnackBar} snackBar snackbar to be dispatched
   * @param {NgZone} zone an injectable service for executing work inside or outside of the Angular zone
   */  
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private zone: NgZone) { }

  /**
   * Displays a successful message to the user.
   * 
   * @param {string} message message to be shown as successful
   */
  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

    /**
   * Displays an error message to the user.
   * 
   * @param {string} message message to be shown as an error
   * @param {string} title title of error to be shown
   */
  showError(title: string, message: string): void {
    console.log(title)
    this.zone.run(() => {
      this.snackBar.open(message, 'X', {panelClass: ['error'], duration: 2500});
    });
  }
}