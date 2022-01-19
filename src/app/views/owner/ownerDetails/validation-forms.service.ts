import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    city: '',
    country: {
      required: 'Country is required',
      maxLength: `Country should not exceed 2 characters`
    },
    longitude: '',
    latitude: '',
    fromDate: '',
    toDate: '',
    startTime: '',
    endTime: '',
    weather: '',
    ccy: '',
    price: '',
    airport: '',
    Accommodation: '',
    neededTools: '',
    providedTools: '',
    totalChairs: '',
    availableChairs: '',
    categoryId: '',
    activeStatus: '',
    inactiveStatus: '',
    status: '',
  };

  constructor() {
    this.errorMessages = {
      nameEn: {
        required: 'First name is required',
      },
      lastName: {
        required: 'Last name is required',
      },
      username: {
        required: 'Username is required',
        minLength: `'Username must be ${this.formRules.usernameMin} characters or more`
      },
      fromDate: {
        required: 'From Date is required',
        pattern: '^[0-9]{4}[\/][0-9]{2}[\/][0-9]{2}$',
      },
      email: {
        required: 'required',
        email: 'Invalid email address',
      },
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      },
    };
  }
}
