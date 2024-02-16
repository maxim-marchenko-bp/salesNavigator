import { Component, OnInit } from '@angular/core';
import { DialogRef } from "@ngneat/dialog";
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

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

  close(submit = false): void {
    this.dialogRef.close(submit ? this.form.getRawValue() : null)
  }

  get emailFormControl() {
    return this.form.get('email')
  }
}
