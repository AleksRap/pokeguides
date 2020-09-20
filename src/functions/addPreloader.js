import React from "react";
import Preloader from "../components/UI/Preloader/Preloader";

export default function addPreloader(component, data) {
  return data.length
    ? component
    : <Preloader />
}
