interface ICreateCarDTO {
  name: string;
  description: string;
  category_id: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
}

export { ICreateCarDTO };
