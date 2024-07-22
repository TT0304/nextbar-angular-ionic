import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderdtlPage } from './orderdtl.page';

describe('OrderdtlPage', () => {
  let component: OrderdtlPage;
  let fixture: ComponentFixture<OrderdtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdtlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderdtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
