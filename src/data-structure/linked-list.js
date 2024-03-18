
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
class Edge {
    constructor(data){
        this.start = data.data.start;
        this.end = data.data.end;
        this.travelTime = data.data.travelTime;
    }
}

export class Data {
    constructor(data){
        this.data = data;        
    }
}

export class Transaction {
    constructor(data){
        this.site = data.site;
        this.customer = data.customer;
        this.transactionDate = data.transactionDate;
        this.transactionTime = data.transactionTime;
        this.productCode = data.productCode;
        this.quantity = data.quantity;
    }
}
export class TransactionService {
    constructor(graph){
        this.transactions = [];
        this.graph = graph;
    }

    processTransaction(data){
        let transaction = new Transaction(data);
        let previousTransaction = this.getLastCustomersTransaction(transaction);
        let results = this.fraudDetection(previousTransaction, transaction);
        if(results[0]){
            let travelTime = this.graph.travelTime(previousTransaction.site, transaction.site);
            return `
<=== Fraud detected! ${previousTransaction.site} -> ${transaction.site} Normally takes ${travelTime} Hours and current is: ${results[1].toFixed(1)} Hours  ====>\n
\tPrevious Transaction: ${JSON.stringify(previousTransaction)}\n
\tCurrent Transaction: ${JSON.stringify(transaction)}\n
<===================================== Fraud detected! Transaction not added. =====================================>`;
        }
        this.transactions.push(new Transaction(transaction));
        return `
Transaction added successfully!
${JSON.stringify(transaction)}`;
    }

    getLastCustomersTransaction(transaction){
        if(!transaction){
            return "transaction not found";
        }

        let sortByDateandTime = this.transactions.toSorted((a, b) => {
            return new Date(b.transactionDate + " " + b.transactionTime) - new Date(a.transactionDate + " " + a.transactionTime);
        });

        return sortByDateandTime[0];
    }
    fraudDetection(previousTransaction, currentTransaction){
        if(!previousTransaction){
            return [false, 0];
        }
        if(previousTransaction.transactionDate !== currentTransaction.transactionDate){
            return [false, 0];
        }
        
        let travelTime = this.graph.travelTime(previousTransaction.site, currentTransaction.site);
        
        let currentTravelTime = new Date(`${currentTransaction.transactionDate} ${currentTransaction.transactionTime}`) - new Date(`${previousTransaction.transactionDate} ${previousTransaction.transactionTime}`);
        let currentTravelTimeInHours = currentTravelTime / 1000 / 60 / 60;
        return [currentTravelTimeInHours < travelTime, currentTravelTimeInHours];
    }
}
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, distance) {
        this.queue.push({ element, distance });
        this.sortQueue();
    }

    dequeue() {
        const { element, distance } = this.queue.shift();
        return { node: element, distance: distance };
    }

    sortQueue() {
        this.queue.sort((a, b) => a.distance - b.distance);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}


export class Graph {
    constructor(){
        this.adjacencyList = {};
        this.head = null;
        this.size = 0;
    }

    addEdge(data){
        let edge = new Edge(data);

        if(!this.adjacencyList[edge.start]){
            this.adjacencyList[edge.start] = [];
        }
        this.adjacencyList[edge.start].push({node: edge.end, weight: edge.travelTime});
    }

    travelTime(start, end){        
        const distances = {}; // Stores the travel time from start to each node
        const priorityQueue = new PriorityQueue(); // Min-heap priority queue
        
        // Initialize distances to all nodes as positive infinity
        for (const node of Object.keys(this.adjacencyList)) {
            distances[node] = Infinity;
        }
        
        distances[start] = 0; // Distance from start to start is 0
        priorityQueue.enqueue(start, 0); // Enqueue the start node with distance 0
        
        while (!priorityQueue.isEmpty()) {
            // Destructure the queue object and extract the node with the smallest distance
            const { node: current, distance: currentDistance } = priorityQueue.dequeue(); 
            // Visit each neighbor of the current node
            for (const edge of this.adjacencyList[current]) {
                const neighbor = edge.node;
                const travelTime = edge.weight;
                const totalDistance = currentDistance + travelTime;
                
                // Update distance if the new total distance is less than the current distance
                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    priorityQueue.enqueue(neighbor, totalDistance); // Add the neighbor to the priority queue
                }
            }
        }
        
        return distances[end];
    }

    insertHead(data){
        this.head = new Node(data, this.head);
        this.size++;
    }

    insertLast(data){
        let last = new Node(data);
        let current = this.head;

        while(current.next){
            current = current.next;
        }
        current.next = last;
        this.size++;
    }

    insertAt(data, index){
        if(index > 0 && index > this.size){
            console.log("Index out of range")
            return;
        }

        if(index === 0){
            this.insertHead(data);
            return;
        }

        const node = new Node(data);
        let current, previous;
        current = this.head;
        let count = 0;

        while(count < index){
            previous = current;
            count++;
            current = current.next;
        }

        node.next = current;
        previous.next = node;
        this.size++;
    }

    printGraph(){
        let current = this.head;
        while(current){
            console.log(current.data);
            current = current.next;
        }
    }

    searchByIndex(index){
        let count = 0;
        let current = this.head;
        let foundData;

        while(current){
            if(count === index){
                foundData = current.data;
                break;
            }
            count++;
            current = current.next;
        }
        return foundData;
    }

    searchByName(data){
        let current = this.head;
        let foundData;

        while(current){
            if(current.data.site === data.site){
                foundData = current.data;
                break;
            }
            current = current.next;
        }
        return foundData;

    }

    removeAt(index){
        let current = this.head;
        let previous;
        let count = 0;

        if(index === 0){
            this.head = current.next;
        }
        else{
            while(count > index){
                count++;
                previous = current;
                current = current.next; 
            }
            previous.next = current.next;
        }
    }
}


