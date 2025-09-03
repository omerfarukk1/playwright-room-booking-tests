/**
 * Validation service for form field validation
 * Centralizes validation logic and error message handling
 */
export class ValidationService {
  
  /**
   * Validate firstname field requirements
   */
  static validateFirstname(value: string): ValidationResult {
    const errors: string[] = [];
    
    if (!value || value.trim() === '') {
      errors.push('Firstname should not be blank');
    }
    
    if (value.length < 3 || value.length > 18) {
      errors.push('size must be between 3 and 18');
    }
    
    return new ValidationResult('firstname', errors);
  }

  /**
   * Validate lastname field requirements
   */
  static validateLastname(value: string): ValidationResult {
    const errors: string[] = [];
    
    if (!value || value.trim() === '') {
      errors.push('Lastname should not be blank');
    }
    
    if (value.length < 3 || value.length > 30) {
      errors.push('size must be between 3 and 30');
    }
    
    return new ValidationResult('lastname', errors);
  }

  /**
   * Validate email field requirements
   */
  static validateEmail(value: string): ValidationResult {
    const errors: string[] = [];
    
    if (!value || value.trim() === '') {
      errors.push('must not be empty');
    }
    
    if (value && !this.isValidEmailFormat(value)) {
      errors.push('must be a valid email address');
    }
    
    return new ValidationResult('email', errors);
  }

  /**
   * Validate phone field requirements
   */
  static validatePhone(value: string): ValidationResult {
    const errors: string[] = [];
    
    if (value && (value.length < 11 || value.length > 21)) {
      errors.push('size must be between 11 and 21');
    }
    
    return new ValidationResult('phone', errors);
  }

  /**
   * Validate complete form data
   */
  static validateCompleteForm(formData: FormData): ValidationSummary {
    const results: ValidationResult[] = [
      this.validateFirstname(formData.firstname || ''),
      this.validateLastname(formData.lastname || ''),
      this.validateEmail(formData.email || ''),
      this.validatePhone(formData.phone || '')
    ];
    
    return new ValidationSummary(results);
  }

  /**
   * Check if email format is valid
   */
  private static isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

/**
 * Represents validation result for a single field
 */
export class ValidationResult {
  constructor(
    public readonly fieldName: string,
    public readonly errors: string[]
  ) {}

  get isValid(): boolean {
    return this.errors.length === 0;
  }

  get hasErrors(): boolean {
    return this.errors.length > 0;
  }
}

/**
 * Represents validation summary for entire form
 */
export class ValidationSummary {
  constructor(public readonly results: ValidationResult[]) {}

  get isValid(): boolean {
    return this.results.every(result => result.isValid);
  }

  get allErrors(): string[] {
    return this.results.flatMap(result => result.errors);
  }

  getErrorsForField(fieldName: string): string[] {
    const result = this.results.find(r => r.fieldName === fieldName);
    return result ? result.errors : [];
  }
}

/**
 * Form data interface
 */
export interface FormData {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
}
