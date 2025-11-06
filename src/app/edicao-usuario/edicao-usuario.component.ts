import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-usuario',
  imports: [],
  templateUrl: './edicao-usuario.component.html',
  styleUrl: './edicao-usuario.component.css'
})
export class EdicaoUsuarioComponent implements OnInit{
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getById(id).subscribe({
      next: (data) => { alert("Usuário encontrado: " + JSON.stringify(data));},
      error: (err) => {alert("Erro ao carregar usuário: " + err)}
    });
  }
  
}
