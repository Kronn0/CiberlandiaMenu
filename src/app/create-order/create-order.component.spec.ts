import { TestBed, ComponentFixture } from '@angular/core/testing';
import { OrderCreateComponent } from './create-order.component'; // Nombre correcto
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Mock del OrderService
class MockOrderService {
  getFoodOptions() {
    return [
      { name: 'Pizza', category: 'meal' },
      { name: 'Cerveza', category: 'drink' }
    ];
  }
  addOrder() {}
}

// Mock del Router
const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('OrderCreateComponent', () => {
  let component: OrderCreateComponent;
  let fixture: ComponentFixture<OrderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderCreateComponent],
      imports: [FormsModule], // Necesario para ngModel
      providers: [
        { provide: OrderService, useClass: MockOrderService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize food options', () => {
    expect(component.foodOptions.length).toBe(2); // Según el mock
    expect(component.foodOptions[0].name).toBe('Pizza');
  });

  it('should render create order heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Crear Nuevo Pedido');
  });

  it('should call createOrder when button is clicked', () => {
    spyOn(component, 'createOrder');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.createOrder).toHaveBeenCalled();
  });
});
