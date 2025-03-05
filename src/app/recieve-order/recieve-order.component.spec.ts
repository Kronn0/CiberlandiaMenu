import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveOrderComponent } from './recieve-order.component';

describe('RecieveOrderComponent', () => {
  let component: RecieveOrderComponent;
  let fixture: ComponentFixture<RecieveOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecieveOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieveOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
