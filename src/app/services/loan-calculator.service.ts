import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanType } from 'src/app/enums/loan-type.enum';

interface LoanFormData {
  loanType: number;
  loanAmount: number;
  interestAmount: number;
  loanTerm: number;
  termType: string;
}

export interface SimulatedData {
  loanTypeResponse: string;
  principal: number;
  interestPayable: number;
  totalAmountPayable: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {
  private readonly apiUrl = 'http://localhost:3000/simulations';

  constructor(private http: HttpClient) {}

  private calculateLoan(formData: LoanFormData): SimulatedData {
    const principal = formData.loanAmount;
    const loanTypeResponse = LoanType[formData.loanType] || '';
    const interestAmount = formData.interestAmount / 100 / 12;
    const termType = formData.termType === 'year' ? 12 : 1;
    const months = formData.loanTerm * termType;

    const interestPayable = Math.round(principal * interestAmount * months);
    const totalAmountPayable = Math.round(principal + interestPayable);

    return {
      loanTypeResponse,
      principal,
      interestPayable,
      totalAmountPayable,
    };
  }

  simulateLoan(formData: LoanFormData): Observable<SimulatedData> {
    const simulatedData = this.calculateLoan(formData);
    return this.http.post<SimulatedData>(this.apiUrl, simulatedData);
  }
}
