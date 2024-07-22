import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RacunidtlPage } from './racunidtl.page';

describe('RacunidtlPage', () => {
  let component: RacunidtlPage;
  let fixture: ComponentFixture<RacunidtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacunidtlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RacunidtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
