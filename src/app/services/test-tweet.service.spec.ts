import { TestBed } from '@angular/core/testing';

import { TestTweetService } from './test-tweet.service';

describe('TestTweetService', () => {
  let service: TestTweetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTweetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
