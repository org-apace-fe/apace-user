export interface IItems {
  id: number;
  discount: string;
  photo: string;
}

export interface ITopProducts {
  id: number;
  discount: "5%";
  photo: string;
  logo: string;
  name: string;
  description: string;
  category: string;
}

export interface IStore {
  store_name: string;
  description: string;
  instagram_handle: string;
  twitter_handle: null;
  facebook_handle: string;
  store_logo: string;
  feature_image: string;
}

export interface ITopDealStore {
  store_name: string;
  id: number;
  deal_name: string;
  description: string;
  deal_percentage: number;
  store_logo: string;
  feature_image: string;
}
