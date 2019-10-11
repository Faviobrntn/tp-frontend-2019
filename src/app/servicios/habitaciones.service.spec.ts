import { TestBed } from '@angular/core/testing';

import { HabitacionesService } from './habitaciones.service';

describe('HabitacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HabitacionesService = TestBed.get(HabitacionesService);
    expect(service).toBeTruthy();
  });
});
