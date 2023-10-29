import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {
  private readonly apiUrl = 'http://localhost:3000/simulations';

  constructor(private http: HttpClient) {}

  simulateLoan(formData: any): Observable<any> {
    console.log(formData)
    const valorSimulado = formData.valorEmprestimo;
    let tipoEmprestimo: string = '';
    switch (formData.loanType) {
      case 1:
          tipoEmprestimo = "Casa";
          break;
      case 2:
          tipoEmprestimo = "Carro";
          break;
      case 3:
          tipoEmprestimo = "Pessoal";
          break;
      default:
          tipoEmprestimo = "Tipo de empréstimo desconhecido";
  }
    const taxaEmprestimo = formData.taxaEmprestimo / 100 / 12;
    const tipoPrazo = formData.tipoPrazo === 'year' ? 12 : 1;
    const meses = formData.prazoEmprestimo * tipoPrazo;

    const jurosPagar = valorSimulado * taxaEmprestimo * meses;
    const valorTotalPagar = valorSimulado + jurosPagar;

    const simulatedData = {
      tipoEmprestimo,
      valorSimulado,
      jurosPagar,
      valorTotalPagar,
    };

    return this.http.post<any>(this.apiUrl, simulatedData);
  }
}
