import API from "./api"

const DNSCheckerService = {
  getDomainHealths: (searchInput, pageNumber = 1) => {
    return API.get(`/domain-healths?email=${searchInput}&page=${pageNumber}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  postRunNewTest: (data) => {
    return API.post("/domain-healths/run-a-new-test", data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
}

export default DNSCheckerService