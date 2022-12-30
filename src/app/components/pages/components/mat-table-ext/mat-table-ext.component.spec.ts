import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableExtApiComponent } from './mat-table-ext';

describe('MatTableExtComponent', () => {
  let component: MatTableExtApiComponent;
  let fixture: ComponentFixture<MatTableExtApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableExtApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableExtApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
