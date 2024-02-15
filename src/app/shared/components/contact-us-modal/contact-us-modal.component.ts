import { Component, OnInit } from '@angular/core';
import { DialogRef } from "@ngneat/dialog";
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ContactResponse } from "../../models/client-response";

@Component({
  selector: 'app-contact-us-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-us-modal.component.html',
  styleUrl: './contact-us-modal.component.scss'
})
export class ContactUsModalComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message:['']
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  send(): void {
    const data: ContactResponse = {
      email: this.form.get('email')?.value,
      message: this.form.get('message')?.value
    }
    this.dialogRef.close(data);
  }
}
