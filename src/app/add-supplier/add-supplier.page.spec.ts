import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSupplierPage } from './add-supplier.page';

describe('AddSupplierPage', () => {
  let component: AddSupplierPage;
  let fixture: ComponentFixture<AddSupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
