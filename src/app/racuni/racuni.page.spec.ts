import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RacuniPage } from './racuni.page';

describe('RacuniPage', () => {
  let component: RacuniPage;
  let fixture: ComponentFixture<RacuniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacuniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RacuniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
