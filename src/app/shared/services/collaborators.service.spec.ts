import { TestBed } from '@angular/core/testing';

import { CollaboratorsService } from './collaborators.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

describe('CollaboratorsService', () => {
  let httpTestingController: HttpTestingController;
  let service: CollaboratorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollaboratorsService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCollaborators', () =>{
    it('Observable should return the matched data', () => {
      const mockCollaborator = {
        id: 'aq9zI01ORNE9Okyziblp',
        firstName: 'Roberto',
        lastName: 'Guzman',
        email: 'roberto.guzman3@upr.edu',
        banned: true
      };

      service.getCollaborators()
    });
  });

});
