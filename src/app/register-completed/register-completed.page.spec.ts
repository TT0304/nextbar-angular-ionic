import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterCompletedPage } from './register-completed.page';

describe('RegisterCompletedPage', () => {
  let component: RegisterCompletedPage;
  let fixture: ComponentFixture<RegisterCompletedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCompletedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
