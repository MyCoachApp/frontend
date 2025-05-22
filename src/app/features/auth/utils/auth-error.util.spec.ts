import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { handleAuthError } from './auth-error.util';

describe('handleAuthError', () => {
  it('should handle client side error (ErrorEvent)', (done) => {
    const clientError = new HttpErrorResponse({
      error: new ErrorEvent('Network error', { message: 'Client failed' }),
      status: 0
    });

    handleAuthError(clientError).pipe(take(1)).subscribe({
      error: (err) => {
        expect(err.message).toBe('Błąd: Client failed');
        expect(err.status).toBe(0);
        expect(err.originalError).toBe(clientError);
        done();
      }
    });
  });

  it('should handle Symfony validation errors', (done) => {
    const serverError = new HttpErrorResponse({
      error: { violations: [{ message: 'Pole jest wymagane' }, { message: 'Niepoprawny format' }] },
      status: 400
    });

    handleAuthError(serverError).pipe(take(1)).subscribe({
      error: (err) => {
        expect(err.message).toBe('Pole jest wymagane, Niepoprawny format');
        expect(err.status).toBe(400);
        expect(err.originalError).toBe(serverError);
        done();
      }
    });
  });

  it('should handle standard server error with message', (done) => {
    const serverError = new HttpErrorResponse({
      error: { message: 'Nieautoryzowany dostęp' },
      status: 401
    });

    handleAuthError(serverError).pipe(take(1)).subscribe({
      error: (err) => {
        expect(err.message).toBe('Nieautoryzowany dostęp');
        expect(err.status).toBe(401);
        expect(err.originalError).toBe(serverError);
        done();
      }
    });
  });

  it('should handle alternative error format with error property', (done) => {
    const serverError = new HttpErrorResponse({
      error: { error: 'Serwer nie odpowiada' },
      status: 500
    });

    handleAuthError(serverError).pipe(take(1)).subscribe({
      error: (err) => {
        expect(err.message).toBe('Serwer nie odpowiada');
        expect(err.status).toBe(500);
        expect(err.originalError).toBe(serverError);
        done();
      }
    });
  });

  it('should handle unknown errors with default message', (done) => {
    const serverError = new HttpErrorResponse({
      error: {},
      status: 404
    });

    handleAuthError(serverError).pipe(take(1)).subscribe({
      error: (err) => {
        expect(err.message).toBe('Kod błędu: 404');
        expect(err.status).toBe(404);
        expect(err.originalError).toBe(serverError);
        done();
      }
    });
  });
});
