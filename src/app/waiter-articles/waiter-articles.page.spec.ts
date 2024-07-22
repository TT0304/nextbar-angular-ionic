import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaiterArticlesPage } from './waiter-articles.page';

describe('WaiterArticlesPage', () => {
  let component: WaiterArticlesPage;
  let fixture: ComponentFixture<WaiterArticlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterArticlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaiterArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
