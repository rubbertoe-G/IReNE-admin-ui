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


  describe('#getCollaborators', () =>{
    it('Observable should return the matched data', () => {
      const expectedResult: CollaboratorMeta[] = [
        {id: 'aq9zI01ORNE9Okyziblp', firstName: 'Roberto', lastName: 'Guzman', email: 'roberto.guzman3@upr.edu', banned: false, approved: true},
        {id: '66BuIJ0kNTYPDGz405qb', firstName: 'Yomar', lastName: 'Ruiz', email: 'yomar.ruiz@upr.edu', banned: false, approved: true},
        {id: 'W0SUHONPhPrkrvL3ruxj', firstName: 'Jainel', lastName: 'Torres', email: 'jainel.torrer@upr.edu', banned: false, approved: true},
        {id: 'zOHEzUyIKZB3LsAiu2Kb', firstName: 'Alberto', lastName: 'Canela', email: 'alberto.canela@upr.edu', banned: false, approved: true},
        {id: '9XIu1jT96A5qz1Kpl90R', firstName: 'Alejandro', lastName: 'Vasquez', email: 'alejandro.vasquez@upr.edu', banned: false, approved: true},
        {id: 'jEFgdhchAjyVhJikg171', firstName: 'Don', lastName: 'Quijote', email: 'don.quijote@upr.edu', banned: true, approved: true},
        {id: 'jEFgdhchAjyVhJikg178', firstName: 'Pepe', lastName: 'Figueroa', email: 'fulano@upr.edu', banned: true, approved: true},
      ];

      collaboratorsService.getCollaborators().add(
        () => {
          expect(collaboratorsService.collaborators).toEqual(expectedResult);
        }
      )
    });
  });

});
