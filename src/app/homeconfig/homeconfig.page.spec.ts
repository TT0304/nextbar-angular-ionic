import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeconfigPage } from './homeconfig.page';

describe('HomeconfigPage', () => {
  let component: HomeconfigPage;
  let fixture: ComponentFixture<HomeconfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeconfigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeconfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
