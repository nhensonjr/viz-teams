import { TestBed, inject } from '@angular/core/testing';

import { PersonService } from './person.service';
import { createStub } from '../helpers/provide-stub.spec';
import { setupTestBed } from '../helpers/setup-test-bed.spec';

describe('Service', () => {
  setupTestBed({
    providers: [{provide: PersonService, useValue: createStub(PersonService)}]
  });

  it('should be created', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));
});
