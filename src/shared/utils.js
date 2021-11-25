import { appConstants } from "./appConstants";
export const parseURL = (url) => {
  let extractFilter = [];
  if (url.length > 0) {
    url = url.replace("?", "");
    extractFilter = url.split("&");
  }
  return extractFilter;
};

export const compareExperience = (a, b) => {
  if (a.year_of_experience < b.year_of_experience) {
    return -1;
  }
  if (a.year_of_experience > b.year_of_experience) {
    return 1;
  }
  return 0;
};

export const comparePosition = (a, b) => {
  if (a.position_applied < b.position_applied) {
    return -1;
  }
  if (a.position_applied > b.position_applied) {
    return 1;
  }
  return 0;
};

export const compareDate = (a, b) => {
  return new Date(b.application_date) - new Date(a.application_date);
};

export const sortData = (filterData, sortBy) => {
  switch (sortBy) {
    case appConstants.resources.SORT_BY_POSITION:
      return filterData.sort(comparePosition);
    case appConstants.resources.SORT_BY_YEARS:
      return filterData.sort(compareExperience);
    case appConstants.resources.SORT_BY_DATE:
      return filterData.sort(compareDate);
    default:
      return filterData;
  }
};

export const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
