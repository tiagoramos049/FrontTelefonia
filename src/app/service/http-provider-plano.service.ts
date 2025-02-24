import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Observable } from 'rxjs';

var apiUrl = "https://localhost:7104/";

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

export class HttpProviderPlanoService {

  constructor(private webApiService: WebApiService) { }

  public getTodosPlanos(): Observable<any> {
    return this.webApiService.get(httpLinkPlanoTelefonia.obterTodosPlano);
  }

  public getPlanoPorId(id: string): Observable<any> {
    const url = httpLinkPlanoTelefonia.obterPlanoPorId.replace("{id}", id);
    return this.webApiService.get(url);
  }

  public salvarPlano(model: any): Observable<any> {
    return this.webApiService.post(httpLinkPlanoTelefonia.salvarPlano, model);
  }

  public alterarPlanoPorId(id: string, model: any): Observable<any> {
    const url = httpLinkPlanoTelefonia.alterarPlanoPorId.replace("{id}", id);
    return this.webApiService.post(url, model);
  }

  public excluirPlano(id: string): Observable<any> {
    const url = httpLinkPlanoTelefonia.excluirPlano.replace("{id}", id);
    return this.webApiService.post(url, "");
  }  
  
}
