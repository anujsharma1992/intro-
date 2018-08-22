import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTempletsComponent } from './email-templets.component';

describe('EmailTempletsComponent', () => {
  let component: EmailTempletsComponent;
  let fixture: ComponentFixture<EmailTempletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTempletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTempletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
