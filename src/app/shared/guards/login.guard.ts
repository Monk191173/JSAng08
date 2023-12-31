import { CanActivateFn } from '@angular/router';


export const loginGuard: CanActivateFn = (route, state) => {
  if (localStorage.length == 0) { alert('Зареєструйтесь.. !!'); return false };
  if (route.routeConfig?.path == 'admin') {
    if (JSON.parse(localStorage.getItem('curUser') as string).role == 'ADMIN') { return true }
    else { alert('Опа-опа.. !!'); return false }
  }
  else if (route.routeConfig?.path == 'cabinet' || route.routeConfig?.path == 'cabinet/personal') {
    if (JSON.parse(localStorage.getItem('curUser') as string).role == 'USER') { return true }
    else { alert('Опа-опа.. !!'); return false }
  }
  return false
};
