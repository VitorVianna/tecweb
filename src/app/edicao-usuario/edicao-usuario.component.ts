import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicao-usuario',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './edicao-usuario.component.html',
  styleUrl: './edicao-usuario.component.css'
})
export class EdicaoUsuarioComponent implements OnInit{
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private id = 0;
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

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getById(this.id).subscribe({
      next: (data) => { 
        this.form.setValue({
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          senha: '',
          verificaSenha:'',
          dataNascimento: data.dataNascimento,
          rg: data.rg
        })
      },
      error: (err) => {alert("Erro ao carregar usuário: " + err)}
    });
  }

  onSubmit(){
    const usuario = {
      nome: this.form.value.nome ?? '',
      email: this.form.value.email ?? '',
      rg: this.form.value.rg ?? '',
      cpf: this.form.value.cpf ?? '',
      senha: this.form.value.senha ?? '',
      dataNascimento: this.form.value.dataNascimento ?? '',
    };
    this.usuarioService.update(this.id, usuario);
    alert("Usuário atualizado com sucesso!");

  }
}
