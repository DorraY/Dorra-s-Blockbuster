import { Component, OnInit, ViewChild, Input , Inject} from '@angular/core'
import { Movie } from '../shared/movie'
import { Params, ActivatedRoute } from '@angular/router'
import {Location} from '@angular/common'
import { MovieService } from '../services/movie.service'
import { switchMap } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import {Comment} from '../shared/comment'

import {visibility, flyInOut,expand} from '../animations/app.animations'


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  animations: [
    visibility(),expand(),flyInOut()
  ],
  host: {
    '[@flyInOut]' : 'true',
    'style': 'display: block'
  }
})
export class MovieDetailComponent implements OnInit {

  movie: Movie
  errMess: string
  movieIds: string[]
  prev: string
  next: string
  @ViewChild('commentFormulaire',{static:true}) commentFormDirective

  commentForm: FormGroup
  Comment : Comment
  movieCopy: Movie
  visibility= 'shown'


  formErrors = {
    'author': '',
    'comment': '',
    'rating': ''
  }

  validationMessages = {
    'author': {
      'required' : 'Your name is required',
      'minlength': 'First name should be 2 characters long at least  ',
      'maxlength': 'First name should not be more than 25 characters long',
      'pattern' : 'Your name should only contain alphabetic characters'
    },
    'Comment': {
      'required': 'Please enter your comment here',
      'minlength': 'Your comment  should be 10 characters long at least',
      'maxlength': 'Your comment should not be more than 600 characters long'
    }
  }

  constructor(private movieService: MovieService,
    private location: Location,
    private route: ActivatedRoute, private fb:FormBuilder, 
    @Inject('BaseURL') private BaseURL) {
     }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
      rating: 5
    })

    this.commentForm.valueChanges.subscribe( data =>  this.onValueChanged(data))
    this.onValueChanged()  //reset form validations
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return}
    const formulaire = this.commentForm
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = ''
        const control = formulaire.get(field)
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] +''
          }
        }
      }
    }
    this.Comment = formulaire.value
  }

  onSubmit() {
    this.Comment = this.commentForm.value
    this.Comment.date = new Date().toISOString()

    this.movieCopy.comments.push(this.Comment)
    this.movieService.putmovie(this.movieCopy).subscribe(
      movie => {
        this.movie = movie
        this.movieCopy = movie
      },
      errMess => { this.movie = null
      this.movieCopy = null
    this.errMess = <any> errMess}
    )

    console.log(this.Comment)
    this.Comment = null
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    })
  }

  ngOnInit() {
      this.createForm()

      this.movieService.getmovieIds()
      .subscribe((movieIds) => this.movieIds = movieIds )
      this.route.params
      .pipe(switchMap((params: Params)=> { this.visibility ='hidden' 
      return this.movieService.getmovie(params['id'])
      }))
      .subscribe(movie => {this.movie= movie 
        this.movieCopy = movie
        this.setPrevNext(movie.id) 
        this.visibility = 'shown'
      },
      errMess => this.errMess = <any>errMess) // snapshot
      }

  setPrevNext(movieId: string) {
    let index = this.movieIds.indexOf(movieId)
    if (index ===this.movieIds.length -1) {
      this.prev = this.movieIds[index -1]
      this.next = this.movieIds[0]
    }
    else if (index === 0) {
      this.prev = this.movieIds[this.movieIds.length - 1]
      this.next = this.movieIds[1]
    }
    else {
      this.prev = this.movieIds[index -1]
      this.next = this.movieIds[index +1]
    }

  }
  goBack():void {
      this.location.back()
  }

}
