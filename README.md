# Basic Fraud Detection
This application will detect depending of the travel time assigned to each location from another location

## installation guide
1) Install NodeJs from this url https://nodejs.org/en/download/current
2) Clone this repo into your workspace
3) run the following command once you are in the root of the folder you clone the project "npm run start"
4) based on the sites you added the transactions will return some console print in the terminal

### output example
```
Transaction added successfully!
{"site":"A","customer":"C1","transactionDate":"2024-01-01","transactionTime":"10:00","productCode":"P1","quantity":1}

<=== Fraud detected! A -> B Normally takes 5 Hours and current is: 0.2 Hours  ====>

	Previous Transaction: {"site":"A","customer":"C1","transactionDate":"2024-01-01","transactionTime":"10:00","productCode":"P1","quantity":1}

	Current Transaction: {"site":"B","customer":"C1","transactionDate":"2024-01-01","transactionTime":"10:10","productCode":"P1","quantity":1}

<===================================== Fraud detected! Transaction not added. =====================================>

<=== Fraud detected! A -> C Normally takes 8 Hours and current is: 5.3 Hours  ====>

	Previous Transaction: {"site":"A","customer":"C1","transactionDate":"2024-01-01","transactionTime":"10:00","productCode":"P1","quantity":1}

	Current Transaction: {"site":"C","customer":"C1","transactionDate":"2024-01-01","transactionTime":"15:20","productCode":"P1","quantity":1}

<===================================== Fraud detected! Transaction not added. =====================================>

Transaction added successfully!
{"site":"D","customer":"C1","transactionDate":"2024-01-01","transactionTime":"19:30","productCode":"P1","quantity":1}
[
  Transaction {
    site: 'A',
    customer: 'C1',
    transactionDate: '2024-01-01',
    transactionTime: '10:00',
    productCode: 'P1',
    quantity: 1
  },
  Transaction {
    site: 'D',
    customer: 'C1',
    transactionDate: '2024-01-01',
    transactionTime: '19:30',
    productCode: 'P1',
    quantity: 1
  }
]
```
