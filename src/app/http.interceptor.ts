import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req : HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError((error : HttpErrorResponse)=>{
      console.error(error.error.message)

      if(error.error.messagge != undefined)
        alert(error.error.message);

      return throwError(() => error)
    })
  );
};
