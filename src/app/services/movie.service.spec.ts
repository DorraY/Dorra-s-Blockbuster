import { TestBed } from '@angular/core/testing';

import { movieService } from './movie.service';

describe('movieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: movieService = TestBed.get(movieService);
    expect(service).toBeTruthy();
  });
});
