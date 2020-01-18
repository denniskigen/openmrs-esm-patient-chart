import React from "react";
import { getPatientAllergyByPatientUuid } from "./allergy-intolerance.resource";
import { render, cleanup, wait } from "@testing-library/react";
import { BrowserRouter, match } from "react-router-dom";
import { AllergyCardLevelThree } from "./allergy-card-level-three.component";
import { useCurrentPatient } from "../../../__mocks__/openmrs-esm-api.mock";
import { patient, mockAllergyResult } from "../../../__mocks__/allergy.mock";

const mockGetPatientAllergyByPatientUuid = getPatientAllergyByPatientUuid as jest.Mock;
const mockUseCurrentPatient = useCurrentPatient as jest.Mock;

jest.mock("./allergy-intolerance.resource", () => ({
  getPatientAllergyByPatientUuid: jest.fn()
}));

jest.mock("@openmrs/esm-api", () => ({
  useCurrentPatient: jest.fn()
}));

describe("<AllergyCardLevelThree />", () => {
  let match: match = { params: {}, isExact: false, path: "/", url: "/" };
  let wrapper: any;

  afterEach(cleanup);
  beforeEach(mockGetPatientAllergyByPatientUuid.mockReset);
  beforeEach(mockUseCurrentPatient.mockReset);

  it("renders without dying", async () => {
    mockUseCurrentPatient.mockReturnValue([false, patient, patient.id, null]);
    mockGetPatientAllergyByPatientUuid.mockReturnValue(
      Promise.resolve(mockAllergyResult)
    );
    wrapper = render(
      <BrowserRouter>
        <AllergyCardLevelThree match={match} />
      </BrowserRouter>
    );

    await wait(() => {
      expect(wrapper).toBeDefined();
    });
  });
});
