import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environments';
import { LoginRequest, LoginResponse } from "../models/auth.model";
import { TokenService } from "./token.service";
import { firstValueFrom } from "rxjs";
import { UsuarioRequest } from "../models/usuario.model";

@Injectable({ providedIn: 'root'})
export class AuthService{
    private http = inject(HttpClient);
    private token = inject(TokenService);
    private url = environment.apiContatos;

    async login(request: LoginRequest): Promise<string> {
        const urlLogin = this.url + "/auth/login";
        const res = await firstValueFrom(this.http.post<LoginResponse>(urlLogin, request));
        this.token.set(res.token);

        return res.token;
    }

    async post(usuarioRequest: UsuarioRequest){
        const urlPost = this.url + "/auth/register";
        const res = await firstValueFrom(this.http.post(urlPost, usuarioRequest, { observe: 'response'}));
        const status = res.status;

        if(status != 200 && status != 201)
            throw new Error("Falha ao criar usuario.");
    }
}