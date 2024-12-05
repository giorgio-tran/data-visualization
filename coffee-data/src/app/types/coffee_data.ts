export type CoffeeDataFeatures = {
  type: string;
  features: CoffeeDataFeature[];
};

export type CoffeeDataFeature = {
  type: string;
  bbox: number[];
  properties: {
    NAME: string;
    NAME_LONG: string;
    coffee_imports: CoffeeLogistics;
    coffee_exports: CoffeeLogistics;
    coffee_production: CoffeeLogistics;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
};

export type CoffeeLogistics = {
  [key: string]: string;
};
