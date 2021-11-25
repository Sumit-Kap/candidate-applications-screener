import React from "react";
import RadioInput from "../components/common/RadioInput";
import { appConstants } from "../shared/appConstants";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { parseURL, sortData } from "../shared/utils";
import SearchBar from "./common/Search";
const FilterCard = styled.div`
  padding: 0px 10px;
  justify-content: space-between;
  flex-basis: fit-content;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

const Span = styled.span`
  font-size: 12px;
  padding-left: 10px;
`;
const checkFilterPresent = (filters) => {
  const statusFilter = filters.find((f) =>
    f.includes(appConstants.filters.filterTypes.STATUS)
  );
  const positionAppliedFilter = filters.find((f) =>
    f.includes(appConstants.filters.filterTypes.POSITION_APPLIED)
  );
  const searchFilter = filters.find((f) =>
    f.includes(appConstants.filters.filterTypes.SEARCH)
  );
  return !!statusFilter || !!positionAppliedFilter || !!searchFilter;
};
const Filter = ({ applicants, fetchFilteredData }) => {
  const [positionApplied, setPositionApplied] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const positions = applicants.map((applicant) => applicant.position_applied);
    setPositionApplied(
      positions.filter(
        (position, index, positions) => positions.indexOf(position) === index
      )
    );
    const filterInfo = parseURL(decodeURI(location.search));
    setFilters(filterInfo);
  }, []);

  const checkIfFilterApplied = React.useCallback(
    (filterValue) => {
      const appliedFilter = filters.find((f) => f.includes(filterValue));
      return appliedFilter ? appliedFilter.split("=")[1] : false;
    },
    [filters]
  );
  React.useEffect(() => {
    if (filters.length > 0) {
      navigate(`?${filters.join("&")}`);
    } else {
      navigate("/");
    }
    const applyFilters = filters.filter(
      (f) => !f.includes(appConstants.filters.filterTypes.SORT_BY)
    );
    const data = checkFilterPresent(filters)
      ? applicants.filter((applicant) => {
          return applyFilters.every((f) => {
            if (f.includes(appConstants.filters.filterTypes.STATUS)) {
              return f
                .toLocaleUpperCase()
                .includes(applicant.status.toLocaleUpperCase());
            } else if (
              f.includes(appConstants.filters.filterTypes.POSITION_APPLIED)
            ) {
              return f.includes(applicant.position_applied);
            } else if (f.includes(appConstants.filters.filterTypes.SEARCH)) {
              const searchedText = f.split("=")[1];
              return applicant.name
                .toLocaleUpperCase()
                .includes(searchedText.toLocaleUpperCase());
            }
          });
        })
      : applicants;
    const sortByFilter = filters.findIndex((f) =>
      f.includes(appConstants.filters.filterTypes.SORT_BY)
    );
    fetchFilteredData(
      sortByFilter > -1
        ? sortData(data, filters[sortByFilter].split("=")[1])
        : data
    );
  }, [filters]);

  const clearFilters = () => {
    setFilters([]);
  };
  return (
    <FilterCard data-testid="applicants-filter">
      <h2>
        Filter{" "}
        {filters.length > 0 ? (
          <Span>
            <a href="javascript:void(0)" onClick={clearFilters}>
              Clear Filter
            </a>
          </Span>
        ) : (
          ""
        )}
      </h2>
      <p>
        <SearchBar
          onSearch={(value) => {
            if (value) {
              setFilters([...filters, `search=${value}`]);
            } else {
              return;
            }
          }}
        />
      </p>
      <p>
        <strong>Sort By</strong>
      </p>
      {appConstants &&
        appConstants.filters.sortBy.map((sort, index) => (
          <div key={index}>
            <RadioInput
              label={sort}
              value={sort}
              checked={checkIfFilterApplied(sort)}
              setter={(value) => {
                const index = filters.findIndex((item) =>
                  item.includes(appConstants.filters.filterTypes.SORT_BY)
                );
                if (index > -1) {
                  filters.splice(index, 1);
                  filters.unshift(
                    `${appConstants.filters.filterTypes.SORT_BY}=${value}`
                  );
                  setFilters([...filters]);
                } else {
                  filters.unshift(
                    `${appConstants.filters.filterTypes.SORT_BY}=${value}`
                  );
                  setFilters([...filters]);
                }
              }}
              uniqueKey={index}
            />
          </div>
        ))}
      <p>
        <strong>Status</strong>
      </p>
      {appConstants &&
        appConstants.filters.status.map((state, index) => (
          <div key={index}>
            <RadioInput
              label={state}
              value={state}
              checked={checkIfFilterApplied(state)}
              setter={(value) => {
                const index = filters.findIndex((item) =>
                  item.includes(appConstants.filters.filterTypes.STATUS)
                );
                if (index > -1) {
                  filters.splice(index, 1);
                  filters.unshift(
                    `${appConstants.filters.filterTypes.STATUS}=${value}`
                  );
                  setFilters([...filters]);
                } else {
                  filters.unshift(
                    `${appConstants.filters.filterTypes.STATUS}=${value}`
                  );
                  setFilters([...filters]);
                }
              }}
              uniqueKey={index}
            />
          </div>
        ))}
      <p>
        <strong>Position Applied</strong>
      </p>
      {positionApplied &&
        positionApplied.map((position, index) => (
          <div key={index}>
            <RadioInput
              label={position}
              value={position}
              checked={checkIfFilterApplied(position)}
              setter={(value) => {
                const index = filters.findIndex((item) =>
                  item.includes(
                    appConstants.filters.filterTypes.POSITION_APPLIED
                  )
                );
                if (index > -1) {
                  filters.splice(index, 1);
                  filters.unshift(
                    `${appConstants.filters.filterTypes.POSITION_APPLIED}=${value}`
                  );
                  setFilters([...filters]);
                } else {
                  filters.unshift(
                    `${appConstants.filters.filterTypes.POSITION_APPLIED}=${value}`
                  );
                  setFilters([...filters]);
                }
              }}
            />
          </div>
        ))}
    </FilterCard>
  );
};

export default Filter;
