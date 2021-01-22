This project is an assignment for the coding round.

Given an array of clicks in clicks.json we have to produce following 3 subset in a separate file called resultset.json.

1. For each IP within each one hour period, only the most expensive click is placed into the result set.
2. If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.
3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set.

To run and produce result - 

please type - npm run solution