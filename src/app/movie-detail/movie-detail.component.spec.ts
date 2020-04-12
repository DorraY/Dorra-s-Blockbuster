import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { movieDetailComponent } from './movie-detail.component';

describe('movieDetailComponent', () => {
  let component: movieDetailComponent;
  let fixture: ComponentFixture<movieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ movieDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(movieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
