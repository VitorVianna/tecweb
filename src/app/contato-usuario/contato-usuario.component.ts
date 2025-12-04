import { Component, inject, OnInit } from '@angular/core';
import { ContatoService } from '../services/contato.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contato } from '../models/contato.model';

@Component({
  selector: 'app-contato-usuario',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './contato-usuario.component.html',
  styleUrl: './contato-usuario.component.css'
})
export class ContatoUsuarioComponent implements OnInit{
  private id = 0;
  private contatoService = inject(ContatoService);
  private route = inject(ActivatedRoute);
  contatos: Contato[] = []

  form = new FormGroup({
    numeroTelefone : new FormControl('',[Validators.required]),
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.contatoService.getContatoUsuario(this.id).subscribe({
      next: (data) => { this.contatos = data ?? [];},
      error: (err) => {alert('Erro ao carregar Endereços: '+err);}
    })
  }

  
  
  // Método para verificar se o formulário é válido
  get isFormValid() {
    return this.form.valid;
  }
}
