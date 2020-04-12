import { Injectable } from '@angular/core'
import {Movie} from '../shared/movie'
import {  of, Observable  } from 'rxjs' // of ==> Emit variable amount of values in a sequence and then emits a complete notification.
import {  delay, map, catchError  }  from 'rxjs/operators' // delay the emitting of item from our observable

import {HttpClient, HttpHeaders} from '@angular/common/http'
import {baseURL} from '../shared/baseurl'

import {ProcessHTTPMsgService}  from './process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getmovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(baseURL+ 'movies').pipe(
      catchError(this.processHTTPMsgService.handleError)
    )
    }
  
  getmovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(baseURL + 'movies/' + id).pipe(
      catchError(this.processHTTPMsgService.handleError)
    )
  }
  
  getFeaturedmovie(): Observable<Movie> {
    return this.http.get<Movie[]>(baseURL+ 'movies?featured=true').pipe(
      map(moviees=> moviees[0])).pipe(
        catchError(this.processHTTPMsgService.handleError)
      )
  }

  getmovieIds(): Observable<string[] | any> {
    return this.getmovies().pipe(map(movies => movies.map(movie => movie.id))).pipe(
      catchError(error => error) // because the getmovies() already catches the errorrs 
    )
  }
  putmovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<Movie>(baseURL + 'movies/' + movie.id, movie,
    httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))

  }
}
