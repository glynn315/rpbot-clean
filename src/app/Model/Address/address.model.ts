export interface BarangayList {
  barangay_list: string[];
}

export interface MunicipalityList {
  [municipality: string]: BarangayList;
}

export interface Province {
  municipality_list: MunicipalityList;
}

export interface ProvinceList {
  [province: string]: Province;
}

export interface Region {
  region_name: string;
  province_list: ProvinceList;
}

export interface AddressData {
  [regionCode: string]: Region;
}
