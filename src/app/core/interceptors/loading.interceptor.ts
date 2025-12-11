import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // On active le loader au début de la requête
  loadingService.show();

  return next(req).pipe(
    // finalize s'exécute quand la requête est finie (succès ou erreur)
    finalize(() => loadingService.hide())
  );
};
