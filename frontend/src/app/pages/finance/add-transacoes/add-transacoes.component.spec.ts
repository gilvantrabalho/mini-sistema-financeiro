import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransacoesComponent } from './add-transacoes.component';

describe('AddTransacoesComponent', () => {
  let component: AddTransacoesComponent;
  let fixture: ComponentFixture<AddTransacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTransacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
