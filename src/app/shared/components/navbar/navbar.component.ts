import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { filter, map, switchMap, startWith, tap } from 'rxjs/operators';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent { 
  
  router = inject(Router);
  routes = routes.map(route => ({
    path: route.path,
    title: `${route.title ?? 'Indicadores'}`,
  })).filter(route => route.path !== '**');

  pagesTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.router.url),
    map(url =>  this.routes.find(route => `/${route.path}` === url)?.title ?? 'Indicadores')
  );
}
