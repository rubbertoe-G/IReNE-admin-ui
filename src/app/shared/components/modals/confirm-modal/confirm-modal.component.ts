import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { ForbiddenPasswordValidator } from "src/app/shared/forbiddenPassword.directive"

/**
 * Interface that holds the display data of the dialog to confirm.
*/
export interface DialogData {
  /**
   * Variable that holds the title of the modal.
  */
  title: string;

    /**
   * Variable that holds the message of the modal.
  */
  message: string;
}

/**
 * Component that manages the display of the dialog to confirm.
*/
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  /**
   * Formgroup with the password field to be evaluated.
  */
  passwordForm: FormGroup;

    /**
   * Formgroup with the password field to be evaluated.
   * @param {MatDialogRef<ConfirmModalComponent>} dialogRef The dialog component to be evaluated
   * @param {DialogData} data data of the dialog
   * @param {FormBuilder} formBuilder form builder with the necessary validations
  */
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder) {
      
      this.passwordForm = this.formBuilder.group({
        password: new FormControl('',[
          Validators.required,
          ForbiddenPasswordValidator()
        ])
        
      })
    }

  /**
   * Function to close the dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }

    /**
   * Function to close the dialog
  */
  closeDialogSubmit() {
    this.dialogRef.close(this.passwordForm.value.password);
  }

    /**
   * Function to close the dialog
  */
  closeDialogNoValue(){
    this.dialogRef.close();
  }

}
