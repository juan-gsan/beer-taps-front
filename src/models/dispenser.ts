export interface Dispenser {
  id: number;
  beerName: string;
  flowVolume: number;
  cost: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
  timesUsed: number;
  totalCost: number;
}
