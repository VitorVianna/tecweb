export interface Usuario{
    id: number,
    nome: string,
    email: string,
    dataNascimento: string,
    rg: string,
    cpf: string
}

export interface UsuarioRequest{
    nome: string,
    email: string,
    dataNascimento: string,
    rg: string,
    cpf: string,
    senha: string
}