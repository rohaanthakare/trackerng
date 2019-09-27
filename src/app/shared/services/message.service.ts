import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public showErrorMessage(message: string, position: string) {
    this.snackBar.open(message, null,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error-message'
    });
  }
}
