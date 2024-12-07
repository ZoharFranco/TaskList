export const SQL_INJECTION_PATTERNS = [
    /union.*select/i,       // UNION SELECT
    /select.*from/i,        // SELECT FROM
    /drop.*table/i,         // DROP TABLE
    /insert.*into/i,        // INSERT INTO
    /update.*set/i,         // UPDATE SET
    /delete.*from/i,        // DELETE FROM
    /--/i,                  // SQL comment (--)
    /\*/i,                  // Wildcard (*) symbol
    /=\s*\'\s*or/i,         // OR in SQL with quote
    /\'\s*or\s*\'/i,        // SQL OR conditions with quote
    /\'\s*=\s*\'/i,         // SQL equality check
    /exec\s*xp_/i,          // EXEC xp_ (used for system procedures)
    /sleep\(\d+\)/i,        // Time-based SQL Injection using SLEEP function
    /benchmark\(\d+,/i      // Benchmark function (used in time-based attacks)
];

