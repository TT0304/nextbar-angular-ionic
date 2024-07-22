import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaiterOrdersPage } from './waiter-orders.page';

describe('WaiterOrdersPage', () => {
  let component: WaiterOrdersPage;
  let fixture: ComponentFixture<WaiterOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaiterOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
