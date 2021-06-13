import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { Component, OnInit,Input } from '@angular/core';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public fg: FormGroup;
  public isEdit = false;
  @Input() content;
  categoryList = [];
  public orderList = [];

  constructor(
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,

  ) { }

  ngOnInit() {
    if (this.content && this.content.rowData) {
      //this.isEdit = true;
      this.getOrderList(this.content.rowData.orderId)
     // console.log("orderList",this.content.rowData.orderId);

    }
    console.log(this.content)
  }
  public getOrderList = (OrderId) => {
    this.configService.GetOrderDetails({OrderId:OrderId}).subscribe(res => {
      this.orderList = res;
      //console.log("orderList",this.orderList);
    })
  }

}
