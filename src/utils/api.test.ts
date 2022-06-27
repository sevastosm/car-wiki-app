import { getAllManufactures, GetMakeForManufacturer } from "../utils";

fetchMock.enableMocks();
beforeEach(() => {
  fetch.resetMocks();
});
const responce = [
  {
    Country: "UNITED STATES (USA)",
    Mfr_CommonName: "Tesla",
    Mfr_ID: 955,
    Mfr_Name: "TESLA, INC.",
    VehicleTypes: [
      {
        IsPrimary: true,
        Name: "Passenger Car",
      },
      {
        IsPrimary: false,
        Name: "Multipurpose Passenger Vehicle (MPV)",
      },
    ],
  },
];

it("finds exchange", async () => {
  fetch.resetMocks();

  fetch.mockResponseOnce(JSON.stringify(responce));
  const manufacter = await getAllManufactures(1);

  expect(manufacter).toEqual(responce);
  expect(fetch).toHaveBeenCalledTimes(1);
});
it("dfdsfd", async () => {
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify(responce));
  const manufacter = await GetMakeForManufacturer(1709);

  // expect(manufacter).toEqual(responce);
  expect(fetch).toHaveBeenCalledTimes(1);
});
