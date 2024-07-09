import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaComponent } from './scheda.component';

describe('SchedaComponent', () => {
  let component: SchedaComponent;
  let fixture: ComponentFixture<SchedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
