import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/core/message-snack-bar/message-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public showErrorMessage(message: string, horizontal?: any, vertical?: any) {
    const horizontalPos = (horizontal) ? horizontal : 'center';
    const verticalPos = (vertical) ? vertical : 'top';
    this.snackBar.openFromComponent(MessageSnackBarComponent, {
      data: {
        msg: message,
        icon: 'error_outline'
      },
      horizontalPosition: horizontalPos,
      verticalPosition: verticalPos,
      panelClass: 'error-message',
      duration: 5000
    });
  }

  public showSuccessMessage(message: string, horizontal?: any, vertical?: any) {
    const horizontalPos = (horizontal) ? horizontal : 'center';
    const verticalPos = (vertical) ? vertical : 'top';
    this.snackBar.openFromComponent(MessageSnackBarComponent, {
      data: {
        msg: message,
        icon: 'done'
      },
      horizontalPosition: horizontalPos,
      verticalPosition: verticalPos,
      panelClass: 'success-message',
      duration: 5000
    });
  }
}
