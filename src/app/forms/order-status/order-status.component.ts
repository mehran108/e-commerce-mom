import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { ConfigurationService } from 'services/configuration.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  @Input() content;
  public statusList = [];
  public status = '';
  public id = '';
  public is_active='active';
  constructor(
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit() {
    // this.statusList = this.content;
    this.status = this.content['Status'];
    this.id = this.content['Id'];
  }
  UpdateOrderStatus(status){
    this.status=status;
    const model={};
    model['orderId']=this.id;
    model['orderStatus']=this.status;

    this.configService.UpdateOrderStatus(model).subscribe(res => {
      if (res) {
        this.toastr.success('Order Status updated successfully.', 'Order Status');
        this.configService.GetOrderList({}).subscribe(res => {
          
        console.log("res",res);
        });
        this.router.navigate(["order"]);
      }
      else{
        this.toastr.error('Error! Order Status not updated successfully.', 'Order Status');
      }
    });
  }
}
