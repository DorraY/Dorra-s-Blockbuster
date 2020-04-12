import { Component, OnInit, Inject } from '@angular/core';
import {Movie} from '../shared/movie'
import { MovieService } from '../services/movie.service'

import {flyInOut,expand} from '../animations/app.animations'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  host: {
    '[@flyInOut]' : 'true',
    'style': 'display: block'

  },
  animations: [
    flyInOut(),expand()
  ]
})
export class ListComponent implements OnInit {

  movies: Movie[]
  errMess: string

  constructor(private movieService: MovieService, 
    @Inject('BaseURL') private BaseURL ) // when u inject a value u use the @Inject decorator
   { }

  ngOnInit() {
    this.movieService.getmovies()
    .subscribe(
      movies=> this.movies = movies,
      errmess=> this.errMess = <any> errmess
      )
  }

}
