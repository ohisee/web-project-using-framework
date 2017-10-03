import { TestBed, inject } from '@angular/core/testing';

import { PosterDataService } from './poster-data.service';

describe('PosterDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PosterDataService]
    });
  });

  it('should be created', inject([PosterDataService], (service: PosterDataService) => {
    expect(service).toBeTruthy();
  }));
});
