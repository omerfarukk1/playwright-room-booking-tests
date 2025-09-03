/**
 * Test Data Models - Type-safe interfaces for all test data
 * Provides structure and validation for test data objects
 */

export interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  title?: string;
  address?: AddressData;
}

export interface AddressData {
  street: string;
  city: string;
  country: string;
  postcode: string;
}

export interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  guestDetails: UserData;
  roomType?: RoomType;
  specialRequests?: string[];
}

export interface RoomData {
  type: RoomType;
  price: number;
  capacity: number;
  features: string[];
  description: string;
}

export interface PricingData {
  roomRate: number;
  cleaningFee: number;
  serviceFee: number;
  taxRate: number;
  total: number;
}

export interface ValidationTestCase {
  name: string;
  description: string;
  formData: Partial<UserData>;
  expectedErrors: string[];
  testType: ValidationTestType;
}

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  category: TestCategory;
  priority: TestPriority;
  data: any;
  expectedOutcome: ExpectedOutcome;
}

// Enums for better type safety
export enum RoomType {
  SINGLE = 'Single Room',
  DOUBLE = 'Double Room',
  SUITE = 'Suite'
}

export enum ValidationTestType {
  SINGLE_FIELD = 'single_field',
  MULTIPLE_FIELDS = 'multiple_fields',
  COMPLETE_FORM = 'complete_form'
}

export enum TestCategory {
  BOOKING_FLOW = 'booking_flow',
  VALIDATION = 'validation',
  PRICING = 'pricing',
  NAVIGATION = 'navigation'
}

export enum TestPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum ExpectedOutcome {
  SUCCESS = 'success',
  VALIDATION_ERROR = 'validation_error',
  BUSINESS_ERROR = 'business_error',
  SYSTEM_ERROR = 'system_error'
}
