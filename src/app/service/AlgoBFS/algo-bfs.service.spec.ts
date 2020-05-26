import { TestBed } from '@angular/core/testing';

import { AlgoBFSService } from './algo-bfs.service';

describe('AlgoBFSService', () => {
  let service: AlgoBFSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoBFSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
