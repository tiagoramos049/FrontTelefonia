import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanotelefoniaComponent } from './planotelefonia.component';

describe('PlanotelefoniaComponent', () => {
  let component: PlanotelefoniaComponent;
  let fixture: ComponentFixture<PlanotelefoniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanotelefoniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanotelefoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
