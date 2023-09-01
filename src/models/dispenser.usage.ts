export interface DispenserUsage {
  id: number;
  dispenserId: number;
  startTime: Date;
  endTime: Date;
  amount: number;
  cost: number;
}
