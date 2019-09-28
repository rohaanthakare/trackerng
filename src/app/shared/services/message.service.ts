import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public showErrorMessage(message: string, horizontalPosition: any, verticalPosition: any) {
    this.snackBar.open(message, '',{
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: 'error-message',
      duration: 5000
    });
  }

  public showSuccessMessage(message: string, horizontalPosition: any, verticalPosition: any) {
    this.snackBar.open(message, '',{
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: 'success-message',
      duration: 5000
    });
  }
}
