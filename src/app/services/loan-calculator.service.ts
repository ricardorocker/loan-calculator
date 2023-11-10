import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  simulateLoan(formData: LoanFormData): Observable<SimulatedData> {
    const { loanAmount, interestAmount, termType, loanTerm, loanType } =
      formData;

    const loanTypeResponse = this.getLoanTypeResponse(loanType);
    const interestPayable = this.calculateInterestPayable(
      loanAmount,
      interestAmount,
      termType,
      loanTerm
    );
    const totalAmountPayable = loanAmount + interestPayable;

    const simulatedData: SimulatedData = {
      loanTypeResponse,
      principal: loanAmount,
      interestPayable,
      totalAmountPayable,
    };

    return this.http.post<SimulatedData>(this.apiUrl, simulatedData);
  }

  private getLoanTypeResponse(loanType: number): string {
    switch (loanType) {
      case 1:
        return 'Home';
      case 2:
        return 'Car';
      case 3:
        return 'Personal';
      default:
        return '';
    }
  }

  private calculateInterestPayable(
    loanAmount: number,
    interestAmount: number,
    termType: string,
    loanTerm: number
  ): number {
    const interestRate = interestAmount / 100 / (termType === 'year' ? 12 : 1);
    const months = loanTerm * (termType === 'year' ? 12 : 1);

    return Math.round(loanAmount * interestRate * months);
  }
}
