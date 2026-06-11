export enum UserType {
  Standard = 'Standard',
  Premium = 'Premium',
  Gold = 'Gold',
  Free = 'Free',
}

export enum ProductType {
  Car = 'Car',
  Toy = 'Toy',
  Food = 'Food',
}

export type Discount = number;

export interface AccountDiscountRepository {
  getUserDiscount(userType: UserType): Discount | undefined;
  setUserDiscount(userType: UserType, discount: Discount): void;
  getProductDiscount(userType: UserType, productType: ProductType): Discount | undefined;
  setProductDiscount(userType: UserType, productType: ProductType, discount: Discount): void;
}

type ProductDiscountsByUser = Partial<Record<ProductType, Discount>>;

export class InMemoryAccountDiscountRepository implements AccountDiscountRepository {
  private userDiscounts: Partial<Record<UserType, Discount>>;

  private productDiscounts: Partial<Record<UserType, ProductDiscountsByUser>>;

  constructor(
    userDiscounts: Partial<Record<UserType, Discount>> = {},
    productDiscounts: Partial<Record<UserType, ProductDiscountsByUser>> = {},
  ) {
    this.userDiscounts = { ...userDiscounts };
    this.productDiscounts = { ...productDiscounts };
  }

  getUserDiscount(userType: UserType): Discount | undefined {
    return this.userDiscounts[userType];
  }

  setUserDiscount(userType: UserType, discount: Discount): void {
    this.userDiscounts[userType] = discount;
  }

  getProductDiscount(userType: UserType, productType: ProductType): Discount | undefined {
    return this.productDiscounts[userType]?.[productType];
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: Discount): void {
    this.productDiscounts[userType] = {
      ...this.productDiscounts[userType],
      [productType]: discount,
    };
  }
}

export class AccountService {
  constructor(private readonly repository: AccountDiscountRepository) {}

  getUserDiscount(userType: UserType): Discount {
    this.assertUserType(userType);

    return this.repository.getUserDiscount(userType) ?? 0;
  }

  setUserDiscount(userType: UserType, discount: Discount): void {
    this.assertUserType(userType);
    this.assertDiscount(discount);

    this.repository.setUserDiscount(userType, discount);
  }

  getProductDiscount(userType: UserType, productType: ProductType): Discount {
    this.assertUserType(userType);
    this.assertProductType(productType);

    return this.repository.getProductDiscount(userType, productType) ?? 0;
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: Discount): void {
    this.assertUserType(userType);
    this.assertProductType(productType);
    this.assertDiscount(discount);

    this.repository.setProductDiscount(userType, productType, discount);
  }

  calculateDiscount(userType: UserType, productType: ProductType): Discount {
    return this.getUserDiscount(userType) + this.getProductDiscount(userType, productType);
  }

  private assertDiscount(discount: Discount): void {
    if (!Number.isFinite(discount) || discount < 0) {
      throw new Error('Discount should be a finite non-negative number');
    }
  }

  private assertUserType(userType: UserType): void {
    if (!Object.values(UserType).includes(userType)) {
      throw new Error(`Unknown user type: ${userType}`);
    }
  }

  private assertProductType(productType: ProductType): void {
    if (!Object.values(ProductType).includes(productType)) {
      throw new Error(`Unknown product type: ${productType}`);
    }
  }
}
