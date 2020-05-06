import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { ForbiddenPasswordValidator } from "src/app/shared/forbiddenPassword.directive"


export interface DialogData {
  title: string; // Title of the modal
  message: string; // message of the modal
}


@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  passwordForm: FormGroup;

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialogSubmit() {
    this.dialogRef.close(this.passwordForm.value.password);
  }

  closeDialogNoValue(){
    this.dialogRef.close();
  }

}
