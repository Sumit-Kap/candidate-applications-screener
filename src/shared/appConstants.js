export const appConstants = {
  filters: {
    status: ["Approved", "Rejected", "Waiting"],
    sortBy: ["Position Applied", "Years of experience", "Date of application"],
    filterTypes: {
      POSITION_APPLIED: "positionApplied[]",
      SORT_BY: "sortBy",
      STATUS: "status",
      SEARCH: "search",
    },
  },
  columns: [
    "Name",
    "Email",
    "Age",
    "Years of experience",
    "Position applied",
    "Date of application",
    "Status of the application",
  ],
  resources: {
    SORT_BY_POSITION: "Position Applied",
    SORT_BY_YEARS: "Years of experience",
    SORT_BY_DATE: "Date of application",
  },
};
