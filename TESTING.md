# Silent Help – Test Plan & Bug Tracker

## ✅ Test Cases

| ID | Feature        | Test Steps              | Expected Result                                      | Actual Result                 | Status         |
|----|----------------|-------------------------|------------------------------------------------------|-------------------------------|----------------|
| 1  | Page loads     | Open frontend           | Input field,red button,"Ready" visible               |Just as expected               |Pass            |
| 2  | Name input     | Type name               | Text appears                                         |Text appears                   |Pass            |
| 3  | Button hold    | Press and hold          | Status "Hold for 3 seconds..."                       |                               |In Progress     |
| 4  | Full hold      | Hold 3 sec              | Status "Getting location…",then permission popup     |                               |Not Tested      |
| 5  | Allow location | Click Allow             | Status "Sending alert…" → "Alert sent successfully!" |                               |Not Tested      |
| 6  | Email sent     | Check inbox             | Email arrives with Google Maps link                  |                               |Not Tested      |
| 7  | Release early  | Release before 3 sec    | Status resets to "Ready", no alert                   |                               |Not Tested      |
| 8  | Fast tap       | Tap quickly             | No action                                            |                               |Not Tested      |
| 9  | No name        | Send without name       | Alert sends with "Unknown"                           |                               |Not Tested      |
| 10 | Location denied| Deny permission         | (No error shown – bug)                               |                               |Not Tested      |
| 11 | Backend offline| Stop backend,send alert | Status "Error sending alert."                        |                               |Not Tested      |
| 12 | Mobile         | Test on phone           | Should work (but may fail because of mouse events)   |                               |Not Tested      |

## 🐞 Bug Tracker

|ID|Bug Description              |Steps to Reproduce                   |Reported By  |Status |Fixed By|Notes                                        |
|--|-----------------------------|-------------------------------------|-------------|-------|--------|---------------------------------------------|
|1 |No error when location denied|                                     |             |New    |        | Need error handling in geolocation callback |
|2 |                             |                                     |             |New    |        |                                             | 
