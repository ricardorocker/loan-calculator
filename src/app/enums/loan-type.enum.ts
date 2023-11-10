export enum LoanType {
  Home = 1,
  Car = 2,
  Personal = 3,
}

export const LoanTypeArray = Object.keys(LoanType)
  .filter((key: any) => !isNaN(Number(LoanType[key])))
  .map((key: any) => ({ value: LoanType[key], label: key }));
