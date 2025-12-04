export interface Endereco{
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    numero: number
}

export interface EnderecoUsuario{
    id: number,
    idUsuario: number,
    cep: string,
    rua: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero: number
}