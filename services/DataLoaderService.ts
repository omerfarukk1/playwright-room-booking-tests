/**
 * Data Loader Service - External Test Data Management
 * 
 * This service provides centralized access to external test data from JSON files.
 * It implements lazy loading, caching, and type-safe data access patterns.
 */

import { 
  UserData, 
  BookingData, 
  ValidationTestCase, 
  TestScenario,
  RoomData,
  PricingData 
} from '../data/TestDataModels';

// Import test data directly - in a real environment, this would be loaded from file system
import testDataJson from '../data/test-data.json';

export interface ExternalTestData {
  users: {
    validUser: UserData;
    validUser2: UserData;
    specialCharacterUser: UserData;
    minimumValidUser: UserData;
    maximumValidUser: UserData;
  };
  invalidUsers: Record<string, Partial<UserData>>;
  bookings: Record<string, BookingData>;
  rooms: Record<string, RoomData>;
  pricing: Record<string, PricingData>;
  dates: {
    checkIn: string;
    checkOut: string;
    pastDate: string;
    futureDate: string;
    invalidDate: string;
  };
  validation: {
    messages: Record<string, string | string[]>;
    testCases: ValidationTestCase[];
  };
  testScenarios: Record<string, TestScenario>;
  environments: Record<string, {
    baseUrl: string;
    timeout: number;
    retries: number;
  }>;
}

class DataLoaderService {
  private static instance: DataLoaderService;
  private testData: ExternalTestData | null = null;

  private constructor() {
    // Data loaded from imported JSON
  }

  /**
   * Singleton pattern to ensure single instance of data loader
   */
  public static getInstance(): DataLoaderService {
    if (!DataLoaderService.instance) {
      DataLoaderService.instance = new DataLoaderService();
    }
    return DataLoaderService.instance;
  }

  /**
   * Load test data from imported JSON with caching
   */
  public async loadTestData(): Promise<ExternalTestData> {
    if (this.testData) {
      return this.testData;
    }

    try {
      this.testData = testDataJson as unknown as ExternalTestData;
      return this.testData;
    } catch (error) {
      throw new Error(`Failed to load test data: ${error}`);
    }
  }

  /**
   * Get valid user data by key
   */
  public async getValidUser(userKey: keyof ExternalTestData['users']): Promise<UserData> {
    const data = await this.loadTestData();
    return data.users[userKey];
  }

  /**
   * Get invalid user data for validation testing
   */
  public async getInvalidUser(userKey: string): Promise<Partial<UserData>> {
    const data = await this.loadTestData();
    if (!data.invalidUsers[userKey]) {
      throw new Error(`Invalid user data not found for key: ${userKey}`);
    }
    return data.invalidUsers[userKey];
  }

  /**
   * Get booking scenario data
   */
  public async getBookingScenario(scenarioKey: string): Promise<BookingData> {
    const data = await this.loadTestData();
    if (!data.bookings[scenarioKey]) {
      throw new Error(`Booking scenario not found for key: ${scenarioKey}`);
    }
    return data.bookings[scenarioKey];
  }

  /**
   * Get validation test case
   */
  public async getValidationTestCase(caseKey: string): Promise<ValidationTestCase> {
    const data = await this.loadTestData();
    const testCase = data.validation.testCases.find(tc => tc.name.toLowerCase().includes(caseKey.toLowerCase()));
    if (!testCase) {
      throw new Error(`Validation test case not found for key: ${caseKey}`);
    }
    return testCase;
  }

  /**
   * Get test scenario by ID
   */
  public async getTestScenario(scenarioId: string): Promise<TestScenario> {
    const data = await this.loadTestData();
    if (!data.testScenarios[scenarioId]) {
      throw new Error(`Test scenario not found for ID: ${scenarioId}`);
    }
    return data.testScenarios[scenarioId];
  }

  /**
   * Get room data by type
   */
  public async getRoomData(roomKey: string): Promise<RoomData> {
    const data = await this.loadTestData();
    if (!data.rooms[roomKey]) {
      throw new Error(`Room data not found for key: ${roomKey}`);
    }
    return data.rooms[roomKey];
  }

  /**
   * Get pricing data
   */
  public async getPricingData(pricingKey: string): Promise<PricingData> {
    const data = await this.loadTestData();
    if (!data.pricing[pricingKey]) {
      throw new Error(`Pricing data not found for key: ${pricingKey}`);
    }
    return data.pricing[pricingKey];
  }

  /**
   * Get date configuration
   */
  public async getDateConfig(): Promise<ExternalTestData['dates']> {
    const data = await this.loadTestData();
    return data.dates;
  }

  /**
   * Get validation messages
   */
  public async getValidationMessages(): Promise<Record<string, string | string[]>> {
    const data = await this.loadTestData();
    return data.validation.messages;
  }

  /**
   * Get all users for data-driven testing
   */
  public async getAllValidUsers(): Promise<UserData[]> {
    const data = await this.loadTestData();
    return Object.values(data.users);
  }

  /**
   * Get all invalid users for validation testing
   */
  public async getAllInvalidUsers(): Promise<Array<{ key: string; data: Partial<UserData> }>> {
    const data = await this.loadTestData();
    return Object.entries(data.invalidUsers).map(([key, userData]) => ({
      key,
      data: userData
    }));
  }

  /**
   * Get filtered test scenarios by category
   */
  public async getTestScenariosByCategory(category: string): Promise<TestScenario[]> {
    const data = await this.loadTestData();
    return Object.values(data.testScenarios).filter(scenario => 
      scenario.category === category
    );
  }

  /**
   * Get validation test cases by type
   */
  public async getValidationTestCasesByType(testType: string): Promise<ValidationTestCase[]> {
    const data = await this.loadTestData();
    return data.validation.testCases.filter(testCase => 
      testCase.testType === testType
    );
  }

  /**
   * Reload test data (useful for tests that modify data)
   */
  public async reloadTestData(): Promise<ExternalTestData> {
    this.testData = null;
    return this.loadTestData();
  }

  /**
   * Get environment configuration
   */
  public async getEnvironmentConfig(env: string): Promise<{ baseUrl: string; timeout: number; retries: number }> {
    const data = await this.loadTestData();
    if (!data.environments[env]) {
      throw new Error(`Environment configuration not found for: ${env}`);
    }
    return data.environments[env];
  }

  /**
   * Get all available environments
   */
  public async getAvailableEnvironments(): Promise<string[]> {
    const data = await this.loadTestData();
    return Object.keys(data.environments);
  }
}

// Export singleton instance
export const dataLoader = DataLoaderService.getInstance();
