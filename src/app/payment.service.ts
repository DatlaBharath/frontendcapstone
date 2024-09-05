import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentHistory } from './payment';
import { StorageService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  private baseUrl = 'http://localhost:7777/payments';

  constructor(private http: HttpClient,private storageService: StorageService) { }

  changeStatus(id:any): Observable<any>{
    const url = `${this.baseUrl}/change?id=${id}`
    return this.http.put<any>(url,null,{headers : this.storageService.getAuthHeader()})
  }
  // Method to fetch payment history by email
  getPaymentsByEmail(): Observable<any> {
    const url = `${this.baseUrl}/fetch/${this.storageService.get("user").email}`;
    return this.http.get<any>(url,{headers : this.storageService.getAuthHeader()});
  }

  // Method to create a new payment request
  createPaymentRequest(amount: number, description: string): Observable<any> {
    const url = `${this.baseUrl}/requests`;
    const body = {
      amount: amount,
      description: description
    };
    
    return this.http.post<any>(url, body, { headers : this.storageService.getAuthHeader() });
  }

    // Method to create a payment link
    createPaymentLink(amount: number, description: string,id : string): Observable<string> {
      const url = `${this.baseUrl}/create`;
      const params = new HttpParams()
        .set('amount', amount.toString())
        .set('description', description)
        .set('email', this.storageService.get("user").email)
        .set('id',id);
  
      return this.http.post<string>(url, null, { params ,headers : this.storageService.getAuthHeader(), responseType: 'text' as 'json' });
    }



}
