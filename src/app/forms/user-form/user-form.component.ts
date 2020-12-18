import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public fg: FormGroup;
  isEdit = false;
  categoryList = [
    {categoryId: 1, categoryName: 'Men'},
    {categoryId: 2, categoryName: 'Women'},
    {categoryId: 3, categoryName: 'Assessories'},
  ];
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService
  ) {
    this.fg = this.fb.group({
      id: [],
      brandName: [''],
      brandDescription: [''],
      isActive: [true]
    })
  }

  onSubmit() {
    const model = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateUser(model).subscribe(res => {
        if (res) {
          this.toastr.success('User updated successfully.', 'User');
          this.activeModal.close();
        } else {
          this.toastr.info('Something went wrong User not updated successfully.', 'User');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong User not updated successfully.', 'User');
        this.activeModal.close();
      });
    } else {
      this.configService.AddUser(model).subscribe(res => {
        if (res) {
          this.toastr.success('User added successfully.', 'User');
          this.activeModal.close();
        } else {
          this.toastr.info('Something went wrong User not added successfully.', 'User');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong User not added successfully.', 'User');
        this.activeModal.close();
      })
    }
  }
  ngOnInit() {
  }

}
