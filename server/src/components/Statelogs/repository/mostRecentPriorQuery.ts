import { dataSource } from "../../../config/pg";

//For reference https://dba.stackexchange.com/questions/320699/select-rows-where-date-exist-in-list-if-not-found-get-next-closest-date
export default function mostRecentPriorState(
  vehicleId: number,
  timestamp: string
) {
  return dataSource.manager.query(
    `
    SELECT
    (SELECT state from "stateLogs" where timestamp=found and "vehicleId"=$1) as state, found as date, v.id as vehicleId, v.make, v.model
    FROM (
      SELECT
        CASE WHEN prior is NULL AND successor is NULL THEN srch
        WHEN prior_diff < successor_diff OR successor_diff IS NULL THEN prior
        WHEN successor_diff < prior_diff OR prior_diff IS NULL THEN successor
        END as found
      FROM (
        SELECT
          prior,
          srch-prior as prior_diff,
          srch,
          successor,
          successor-srch as successor_diff
        FROM 
          (select (select max(timestamp) from "stateLogs" where timestamp <= srch and "vehicleId"=$1) as prior, srch, (select min(timestamp) from "stateLogs" where timestamp >= srch and "vehicleId"=$1) as successor FROM unnest(ARRAY[$2]::timestamp[]) t(srch)
          ) s
      ) r 
    ) p INNER JOIN vehicles AS v ON v.id = $1
  `,
    [vehicleId, timestamp]
  );
}
