
import "./Content.css";

import {Locations} from "../Locations/Locations";
import {Output} from "../Output/Output";

export const Content = () => {
  return (
      <div className="weather__content">
        <Output />
        <Locations />
      </div>
  )
}