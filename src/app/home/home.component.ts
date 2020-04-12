import { Component, OnInit, Inject } from '@angular/core';
import {Movie} from '../shared/movie'
import {MovieService} from '../services/movie.service'
import {Promotion} from '../shared/promotion'
import {PromotionService} from '../services/promotion.service'
import {Leader} from '../shared/leader'
import {LeaderService} from '../services/leader.service'
import { flyInOut,expand } from '../animations/app.animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]' : 'true',
    'style': 'display: block'
  },
  animations: [
    ,expand(),flyInOut()
  ]
})
export class HomeComponent implements OnInit {
  movie: Movie
  movieErrMess: string

  promotion: Promotion
  promotionErrMess: string

  leader: Leader
  leaderErrMess: string

  routerLinkActive='active'

  constructor(private movieService: MovieService,
    private promotionService: PromotionService,
    private leaderService: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.movieService.getFeaturedmovie().subscribe(
      movie=> this.movie = movie,
      errmess => this.movieErrMess = <any>errmess
    )
    this.promotionService.getFeaturedPromotion().subscribe(
      promotion => this.promotion = promotion,
      errmess => this.promotionErrMess = <any>errmess
    )
    this.leaderService.getFeaturedLeader().subscribe(
      leader => this.leader = leader,
      errmess => this.leaderErrMess = <any> errmess
    )
  }
}
