export interface InspectOrderDto {
  id: string;
  code: string;
  totalPrice: number;
  createdAt: string;
  status: string;
  client: string;
  products: { id: string; name: string; price: number; quantity: number }[];
}

export interface ListOrderDto {
  id: string;
  code: string;
  totalPrice: number;
  createdAt: string;
  status: string;
  client: string;
}

export interface IOrderDataSource {
  inspect(id: string): Promise<InspectOrderDto | null>;
  list(): Promise<ListOrderDto[]>;
}
