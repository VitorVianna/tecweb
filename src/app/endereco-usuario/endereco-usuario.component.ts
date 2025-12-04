import { Component, inject, OnInit } from '@angular/core';
import { EnderecoService } from '../services/endereco.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnderecoUsuario } from '../models/endereco.model';

@Component({
  selector: 'app-endereco-usuario',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './endereco-usuario.component.html',
  styleUrl: './endereco-usuario.component.css'
})
export class EnderecoUsuarioComponent implements OnInit{
  private id = 0;
  private enderecoService = inject(EnderecoService);
  private route = inject(ActivatedRoute);
  enderecos: EnderecoUsuario[] = []

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.enderecoService.getEnderecoUsuario(this.id).subscribe({
      next: (data) => { this.enderecos = data ?? [];},
      error: (err) => {alert('Erro ao carregar Endereços: '+err);}
    })
  }
  
}
