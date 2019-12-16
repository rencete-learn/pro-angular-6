import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../model/order.model';
import { OrderRepositoryService } from '../model/order-repository.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public orderSent: boolean = false;
  public submitted: boolean = false;

  // public nameFC = new FormControl('', [Validators.required]);
  // public addr1FC = new FormControl('', [Validators.required]);
  // public addr2FC = new FormControl('');
  // public cityFC = new FormControl('', [Validators.required]);
  // public stateFC = new FormControl('');
  // public zipFC = new FormControl('');
  // public countryFC = new FormControl('', [Validators.required]);

  public orderForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    addr1: new FormControl('', [Validators.required]),
    addr2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    zip: new FormControl(''),
    country: new FormControl('', [Validators.required])
  })
  public controls = this.orderForm.controls;

  constructor(
    private order: Order,
    private repository: OrderRepositoryService
  ) { }

  ngOnInit() {
  }

  saveOrder() {
    this.submitted = true;
    if (this.orderForm.valid) {
      this.setOrderFieldsFromForm();
      this.repository.saveOrder(this.order).subscribe(
        order => {
          this.order.clear();
          this.orderSent = true;
          this.submitted = false;
        }
      );
    }
  }

  getErrorMessage(fc: FormControl): string {
    let msg = "Enter a proper value for this field"
    if (fc.hasError('required')) {
      msg = 'You must enter a value';
    } else if (fc.hasError('email')) {
      msg = 'Not a valid email';
    }
    return msg;
  }

  setOrderFieldsFromForm() {
    this.order.name = this.controls.name.value;
    this.order.addr1 = this.controls.addr1.value;
    this.order.addr2 = this.controls.addr2.value;
    this.order.city = this.controls.city.value;
    this.order.state = this.controls.state.value;
    this.order.zip = this.controls.zip.value;
    this.order.country = this.controls.country.value;
  }
}
