import { TestBed } from '@angular/core/testing';

import { CollaboratorsService } from './collaborators.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { CollaboratorMeta } from '../models/collaborators.model';
import { HttpClientModule } from '@angular/common/http';

describe('CollaboratorsService', () => {
  let httpTestingController: HttpTestingController;
  let collaboratorsService: CollaboratorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollaboratorsService],
      imports: [HttpClientTestingModule, HttpClientModule]
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });


});
