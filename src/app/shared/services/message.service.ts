import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public showErrorMessage(message: string, horizontal: any, vertical: any) {
    this.snackBar.open(message, '', {
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: 'error-message',
      duration: 5000
    });
  }

  public showSuccessMessage(message: string, horizontal: any, vertical: any) {
    this.snackBar.open(message, '', {
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: 'success-message',
      duration: 5000
    });
  }
}
