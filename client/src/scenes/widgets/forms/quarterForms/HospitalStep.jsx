import React, { useContext } from "react";
import { FormContext } from "../HospitalTargetFormWidget";
//
import HospitalQuarterForm from "./HospitalQuarterForm";
import HospitalTargetSubmitForm from "./HospitalTargetSubmitForm";

function HospitalStep({ propertyName, propertyId, propertyCode }) {
  const { activeStepIndex } = useContext(FormContext);

  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = (
        <HospitalQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 1:
      stepContent = (
        <HospitalQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 2:
      stepContent = (
        <HospitalQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 3:
      stepContent = (
        <HospitalQuarterForm
          propertyName={propertyName}
          propertyCode={propertyCode}
          propertyId={propertyId}
        />
      );
      break;
    case 4:
      stepContent = (
        <HospitalTargetSubmitForm
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

export default HospitalStep;
