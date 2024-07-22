import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSuppliersPage } from './add-suppliers.page';

describe('AddSuppliersPage', () => {
  let component: AddSuppliersPage;
  let fixture: ComponentFixture<AddSuppliersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSuppliersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSuppliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
