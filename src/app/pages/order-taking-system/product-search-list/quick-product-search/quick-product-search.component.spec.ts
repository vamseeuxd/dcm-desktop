import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuickProductSearchComponent} from './quick-product-search.component';

describe('QuickProductSearchComponent', () => {
  let component: QuickProductSearchComponent;
  let fixture: ComponentFixture<QuickProductSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuickProductSearchComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
