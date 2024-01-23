import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot, UrlSegment, convertToParamMap } from '@angular/router';

import { loginGuard } from './login.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

describe('loginGuard', () => {
  let route: ActivatedRoute;
  let router:Router;

  let mockSnapshot:any = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ['url'])
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginGuard(...guardParameters));


  beforeEach(() => {
    localStorage.setItem('curUser',JSON.stringify({role:'USER'}));
    
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule.withRoutes([{path:'cabinet',redirectTo:''}])
      ],
      providers:[
        {ActivatedRoute,useValue:{
          snapshot:{paramMap:convertToParamMap({URL:'/cabinet'})},
        }}
      ]
    });
    route=TestBed.inject(ActivatedRoute);
    router=TestBed.inject(Router);
  });

  afterEach(()=>{
    localStorage.clear();
  })

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('admin role return false',()=>{
    spyOn(router,'navigate');
    const access=executeGuard(route.snapshot,mockSnapshot);
    expect(access).toBeFalse();
  })
});
