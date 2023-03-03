import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectButtonComponent } from './collect-button.component';

describe('CollectButtonComponent', () => {
  let component: CollectButtonComponent;
  let fixture: ComponentFixture<CollectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
