interface IDateProvider {
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  convertToUTC(date: Date): string;
  compareInDays(start_date: Date, end_date: Date): number;
  compareInHours(start_date: Date, end_date: Date): number;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
