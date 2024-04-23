import mostRecentPriorState from "./mostRecentPriorQuery";
import stateLogRepository from "./stateLogRepository";
jest.mock("./mostRecentPriorQuery");

describe("StateLogRepository", () => {
  beforeAll(() => {});

  it("If query returns no results, return null", async () => {
    //Mock mostRecentPriorState to return empty array
    (mostRecentPriorState as jest.Mock).mockResolvedValue([]);

    //Call stateLogRepository.getStateLogByDate
    const res = await stateLogRepository.getStateLogByDate(
      1,
      "2021-01-01 00:00:00"
    );
    //Expect res to be null
    expect(res).toBe(null);
  });

  it("If query returns results, return first result", async () => {
    //Mock mostRecentPriorState to return array with one element
    (mostRecentPriorState as jest.Mock).mockResolvedValue([
      {
        state: "state",
        date: "date",
        vehicleId: 1,
        make: "make",
        model: "model",
      },
    ]);

    //Call stateLogRepository.getStateLogByDate
    const res = await stateLogRepository.getStateLogByDate(
      1,
      "2021-01-01 00:00:00"
    );
    //Expect res to be the first element in the array
    expect(res).toEqual({
      state: "state",
      date: "date",
      vehicleId: 1,
      make: "make",
      model: "model",
    });
  });
});
