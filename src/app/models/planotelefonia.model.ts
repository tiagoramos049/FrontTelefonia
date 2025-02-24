export class PlanoTelefonia {
  id: string; // ou Guid, ou outro tipo conforme necessário
  nome: string;
  preco: number;
  franquiaDados: string;
  minutosLigacao: number;
  clienteId: string | null;
  clientePlanos: any[];

  constructor() {
    this.id = '';  // ou valor adequado para o ID
    this.nome = '';
    this.preco = 0;
    this.franquiaDados = '';
    this.minutosLigacao = 0;
    this.clienteId = null;
    this.clientePlanos = [];
  }
}