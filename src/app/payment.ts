export class PaymentRequest {
    id: number;
    amount: number;
    description: string;
    createdAt: string; // You can use Date type if you intend to handle date objects.
  
    constructor(
      id: number,
      amount: number,
      description: string,
      createdAt: string
    ) {
      this.id = id;
      this.amount = amount;
      this.description = description;
      this.createdAt = createdAt;
    }
  }
  
  export class PaymentHistory {
    id: number;
    paymentRequest: PaymentRequest;
    description: string;
    transactionId: string | null;
    amount: number;
    status: string;
    paidBy: string;
    createdAt: string; // You can use Date type if you intend to handle date objects.
  
    constructor(
      id: number,
      paymentRequest: PaymentRequest,
      description: string,
      transactionId: string | null,
      amount: number,
      status: string,
      paidBy: string,
      createdAt: string
    ) {
      this.id = id;
      this.paymentRequest = paymentRequest;
      this.description = description;
      this.transactionId = transactionId;
      this.amount = amount;
      this.status = status;
      this.paidBy = paidBy;
      this.createdAt = createdAt;
    }
  }
  
