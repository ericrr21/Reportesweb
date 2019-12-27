import { TestBed } from '@angular/core/testing';

import { OpeningComponentService } from './opening-component.service';

describe('OpeningComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpeningComponentService = TestBed.get(OpeningComponentService);
    expect(service).toBeTruthy();
  });
});
