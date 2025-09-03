// Test data constants following DRY principles
export const TestData = {
  DATES: {
    CHECK_IN: '01',
    CHECK_OUT: '03',
    EXPECTED_RANGE: '2025-09-01 - 2025-09-02'
  },
  
  VALID_BOOKING: {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '01234567890'
  },
  
  EMPTY_FIRSTNAME: {
    firstname: '',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '01234567890'
  },
  
  EMPTY_EMAIL: {
    firstname: 'John',
    lastname: 'Doe',
    email: '',
    phone: '01234567890'
  },
  
  ALL_EMPTY: {
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  }
};

export const ValidationMessages = {
  FIRSTNAME_BLANK: 'Firstname should not be blank',
  FIRSTNAME_SIZE: 'size must be between 3 and 18',
  LASTNAME_BLANK: 'Lastname should not be blank',
  EMAIL_EMPTY: 'must not be empty',
  
  // Combined validation messages for different scenarios
  EMPTY_FIRSTNAME: [
    'Firstname should not be blank',
    'size must be between 3 and 18'
  ],
  
  EMPTY_EMAIL: [
    'must not be empty'
  ],
  
  ALL_FIELDS_EMPTY: [
    'Firstname should not be blank',
    'size must be between 3 and 18',
    'Lastname should not be blank',
    'must not be empty'
  ]
};

export const Screenshots = {
  BOOKING_FORM_BEFORE: 'booking-form-before-submission.png',
  ALL_FIELDS_EMPTY: 'all-fields-empty-validation-errors.png',
  VALIDATION_CLOSEUP: 'validation-alert-closeup.png'
};
