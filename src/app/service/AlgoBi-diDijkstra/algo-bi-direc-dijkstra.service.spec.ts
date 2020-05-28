import { TestBed } from '@angular/core/testing';

import { AlgoBiDirecDijkstraService } from './algo-bi-direc-dijkstra.service';

describe('AlgoBiDirecDijkstraService', () => {
  let service: AlgoBiDirecDijkstraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoBiDirecDijkstraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
