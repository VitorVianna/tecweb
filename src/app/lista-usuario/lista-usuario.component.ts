import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-lista-usuario',
  imports: [CommonModule],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent implements OnInit{
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  usuarios: Usuario[] = [];
  
  ngOnInit(): void {
    this.usuarioService.get().subscribe({
      next: (data) => { this.usuarios = data ?? [];},
      error: (err) => {alert('Erro ao carregar usuários: '+err);}
    });
  }

  abrirEdicao(id: number){
    this.router.navigate(['/edicao-usuario',id]);
  }

  deletarUsuario(id: number, nomeUsuario: string){
    if(confirm('Tem certeza que deseja deletar '+nomeUsuario+'?')){
      this.usuarioService.delete(id);
      this.ngOnInit();
    }
  }

  abrirEnderecos(id: number){
    this.router.navigate(['/endereco-usuario',id]);
  }

  abrirContatos(id: number){
    this.router.navigate(['/contato-usuario',id]);
  }
}
