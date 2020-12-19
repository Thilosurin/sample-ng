import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TableRoutingService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getCustomer() {
    return this.http.get<any>('assets/customer.json').pipe(
      map((res) => res.data),
      tap((res) => console.log('[res] => ', res))
    );
  }

  gotoPath(path: string): void {
    this.router.navigate([path], { relativeTo: this.route });
  }
}
