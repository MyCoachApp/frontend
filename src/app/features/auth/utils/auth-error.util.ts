import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleAuthError(error: HttpErrorResponse) {
  let errorMessage = 'Wystąpił nieznany błąd';
  
  if (error.error instanceof ErrorEvent) {
    // Błąd po stronie klienta
    errorMessage = `Błąd: ${error.error.message}`;
  } else {
    // Błąd po stronie serwera
    if (error.status === 400 && error.error?.violations) {
      // Walidacja Symfony
      const violations = error.error.violations;
      errorMessage = violations.map((v: { message: string }) => v.message).join(', ');
    } else if (error.error?.message) {
      // Standardowy błąd
      errorMessage = error.error.message;
    } else if (error.error?.error) {
      // Alternatywny format błędu
      errorMessage = error.error.error;
    } else {
      // Domyślny komunikat
      errorMessage = `Kod błędu: ${error.status}`;
    }
  }

  return throwError(() => ({
    status: error.status,
    message: errorMessage,
    originalError: error
  }));
}