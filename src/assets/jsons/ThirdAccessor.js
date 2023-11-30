import { Country, State } from "country-state-city";

export const getAllCountries = () => {
  const africanCountries = Country.getAllCountries().filter((country) => {
    const africaCodes = [
      "DZ",
      "AO",
      "BJ",
      "BW",
      "BF",
      "BI",
      "CM",
      "CV",
      "CF",
      "TD",
      "KM",
      "CG",
      "CD",
      "DJ",
      "EG",
      "GQ",
      "ER",
      "SZ",
      "ET",
      "GA",
      "GM",
      "GH",
      "GN",
      "GW",
      "CI",
      "KE",
      "LS",
      "LR",
      "LY",
      "MG",
      "MW",
      "ML",
      "MR",
      "MU",
      "YT",
      "MA",
      "MZ",
      "NA",
      "NE",
      "NG",
      "RW",
      "ST",
      "SN",
      "SC",
      "SL",
      "SO",
      "ZA",
      "SS",
      "SD",
      "TZ",
      "TG",
      "TN",
      "UG",
      "EH",
      "ZM",
      "ZW",
    ];
    return africaCodes.includes(country.isoCode);
  });
  return africanCountries.map((item) => ({
    name: item.name,
    value: item.name,
  }));
};

export const getCitysByCountry = (country) => {
  if (country !== null && country !== undefined && country !== "") {
    let crountry_code = Country.getAllCountries().find(
      (item) => item.name === country
    );
    let data = State.getStatesOfCountry(crountry_code?.isoCode).map((item) => ({
      name: item.name,
      value: item.name,
    }));

    if (data.length) {
      return data;
    }

    return [
      {
        name: country,
        value: country,
      },
    ];
  }

  return [];
};
