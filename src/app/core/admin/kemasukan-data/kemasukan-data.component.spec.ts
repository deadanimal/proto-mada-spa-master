import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KemasukanDataComponent } from './kemasukan-data.component';

describe('KemasukanDataComponent', () => {
  let component: KemasukanDataComponent;
  let fixture: ComponentFixture<KemasukanDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KemasukanDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KemasukanDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
