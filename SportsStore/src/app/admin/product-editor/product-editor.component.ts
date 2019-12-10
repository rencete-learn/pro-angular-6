import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ProductRepositoryService } from "src/app/model/product-repository.service";
import { Product } from "src/app/model/product.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-product-editor",
  templateUrl: "./product-editor.component.html",
  styleUrls: ["./product-editor.component.css"]
})
export class ProductEditorComponent {
  public editing: boolean = false;
  public product: Product;

  public productForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl('', [Validators.required]),
    }
  );

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private repository: ProductRepositoryService
  ) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    this.product = new Product();
    if (this.editing) {
      Object.assign(this.product,
        repository.getProduct(activeRoute.snapshot.params["id"]));
    }
  }

  saveProduct() {
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl("/admin/main/products");
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
}
