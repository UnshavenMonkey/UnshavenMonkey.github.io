import {
  AccountDiscountRepository,
  AccountService,
  Discount,
  InMemoryAccountDiscountRepository,
  ProductType,
  UserType,
} from './account-service';

describe('AccountService', () => {
  let repository: InMemoryAccountDiscountRepository;
  let accountService: AccountService;

  beforeEach(() => {
    repository = new InMemoryAccountDiscountRepository();
    accountService = new AccountService(repository);
  });

  describe('user discounts', () => {
    it.each([
      [UserType.Standard, 3],
      [UserType.Premium, 7],
      [UserType.Gold, 15],
      [UserType.Free, 0],
    ])('sets and reads common discount for %s users', (userType, discount) => {
      accountService.setUserDiscount(userType, discount);

      expect(accountService.getUserDiscount(userType)).toBe(discount);
    });

    it('returns zero common discount when database does not have a value', () => {
      expect(accountService.getUserDiscount(UserType.Standard)).toBe(0);
    });
  });

  describe('product discounts', () => {
    it.each([
      [UserType.Standard, ProductType.Car, 2],
      [UserType.Premium, ProductType.Toy, 5],
      [UserType.Gold, ProductType.Food, 9],
      [UserType.Free, ProductType.Car, 1],
    ])('sets and reads %s discount for %s products', (userType, productType, discount) => {
      accountService.setProductDiscount(userType, productType, discount);

      expect(accountService.getProductDiscount(userType, productType)).toBe(discount);
    });

    it('keeps product discounts separated by user type', () => {
      accountService.setProductDiscount(UserType.Premium, ProductType.Car, 8);
      accountService.setProductDiscount(UserType.Gold, ProductType.Car, 12);

      expect(accountService.getProductDiscount(UserType.Premium, ProductType.Car)).toBe(8);
      expect(accountService.getProductDiscount(UserType.Gold, ProductType.Car)).toBe(12);
    });

    it('returns zero product discount when database does not have a value', () => {
      expect(accountService.getProductDiscount(UserType.Free, ProductType.Food)).toBe(0);
    });
  });

  describe('discount calculation', () => {
    it('sums common user discount and product discount for current user', () => {
      accountService.setUserDiscount(UserType.Gold, 15);
      accountService.setProductDiscount(UserType.Gold, ProductType.Car, 10);

      expect(accountService.calculateDiscount(UserType.Gold, ProductType.Car)).toBe(25);
    });

    it('uses only common discount when product discount is missing', () => {
      accountService.setUserDiscount(UserType.Premium, 7);

      expect(accountService.calculateDiscount(UserType.Premium, ProductType.Food)).toBe(7);
    });

    it('uses only product discount when common user discount is missing', () => {
      accountService.setProductDiscount(UserType.Standard, ProductType.Toy, 4);

      expect(accountService.calculateDiscount(UserType.Standard, ProductType.Toy)).toBe(4);
    });
  });

  describe('database interaction', () => {
    it('writes and reads user discounts through repository interface', () => {
      const fakeRepository = createFakeRepository();
      const service = new AccountService(fakeRepository);

      service.setUserDiscount(UserType.Premium, 6);

      expect(fakeRepository.setUserDiscount).toHaveBeenCalledWith(UserType.Premium, 6);
      expect(service.getUserDiscount(UserType.Premium)).toBe(6);
      expect(fakeRepository.getUserDiscount).toHaveBeenCalledWith(UserType.Premium);
    });

    it('writes and reads product discounts through repository interface', () => {
      const fakeRepository = createFakeRepository();
      const service = new AccountService(fakeRepository);

      service.setProductDiscount(UserType.Gold, ProductType.Food, 11);

      expect(fakeRepository.setProductDiscount).toHaveBeenCalledWith(UserType.Gold, ProductType.Food, 11);
      expect(service.getProductDiscount(UserType.Gold, ProductType.Food)).toBe(11);
      expect(fakeRepository.getProductDiscount).toHaveBeenCalledWith(UserType.Gold, ProductType.Food);
    });
  });

  describe('validation', () => {
    it.each([-1, Number.NaN, Number.POSITIVE_INFINITY])('rejects invalid discount %s', (discount) => {
      expect(() => accountService.setUserDiscount(UserType.Standard, discount)).toThrow(
        'Discount should be a finite non-negative number',
      );
    });

    it('rejects unknown user type at runtime', () => {
      expect(() => accountService.getUserDiscount('Vip' as UserType)).toThrow('Unknown user type: Vip');
    });

    it('rejects unknown product type at runtime', () => {
      expect(() => accountService.getProductDiscount(UserType.Standard, 'Book' as ProductType)).toThrow(
        'Unknown product type: Book',
      );
    });
  });
});

const createFakeRepository = (): jest.Mocked<AccountDiscountRepository> => {
  const userDiscounts: Partial<Record<UserType, Discount>> = {};
  const productDiscounts: Partial<Record<UserType, Partial<Record<ProductType, Discount>>>> = {};

  return {
    getUserDiscount: jest.fn((userType) => userDiscounts[userType]),
    setUserDiscount: jest.fn((userType, discount) => {
      userDiscounts[userType] = discount;
    }),
    getProductDiscount: jest.fn((userType, productType) => productDiscounts[userType]?.[productType]),
    setProductDiscount: jest.fn((userType, productType, discount) => {
      productDiscounts[userType] = {
        ...productDiscounts[userType],
        [productType]: discount,
      };
    }),
  };
};
