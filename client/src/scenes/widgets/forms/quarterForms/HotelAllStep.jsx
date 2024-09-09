import React, { useContext } from "react";
import { FormContext } from "../HotelAllTargetFormWidget";
//

//import HotelQuarterForm from "./HotelQuarterForm";

import HotelTargetSubmitForm from "./HotelTargetSubmitForm";

import HotelAllQuarterForm from "./HotelAllQuarterForm";
import HotelAllTargetSubmitForm from "./HotelAllTargetSubmitForm";


function HotelAllStep({ propertyName, propertyId, propertyCode }) {
  const { activeStepIndex } = useContext(FormContext);

  let stepContent;
  
  switch (activeStepIndex) {
    case 0:
      stepContent = (
        <HotelAllQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 1:
      stepContent = (
        <HotelAllQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 2:
      stepContent = (
        <HotelAllQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 3:
      stepContent = (
        <HotelAllQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 4:
      stepContent = (
        <HotelAllTargetSubmitForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    default:
      break;
  }
  return stepContent;
}

export default HotelAllStep;
