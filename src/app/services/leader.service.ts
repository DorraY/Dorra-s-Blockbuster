import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader'
import { resolve } from 'url';
import { of, Observable } from 'rxjs';
import { delay,map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
  }
  getLeader(id : string): Observable <Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
  }
  getFeaturedLeader(): Observable<Leader> {
    // return of(LEADERS.filter((Leader) => 
    // Leader.featured)[0]).pipe(delay(2000))

    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(
      map(Leader=> Leader[0])
    )
  }
}
