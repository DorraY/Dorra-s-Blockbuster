import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { listComponent } from './list.component'
import {FlexLayoutModule} from '@angular/flex-layout'
import {movie} from '../shared/movie'
import { movieService} from '../services/movie.service'
import {movieES} from '../shared/moviees'
import { baseURL} from '../shared/baseurl'
import { Observable, of  } from 'rxjs'
import {MatGridListModule} from '@angular/material/grid-list'
import { MatProgressSpinnerModule   } from '@angular/material/progress-spinner'


describe('listComponent', () => {
  let component: listComponent;
  let fixture: ComponentFixture<listComponent>;

  beforeEach(async(() => {
    const movieServiceStub = {
      getmoviees: function(): Observable<movie[]> {
        return of(movieES)
      }
    }
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{path:'list', component: listComponent}]),
        MatGridListModule,
        MatProgressSpinnerModule
      ],
      declarations: [ listComponent ],
      providers: [
        {provide: movieService, 
        useValue: movieServiceStub},
        {provide: 'BaseURL', useValue: baseURL}
      ]
    })
    .compileComponents()
    const movieService = TestBed.get(movieService)
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('moviees items should be 4',() => {
    expect(component.moviees.length).toBe(4)
    expect(component.moviees[1].name).toBe('Zucchipakoda')
    expect(component.moviees[3].featured).toBeFalsy()
  })
});
