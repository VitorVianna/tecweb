import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { EnderecoService } from '../services/endereco.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsuarioRequest } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  passwordRules = {
    length: false,
    number: false,
    uppercase: false,
    special: false,
    confirm: false
  };

  emailRules = {
    confirm: false
  }

  //construindo um formulário
  form = new FormGroup({
    nome : new FormControl(''), //campo 'nome'
    email : new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]), //campo 'email'
    senha : new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]), //campo 'senha'
    verificaSenha: new FormControl(''),
    rg: new FormControl(''),
    cpf: new FormControl(''),
    dataNascimento: new FormControl('')
  });

  
  // Método de validação da senha
  validatePassword() {
    const password = this.form.get('senha')?.value ?? '';
    const isValid = this.passwordRegex.test(password);

    
    this.passwordRules.length = password.length >= 8 && password.length <= 16;
    this.passwordRules.number = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
    this.passwordRules.uppercase = /[A-Z]/.test(password);
    this.passwordRules.special = /[^a-zA-Z0-9]/.test(password);

    return isValid;
  }

  validateEmail(){
    const email = this.form.get('email')?.value ?? '';
    const isValid = this.emailRegex.test(email);


    this.emailRules.confirm = isValid;

    return isValid;
  }

  validatePasswordConfirm(){
    const password = this.form.get('senha')?.value ?? '';
    const passwordConfirm = this.form.get('verificaSenha')?.value ?? '';

    this.passwordRules.confirm = password == passwordConfirm;
  }

  //capturar do evento submit
  async onSubmit() {
    if (this.form.valid) {

      const request: UsuarioRequest = {
        nome: this.form.get('nome')?.value ?? '',
        email: this.form.get('email')?.value ?? '',
        dataNascimento: this.form.get('dataNascimento')?.value ?? '',
        rg: this.form.get('rg')?.value ?? '',
        cpf: this.form.get('cpf')?.value ?? '',
        senha: this.form.get('senha')?.value ?? ''
      };

      await this.authService.post(request);
      alert("Usuário cadastrado com sucesso.");
      this.router.navigate(['/login']);
    } else {
      alert("Formulário Inválido.");
    }
  }

  // Método para verificar se o formulário é válido
  get isFormValid() {
    return this.form.valid;
  }
}
