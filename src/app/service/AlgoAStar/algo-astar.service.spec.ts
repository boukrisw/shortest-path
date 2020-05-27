import { TestBed } from '@angular/core/testing';

import { AlgoAStarService } from './algo-astar.service';

describe('AlgoAStarService', () => {
  let service: AlgoAStarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoAStarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
