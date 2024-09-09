import React, { useContext } from "react";
import { FormContext } from "../HotelTargetFormWidget";
//
import HotelQuarterForm from "./HotelQuarterForm";
import HotelTargetSubmitForm from "./HotelTargetSubmitForm";

function Step({ propertyName, propertyId, propertyCode }) {
  const { activeStepIndex } = useContext(FormContext);

  let stepContent;
  
  switch (activeStepIndex) {
    case 0:
      stepContent = (
        <HotelQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 1:
      stepContent = (
        <HotelQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 2:
      stepContent = (
        <HotelQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 3:
      stepContent = (
        <HotelQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 4:
      stepContent = (
        <HotelTargetSubmitForm
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

export default Step;
