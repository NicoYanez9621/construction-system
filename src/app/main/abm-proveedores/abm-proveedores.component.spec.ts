import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmProveedoresComponent } from './abm-proveedores.component';

describe('AbmProveedoresComponent', () => {
  let component: AbmProveedoresComponent;
  let fixture: ComponentFixture<AbmProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmProveedoresComponent]
    });
    fixture = TestBed.createComponent(AbmProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
