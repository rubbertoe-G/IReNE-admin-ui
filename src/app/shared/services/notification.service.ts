import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../components/modals/error-modal/error-modal.component';

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
    private zone: NgZone) { }

  /**
   * Displays a successful message to the user.
   * 
   * @param {string} message message to be shown as successful
   */
  showSuccess(message: string): void {
    this.zone.run(() => {
      // this.snackBar.open(message);
    });
  }

  /**
   * Displays an error message to the user.
   * 
   * @param {string} message message to be shown as an error
   */
  showError(message: string): void {
    this.zone.run(() => {
      // this.snackBar.open(message, 'X', {panelClass: ['error'], duration: 2500});
      this.dialog.open(ErrorModalComponent, {
        data: {
          title: 'ERROR',
          message: message
        }
      })
    });
  }
}