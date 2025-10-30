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
      next: (data) => { this.usuarios = data ?? [];},
      error: (err) => {alert('Erro ao carregar usuários: '+err);}
    });
  }

  getUserById(id: number){
    this.usuarioService.getById(id).subscribe({
      next: (data) => { alert("Usuário encontrado: " + JSON.stringify(data));},
      error: (err) => {alert("Erro ao carregar usuário: " + err)}
    })
  }

}
