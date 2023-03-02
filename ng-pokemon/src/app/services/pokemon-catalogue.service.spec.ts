import { TestBed } from '@angular/core/testing';

import { PokemonCatalogueService } from './pokemon-catalogue.service';

describe('PokemonCatalogueService', () => {
  let service: PokemonCatalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCatalogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
