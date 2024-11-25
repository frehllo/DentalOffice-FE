import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req : HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError((error : HttpErrorResponse)=>{
      console.error(error)

      alert(error.message);

      return throwError(() => error)
    })
  );
};
