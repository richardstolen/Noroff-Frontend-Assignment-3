import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCataloguePage } from './pokemon-catalogue.page';

describe('PokemonCataloguePage', () => {
  let component: PokemonCataloguePage;
  let fixture: ComponentFixture<PokemonCataloguePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonCataloguePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCataloguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
