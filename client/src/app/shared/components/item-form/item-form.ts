import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule, Location } from '@angular/common';
import {
  convenientResourse,
  PageTitle,
  removing,
  routePath,
  ToastClassName,
  validationPattern,
} from '@constants/constants';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ValidationPattern } from '@interfaces/validation-pattern';
import { validationErrorMessage } from '@constants/error-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModal } from '@reusable/modals/confirmation-modal/confirmation-modal';
import { CommonCRUDService } from '@services/common-crud.service';
import { ListItem } from '@interfaces/list-item.interface';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-item-form',
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('1s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
      state(
        'shown',
        style({
          opacity: 1,
        }),
      ),
      state(
        'hidden',
        style({
          opacity: 0,
        }),
      ),
      transition('* => *', [animate('1s')]),
    ]),
  ],
  templateUrl: './item-form.html',
  styleUrl: './item-form.less',
})
export class ItemForm implements OnInit {
  constructor(
    private crudService: CommonCRUDService,
    private toastService: ToastService,
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
  isTranscriptionSkipped!: boolean;
  isTranscriptionShown: boolean = true;
  baseURL: string = convenientResourse.baseURL;
  translationDefaultURL: string = convenientResourse.translationDefaultURL;
  pattern: ValidationPattern = validationPattern;
  item: ListItem | null = null;

  ngOnInit() {
    const currentRoute =
      this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    this.parentRoute = this.route.snapshot.url[0].path;
    this.isNew = currentRoute === routePath.new;
    this.isIrregular = this.parentRoute === routePath.irregular;
    this.isTranscriptionSkipped =
      this.parentRoute === routePath.phrases ||
      this.parentRoute === routePath.separable;
    this.id = this.isNew ? null : currentRoute;
    this.pageTitle = PageTitle[this.parentRoute as keyof typeof PageTitle];
    this.form = this.createForm();
    this.removeTranscriptionControl();
    this.actualizeTranscriptionValidator();
    if (this.id) {
      this.crudService.getById(this.id, this.parentRoute).subscribe({
        next: (resp) => {
          this.item = resp;
        },
        error: (resp) => {
          this.toastService.show({
            text: resp.error.message || resp.statusText || resp,
            className: ToastClassName.error,
          });
        },
        complete: () => this.patchValue(),
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  toggleTranscriptionState(): void {
    this.isTranscriptionShown = !this.isTranscriptionShown;
    if (!this.isTranscriptionShown) {
      this.form.controls['transcription'].setValue('-');
      this.form.controls['transcription'].markAsUntouched();
    } else {
      this.form.controls['transcription'].setValue(this.item?.transcription);
    }
    this.actualizeTranscriptionValidator(true, this.isTranscriptionShown);
  }

  getWord(): string {
    return this.isIrregular
      ? this.form.controls['firstForm'].value
      : this.form.controls['name'].value;
  }

  calculateColspan(): number {
    if (this.isIrregular) {
      return 4;
    }
    return this.isTranscriptionShown && !this.isTranscriptionSkipped ? 3 : 2;
  }

  getPronunciationLink(): string {
    return !!this.getWord()
      ? `${convenientResourse.pronunciationTargetURL}${this.getWord()}`
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

  createFormData(): FormData {
    const formData = new FormData();
    const keys = Object.keys(this.form.controls);
    for (const key of keys) {
      formData.append(key, this.form.controls[key].value);
    }
    return formData;
  }

  patchValue(): void {
    const keys = Object.keys(this.form.controls);
    for (const key of keys) {
      this.form.controls[key].patchValue(this.item![key]);
    }
  }

  onSaveClick(): void {
    this.form.disable();
    if (this.isNew) {
      this.crudService
        .create(this.parentRoute, this.createFormData())
        .subscribe({
          next: (resp) => {
            this.toastService.show({
              text: resp.message,
              className: ToastClassName.success,
              delay: 3000,
            });
          },
          error: (resp) => {
            this.form.enable();
            this.toastService.show({
              text: resp.error.message || resp.statusText || resp,
              className: ToastClassName.error,
            });
          },
          complete: () => this.goBack(),
        });
    } else {
      this.crudService
        .update(this.parentRoute, this.id!, this.createFormData())
        .subscribe({
          next: (resp) => {
            this.toastService.show({
              text: resp.message,
              className: ToastClassName.success,
              delay: 3000,
            });
          },
          error: (resp) => {
            this.form.enable();
            this.toastService.show({
              text: resp.error.message || resp.statusText || resp,
              className: ToastClassName.error,
            });
          },
          complete: () => this.goBack(),
        });
    }
  }

  checkIsEdited(): boolean {
    const keys = this.isTranscriptionShown
      ? Object.keys(this.form.controls)
      : Object.keys(this.form.controls).filter(
          (item) => item !== 'transcription',
        );

    for (const key of keys) {
      if (
        (this.item![key] as string).trim() !==
        this.form.controls[key].value.trim()
      ) {
        return true;
      }
    }
    return false;
  }

  isSaveButtonDisabled(): boolean {
    if (this.isNew) {
      return this.form.invalid || this.form.disabled;
    }
    return this.form.invalid || this.form.disabled || !this.checkIsEdited();
  }

  removeWord(): void {
    this.form.disable();
    this.crudService.delete(this.parentRoute, this.id!).subscribe({
      next: (resp) => {
        this.toastService.show({
          text: resp.message,
          className: ToastClassName.success,
          delay: 3000,
        });
      },
      error: (resp) => {
        this.form.enable();
        this.toastService.show({
          text: resp.error.message || resp.statusText || resp,
          className: ToastClassName.error,
        });
      },
      complete: () => this.goBack(),
    });
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
    const validationArr: Array<
      { errors: ValidationErrors | null } & { isTouched: boolean | undefined }
    > = [];
    const requiredField = 'required';
    const patternError = 'pattern';
    Object.keys(this.form.controls).forEach((key) => {
      validationArr.push({
        isTouched: this.form.get(key)?.touched,
        errors: this.form.get(key)!.errors,
      });
    });
    const errorArr = validationArr
      .filter((item) => item.isTouched)
      .map((item) => item.errors && Object.keys(item.errors))
      .flat();

    const errorMsgLast = errorArr.some((item) => item === patternError)
      ? validationErrorMessage.pattern
      : '';
    const errorMsgFirst =
      errorArr.filter((item) => item === requiredField).length === 1 &&
      !errorMsgLast
        ? validationErrorMessage.required.one
        : errorArr.filter((item) => item === requiredField).length === 0
          ? ''
          : validationErrorMessage.required.all;

    return `${errorMsgFirst}${errorMsgLast}`;
  }

  removeTranscriptionControl(): void {
    if (!this.isTranscriptionSkipped) {
      return;
    }
    if (this.form.contains('transcription')) {
      this.form.removeControl('transcription');
    }
  }

  actualizeTranscriptionValidator(
    isDeep: boolean = false,
    isFieldShown?: boolean,
  ): void {
    if (this.isIrregular) {
      return;
    }
    if (!this.isTranscriptionShown) {
      this.form.controls['transcription'].removeValidators(Validators.required);
      this.form.controls['transcription'].updateValueAndValidity();
      return;
    }

    if (!isDeep) {
      return;
    }

    if (isFieldShown) {
      this.form.controls['transcription'].addValidators(Validators.required);
    } else {
      this.form.controls['transcription'].removeValidators(Validators.required);
    }
    this.form.controls['transcription'].updateValueAndValidity();
  }
}
