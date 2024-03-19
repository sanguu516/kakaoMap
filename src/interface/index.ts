export interface StoreType {
  id?: number;
  name?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  category?: string | null;
  phone?: string | null;
  storeType?: string | null;
  foodCertifyName?: string | null;
}

export interface StoreApiResponse {
  data?: StoreType[];
  page?: number;
  totalPage?: number;
  totalCount?: number;
}

export interface LocationType {
  lat: number;
  lng: number;
  zoom: number;
}

export interface SearchType {
  q?: string;
  district?: string;
}
