import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWaiterPage } from './add-waiter.page';

describe('AddWaiterPage', () => {
  let component: AddWaiterPage;
  let fixture: ComponentFixture<AddWaiterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWaiterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWaiterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
