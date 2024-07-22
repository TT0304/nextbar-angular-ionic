import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddArticlesPage } from './add-articles.page';

describe('AddArticlesPage', () => {
  let component: AddArticlesPage;
  let fixture: ComponentFixture<AddArticlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
