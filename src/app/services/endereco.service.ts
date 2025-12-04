import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable,catchError, throwError } from "rxjs";
import { Endereco, EnderecoUsuario } from "../models/endereco.model";
import { environment } from '../../environments/environments'
import { TokenService } from "./token.service";

@Injectable({ providedIn: 'root'})
export class EnderecoService{

    private http = inject(HttpClient);
    private tokenService = inject(TokenService)

    getEndereco(cep: string): Observable<Endereco>{
        return this.http.get<Endereco>(environment.apiCep+cep+'/json/').pipe(
            catchError(err => {
                console.log("Erro ao buscar CEP", err);
                return throwError(() => new Error("Falha ao buscar CEP."));
            })
        );
    }

    getEnderecoUsuario(idUsuario: number): Observable<EnderecoUsuario[]>{
        const token = this.tokenService.get();
        const headers = new HttpHeaders({
            Authorization: 'Bearer '+token
        });
        return this.http.get<EnderecoUsuario[]>(`${environment.apiContatos}/usuarios/${idUsuario}/enderecos`,{headers});
    }
}