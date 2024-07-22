import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RorderPage } from './rorder.page';

describe('RorderPage', () => {
  let component: RorderPage;
  let fixture: ComponentFixture<RorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
