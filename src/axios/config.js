import axios from "axios";

const axiosCustom = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export default axiosCustom;
