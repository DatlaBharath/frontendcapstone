import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private route:ActivatedRoute,private paymentService:PaymentService){}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      console.log(params.get("razorpay_payment_link_status"))
      if(params.get('razorpay_payment_link_status') == "paid"){
          console.log(params.get("razorpay_payment_link_reference_id"))
          let i = params.get("razorpay_payment_link_reference_id")?.slice(3)
          this.paymentService.changeStatus(i).subscribe(d => console.log(d))
      }// 'id' is the query parameter name
    });
  }

}
