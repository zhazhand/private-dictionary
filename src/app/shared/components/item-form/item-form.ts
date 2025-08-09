import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { CommonModule, Location } from "@angular/common";
import {
  convenientResourse,
  PageTitle,
  removing,
  routePath,
  validationPattern,
} from "@constants/constants";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ValidationPattern } from "@interfaces/validation-pattern";
import { validationErrorMessage } from "@constants/error-messages";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModal } from "@reusable/modals/confirmation-modal/confirmation-modal";
import { CommonCRUDService } from "@services/common-crud.service";

@Component({
  selector: "app-item-form",
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger("showHide", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate("1s", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
      transition(":leave", [
        animate("1s", style({ opacity: 0, transform: "translateY(10px)" })),
      ]),
      state(
        "shown",
        style({
          opacity: 1,
        }),
      ),
      state(
        "hidden",
        style({
          opacity: 0,
        }),
      ),
      transition("* => *", [animate("1s")]),
    ]),
  ],
  templateUrl: "./item-form.html",
  styleUrl: "./item-form.less",
})
export class ItemForm implements OnInit {
  constructor(
    private crudService: CommonCRUDService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  private modalService = inject(NgbModal);
  form!: FormGroup;
  id!: string | null;
  parentRoute!: string;
  pageTitle!: string;
  isNew!: boolean;
  isIrregular!: boolean;
  isTranscriptionShown: boolean = true;
  baseURL: string = convenientResourse.baseURL;
  translationDefaultURL: string = convenientResourse.translationDefaultURL;
  pattern: ValidationPattern = validationPattern;

  word: string = "";

  ngOnInit() {
    const currentRoute =
      this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    this.parentRoute = this.route.snapshot.url[0].path;
    this.isNew = currentRoute === routePath.new;
    this.isIrregular = this.parentRoute === routePath.irregular;
    this.id = this.isNew ? null : currentRoute;
    this.pageTitle = PageTitle[this.parentRoute as keyof typeof PageTitle];
    this.form = this.createForm();
    this.actualizeTranscriptionValidator();
  }

  goBack(): void {
    this.location.back();
  }

  isTranscriptionHidden(): boolean {
    return this.parentRoute === routePath.phrases;
  }

  toggleTranscriptionState(): void {
    this.isTranscriptionShown = !this.isTranscriptionShown;
    if (!this.isTranscriptionShown) {
      this.form.controls["transcription"].setValue("");
      this.form.controls["transcription"].markAsUntouched();
    }
    this.actualizeTranscriptionValidator(true, this.isTranscriptionShown);
  }

  getErrorMessage() {
    this.form.controls;
  }

  calculateColspan(): number {
    if (this.isIrregular) {
      return 4;
    }
    return this.isTranscriptionShown ? 3 : 2;
  }

  getPronunciationLink(): string {
    return this.word
      ? `${convenientResourse.pronunciationTargetURL}${this.word}`
      : `${convenientResourse.pronunciationDefaultURL}`;
  }

  createForm(): FormGroup {
    if (this.isIrregular) {
      return new FormGroup({
        firstForm: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.pattern.word),
        ]),
        firstFormTranscription: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.pattern.transcription),
        ]),
        secondForm: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.pattern.word),
        ]),
        secondFormTranscription: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.pattern.transcription),
        ]),
        thirdForm: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.pattern.word),
        ]),
        thirdFormTranscription: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.pattern.transcription),
        ]),
        translation: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.pattern.translation),
        ]),
      });
    }

    return new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.pattern.word),
      ]),
      transcription: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.pattern.transcription),
      ]),
      translation: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.pattern.translation),
      ]),
    });
  }

  onSaveClick(): void {}

  removeWord(): void {
    this.crudService
      .delete(this.parentRoute, this.id!)
      .subscribe((val) => console.log(val));
    this.goBack(); // should rework
  }

  openConfirmationModal(): void {
    const modalRef = this.modalService.open(ConfirmationModal);
    modalRef.componentInstance.word = removing.item.word;
    modalRef.result.then((result) => {
      if (result.confirmation) {
        this.removeWord();
      }
    });
  }

  getFormValidationErrors(): string {
    const validationArr: any[] = [];
    const requiredField = "required";
    const patternError = "pattern";
    Object.keys(this.form.controls).forEach((key) => {
      validationArr.push({
        isToched: this.form.get(key)?.touched,
        errors: this.form.get(key)!.errors,
      });
    });
    const errorArr = validationArr
      .filter((item) => item.isToched)
      .map((item) => item.errors && Object.keys(item.errors))
      .flat();

    const errorMsgLast = errorArr.some((item) => item === patternError)
      ? validationErrorMessage.pattern
      : "";
    const errorMsgFirst =
      errorArr.filter((item) => item === requiredField).length === 1 &&
      !errorMsgLast
        ? validationErrorMessage.required.one
        : errorArr.filter((item) => item === requiredField).length === 0
          ? ""
          : validationErrorMessage.required.all;

    return `${errorMsgFirst}${errorMsgLast}`;
  }

  actualizeTranscriptionValidator(
    isDeep: boolean = false,
    isFieldShown?: boolean,
  ): void {
    if (this.isIrregular) {
      return;
    }
    if (this.isTranscriptionHidden()) {
      this.form.controls["transcription"].removeValidators(Validators.required);
      this.form.controls["transcription"].updateValueAndValidity();
      return;
    }

    if (!isDeep) {
      return;
    }

    if (isFieldShown) {
      this.form.controls["transcription"].addValidators(Validators.required);
    } else {
      this.form.controls["transcription"].removeValidators(Validators.required);
    }
    this.form.controls["transcription"].updateValueAndValidity();
  }
}
