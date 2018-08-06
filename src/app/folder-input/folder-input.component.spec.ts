import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderInputComponent } from './folder-input.component';

describe('FolderInputComponent', () => {
  let component: FolderInputComponent;
  let fixture: ComponentFixture<FolderInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
