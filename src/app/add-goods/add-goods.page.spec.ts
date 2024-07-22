import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGoodsPage } from './add-goods.page';

describe('AddGoodsPage', () => {
  let component: AddGoodsPage;
  let fixture: ComponentFixture<AddGoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoodsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
