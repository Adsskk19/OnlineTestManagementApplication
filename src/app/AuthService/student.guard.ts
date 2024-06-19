import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtService } from '../services/jwt.service';
import { LocalStorageService } from '../services/local-storage.service';

export const studentGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);
  if(inject(JwtService).getUser()){
    if(inject(JwtService).isTokenExpired()){
      inject(Router).createUrlTree(['/']);
      inject(LocalStorageService).remove('jwt');
    }
    else{
      if(inject(JwtService).isStudent()){
        return true;
      }
      else if(inject(JwtService).isAdmin()){
        localStorage.clear();
        Swal.fire({
          icon:'warning',
          text:'You have been logged out. NO ACCESS to the user page as an admin, login as a user',
          width:'18rem',
          padding:'1rem'
        });
      }
      else if(state.url==='/'){
        localStorage.clear();
      }
    }
  }
  return inject(Router).createUrlTree(['/']);
};
