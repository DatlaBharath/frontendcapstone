import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PaymentHistory } from '../payment';
import { PaymentService } from '../payment.service';



interface Payment {
  orderId: string;
  date: string;
  amount: number;
  discription: string;
  status: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {


  pay:PaymentHistory[] = [];
  title = 'Maintenance Fee';
  totalAmount = 12000;

  constructor(private paymentService:PaymentService,private router:Router){}

  payments: Payment[] = [
    // { orderId: '#15267', date: 'Mar 1, 2023', amount: 100, status: 'Success' },
    // { orderId: '#153587', date: 'Jan 26, 2023', amount: 300, status: 'Success' },
    // { orderId: '#12436', date: 'Feb 12, 2023', amount: 100, status: 'Success' },
    // { orderId: '#16879', date: 'Feb 12, 2023', amount: 500, status: 'Rejected' },
    // { orderId: '#16378', date: 'Feb 28, 2023', amount: 500, status: 'Rejected' },
    // { orderId: '#16609', date: 'Mar 13, 2023', amount: 500, status: 'Success' },
    // { orderId: '#16907', date: 'Mar 18, 2023', amount: 100, status: 'Pending' },
    // { orderId: '#16908', date: 'Mar 19, 2023', amount: 1000, status: 'Pending' },
    // { orderId: '#16998', date: 'Mar 30, 2023', amount: 200, status: 'Pending' },
    // { orderId: '#16940', date: 'Apr 18, 2023', amount: 100, status: 'Pending' },
    // { orderId: '#1650', date: 'Jun 20, 2023', amount: 800, status: 'Pending' },
  ];

  showPaymentModal = false;
  paymentHistory: Payment[] = [];
  pendingPayments: Payment[] = [];
  selectedPayment: Payment | null = null;

  ngOnInit(): void {
    this.paymentService.getPaymentsByEmail().subscribe((data)=>{
      this.pay=data;
      console.log(this.pay);
      this.pay.map(p => {
        this.payments.push({orderId : p.id.toString(),date: p.createdAt.slice(0,10),amount:p.amount,discription: p.description,status: p.status})
      })
      this.updatePayments();
    })
  }

  // Filter payments into history and pending
  updatePayments(): void {
    this.paymentHistory = this.payments.filter(payment => payment.status.toLowerCase() != 'pending');
    this.pendingPayments = this.payments.filter(payment => payment.status.toLowerCase() == 'pending');
  }

  viewPaymentHistory(): void {
    this.showPaymentModal = true;
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.selectedPayment = null;
  }

  payNow(payment: Payment, event: Event): void {
    event.stopPropagation(); // Prevent triggering row click event
    // Add logic to handle the payment action
    this.paymentService.createPaymentLink(payment.amount,payment.discription,payment.orderId).subscribe(d => {
      console.log(`Paying now for order: ${payment.orderId}`);
      window.location.href = d;
    })
    
    // Optionally update the payment status to 'Success' or 'Rejected' after the payment is completed
    payment.status = 'Success'; // Update this according to your business logic
    // this.updatePayments(); // Refresh payment lists
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'success':
        return 'text-success';
      case 'rejected':
        return 'text-danger';
      case 'pending':
        return 'text-warning';
      default:
        return '';
    }
  }
}
