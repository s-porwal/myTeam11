import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import * as moment from "moment";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  date;
  form: FormGroup;
  states = [
    { id: "1", name: "Rajasthan" },
    { id: "2", name: "Gujarat" },
    { id: "3", name: "Kerala" }
  ];
  hasUnderAge = false;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      gender: ["", Validators.required],
      state: ["", Validators.required],
      dob: ["", [Validators.required]]
    });

    this.date = this.datePipe.transform(
      this.form.get("dob").value,
      "yyyy-MM-dd"
    );
  }

  verifyAge() {
    if (moment().diff(this.form.value.dob, "years") < 18) {
      return (this.hasUnderAge = true);
    }
    return (this.hasUnderAge = false);

    // return (control: AbstractControl): { [key: string]: boolean } | null => {
    //   console.log(this.date);
    //   if (moment().diff(this.date, "years") < 18) {
    //     return { UnderAge: true };
    //   }
    //   return null;
    // };
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
