import React from "react";
import ListTable from "../components/common/Table";
import styled from "styled-components";
import { appConstants } from "../shared/appConstants";
import Loader from "../components/common/Loader";
import Filter from "../components/Filter";
import ErrorBoundary from "../components/common/Error";
const Wrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  width: 100%;
  margin-top: 100px;
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Cards = styled.div`
  padding: 0.75rem;
  height: content;
  margin: 10px;
  justify-content: space-between;
  flex-basis: content;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;
const Homepage = () => {
  const [applicants, setApplicants] = React.useState([]);
  const [filteredApplicants, setFilteredApplicants] = React.useState([]);
  const [error, setError] = React.useState(undefined);
  React.useEffect(() => {
    const getApplicantData = async () => {
      try {
        const apiResponse = await fetch(
          "https://personio-fe-test.herokuapp.com/api/v1/candidates"
        );
        const applicantList = await apiResponse.json();
        const applicants = applicantList.data;
        if (!applicants || applicants.length === 0) {
          setError("No records found");
        } else {
          setApplicants(applicants);
          setFilteredApplicants(applicants);
        }
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    getApplicantData();
  }, []);

  if (error) {
    return <ErrorBoundary>Error in loading the data</ErrorBoundary>;
  }

  if (applicants?.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <Heading>
        <h1>Applicant's Details</h1>
      </Heading>
      <Wrapper>
        <Filter
          applicants={applicants}
          fetchFilteredData={(filteredData) => {
            setFilteredApplicants([...filteredData]);
          }}
        />
        <Cards>
          <ListTable columns={appConstants.columns} data={filteredApplicants} />
        </Cards>
      </Wrapper>
    </>
  );
};

export default Homepage;
