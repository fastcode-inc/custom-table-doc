import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopUpComponent } from './modal-pop-up.component';

describe('ModalPopUpComponent', () => {
  let component: ModalPopUpComponent;
  let fixture: ComponentFixture<ModalPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
