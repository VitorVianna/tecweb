import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-lista-usuario',
  imports: [CommonModule],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent implements OnInit{
  private usuarioService = inject(UsuarioService);

  usuarios: Usuario[] = [];
  
  ngOnInit(): void {
    this.usuarioService.get().subscribe({
      next: (data) => {
        this.usuarios = data ?? [];
      },
      error: (erro) => {
        alert("Erro ao buscar usuários: " + erro);
      }
    })
  }

}
