import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router'; 
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]]
  });

  async onSubmit() {
    if (this.form.invalid) {
      return;
    } 

    this.loading.set(true);
    this.error.set(null);

    try{
      const { email, senha } = this.form.getRawValue();
      if(email == null || senha == null) {
        this.error.set('Email e Senha são obrigatórios');
        this.loading.set(false);
        return;
      }
      await this.authService.login({email, senha});
      this.router.navigate(['/lista-usuario']);
    }catch(err:any){
      this.error.set(err.message || 'Erro ao realizar login');
    }finally{
      this.loading.set(false);
    }
  } 

  get redirecionaCadastro(){
    this.router.navigate(['/formulario']);
    return true;
  }
}