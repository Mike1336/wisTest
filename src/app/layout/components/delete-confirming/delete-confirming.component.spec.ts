import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmingComponent } from './delete-confirming.component';

describe('DeleteConfirmingComponent', () => {
  let component: DeleteConfirmingComponent;
  let fixture: ComponentFixture<DeleteConfirmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
