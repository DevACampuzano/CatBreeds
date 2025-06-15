import axios from "axios";

const theCatApi = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key":
      "live_99Qe4Ppj34NdplyLW67xCV7Ds0oSLKGgcWWYnSzMJY9C0QOu0HUR4azYxWkyW2nr",
  },
  params: {
    api_key:
      "live_99Qe4Ppj34NdplyLW67xCV7Ds0oSLKGgcWWYnSzMJY9C0QOu0HUR4azYxWkyW2nr",
  },
});

export { theCatApi };
