import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("authUser");
  }

  if (token !== null) {
    return next(req.clone({ headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }));
  }
  
  return next(req);
};