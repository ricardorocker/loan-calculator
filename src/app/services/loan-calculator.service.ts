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
    const principal = formData.loanAmount;
    let loanTypeResponse: string = '';
    switch (formData.loanType) {
      case 1:
          loanTypeResponse = "Home";
          break;
      case 2:
          loanTypeResponse = "Car";
          break;
      case 3:
          loanTypeResponse = "Personal";
          break;
  }
    const interestAmount = formData.interestAmount / 100 / 12;
    const termType = formData.termType === 'year' ? 12 : 1;
    const months = formData.loanTerm * termType;

    const interestPayable = Math.round(principal * interestAmount * months);
    const totalAmountPayable = Math.round(principal + interestPayable);

    const simulatedData = {
      loanTypeResponse,
      principal,
      interestPayable,
      totalAmountPayable,
    };

    return this.http.post<any>(this.apiUrl, simulatedData);
  }
}
