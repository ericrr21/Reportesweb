import { TestBed } from '@angular/core/testing';

import { PersonaTestService } from './persona-test.service';

describe('PersonaTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonaTestService = TestBed.get(PersonaTestService);
    expect(service).toBeTruthy();
  });
});
