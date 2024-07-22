import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitersPage } from './waiters.page';

describe('WaitersPage', () => {
  let component: WaitersPage;
  let fixture: ComponentFixture<WaitersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
