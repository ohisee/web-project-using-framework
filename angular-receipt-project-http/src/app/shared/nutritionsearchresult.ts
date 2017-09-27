export interface Nutrition {
  food_name?: string;
  serving_unit?: string;
  nix_brand_id?: string;
  brand_name_item_name?: string;
  serving_qty?: number;
  nf_calories?: number;
  brand_name?: string;
  uuid?: string;
  region?: number;
  brand_type?: string;
  nix_item_id: string;
  tag_id?: string;
  photo?: {
    thumb: string,
    highres?: string,
  };
}

export interface NutritionSearchResult {
  init?: boolean;
  branded: Nutrition[];
  self?: Nutrition[];
  common: Nutrition[];
}
