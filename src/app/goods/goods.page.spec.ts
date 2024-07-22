import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoodsPage } from './goods.page';

describe('GoodsPage', () => {
  let component: GoodsPage;
  let fixture: ComponentFixture<GoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
