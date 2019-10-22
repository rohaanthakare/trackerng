import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/core/message-snack-bar/message-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public showErrorMessage(message: string, horizontal: any, vertical: any) {
    this.snackBar.openFromComponent(MessageSnackBarComponent, {
      data: {
        msg: message,
        icon: 'error_outline'
      },
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: 'error-message',
      duration: 5000
    });
  }

  public showSuccessMessage(message: string, horizontal: any, vertical: any) {
    this.snackBar.openFromComponent(MessageSnackBarComponent, {
      data: {
        msg: message,
        icon: 'done'
      },
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: 'success-message',
      duration: 5000
    });
  }
}
