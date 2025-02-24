import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Observable } from 'rxjs';

var apiUrl = "https://localhost:7104/";

var httpLink = {
  obterCliente: apiUrl + "api/Cliente/ObterTodos",
  deletarClientePorId: apiUrl + "api/Cliente/GetById",
  salvarCliente: apiUrl + "api/Cliente/incluir"
}

var httpLinkPlanoTelefonia = {
  obterTodosPlano: apiUrl + "api/PlanoTelefonia/ObterTodos",
  obterPlanoPorId: apiUrl + "api/PlanoTelefonia/{id}",
  salvarPlano: apiUrl + "api/PlanoTelefonia/incluir",
  alterarPlanoPorId: apiUrl + "api/PlanoTelefonia/alterar/{id}",
  excluirPlano: apiUrl + "api/PlanoTelefonia/excluir/{id}"
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  // Métodos para Cliente
  public getCliente(): Observable<any> {
    return this.webApiService.get(httpLink.obterCliente);
  }

  public deleteClientePorId(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deletarClientePorId + '?Id=' + model, "");
  }

  public salvarCliente(model: any): Observable<any> {
    return this.webApiService.post(httpLink.salvarCliente, model);
  }

  // Métodos para PlanoTelefonia
  public getTodosPlanos(): Observable<any> {
    return this.webApiService.get(httpLinkPlanoTelefonia.obterTodosPlano);
  }

  public getPlanoPorId(id: string): Observable<any> {
    // Substituindo {id} no link
    const url = httpLinkPlanoTelefonia.obterPlanoPorId.replace("{id}", id);
    return this.webApiService.get(url);
  }

  public salvarPlano(model: any): Observable<any> {
    return this.webApiService.post(httpLinkPlanoTelefonia.salvarPlano, model);
  }

  public alterarPlanoPorId(id: string, model: any): Observable<any> {
    // Substituindo {id} no link
    const url = httpLinkPlanoTelefonia.alterarPlanoPorId.replace("{id}", id);
    return this.webApiService.post(url, model);
  }

  public excluirPlano(id: string): Observable<any> {
    // Substituindo {id} no link
    const url = httpLinkPlanoTelefonia.excluirPlano.replace("{id}", id);
    return this.webApiService.post(url, "");
  }  
}
