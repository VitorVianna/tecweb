import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoUsuarioComponent } from './endereco-usuario.component';

describe('EnderecoUsuarioComponent', () => {
  let component: EnderecoUsuarioComponent;
  let fixture: ComponentFixture<EnderecoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnderecoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
