import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablesPage } from './tables.page';

describe('TablesPage', () => {
  let component: TablesPage;
  let fixture: ComponentFixture<TablesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
