import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaiterTablesPage } from './waiter-tables.page';

describe('WaiterTablesPage', () => {
  let component: WaiterTablesPage;
  let fixture: ComponentFixture<WaiterTablesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterTablesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaiterTablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
