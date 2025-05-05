import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pobierz token z lokalnego magazynu (localStorage)
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    // Jeśli token istnieje, dodaj go do nagłówków żądania
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  
  // Jeśli nie ma tokenu, kontynuuj bez modyfikacji
  return next(req);
};