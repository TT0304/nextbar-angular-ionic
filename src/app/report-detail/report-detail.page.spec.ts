import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportDetailPage } from './report-detail.page';

describe('ReportDetailPage', () => {
  let component: ReportDetailPage;
  let fixture: ComponentFixture<ReportDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
