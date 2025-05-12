import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleAuthError(error: HttpErrorResponse) {
  let errorMessage = 'Wystąpił nieznany błąd';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Błąd: ${error.error.message}`;
  } else {
    if (error.status === 400 && error.error?.violations) {
      const violations = error.error.violations;
      errorMessage = Object.values(violations).join(', ');
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Kod błędu: ${error.status}, Wiadomość: ${error.message}`;
    }
  }

  return throwError(() => new HttpErrorResponse({
    error: { message: errorMessage },
    status: error.status || 500,
    statusText: error.statusText
  }));
}
