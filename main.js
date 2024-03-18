import { Graph, Data, TransactionService } from "./src/data-structure/linked-list.js";

const graph = new Graph();
const siteA = new Data({site: 'A'});
const siteB = new Data({site: 'B'});
const siteC = new Data({site: 'C'});
const siteD = new Data({site: 'D'});
const siteE = new Data({site: 'E'});

const edgeAB = new Data({start: 'A', end: 'B', travelTime: 5});
const edgeBA = new Data({start: 'B', end: 'A', travelTime: 5});

const edgeAE = new Data({start: 'A', end: 'E', travelTime: 5});
const edgeEA = new Data({start: 'E', end: 'A', travelTime: 5});

const edgeBC = new Data({start: 'B', end: 'C', travelTime: 3});
const edgeCB = new Data({start: 'C', end: 'B', travelTime: 3});

const edgeBD = new Data({start: 'B', end: 'D', travelTime: 4});
const edgeDB = new Data({start: 'D', end: 'B', travelTime: 4});

const edgeED = new Data({start: 'E', end: 'D', travelTime: 8});
const edgeDE = new Data({start: 'D', end: 'E', travelTime: 8});

graph.insertHead(siteA);
graph.insertLast(siteB);
graph.insertLast(siteC);
graph.insertLast(siteD);
graph.insertLast(siteE);

graph.addEdge(edgeAB);
graph.addEdge(edgeAE);
graph.addEdge(edgeBC);
graph.addEdge(edgeBD);
graph.addEdge(edgeED);
graph.addEdge(edgeBA);
graph.addEdge(edgeEA);
graph.addEdge(edgeCB);
graph.addEdge(edgeDB);
graph.addEdge(edgeDE);

const trx = new TransactionService(graph);
console.log(trx.processTransaction({site: 'A', customer: 'C1', transactionDate: '2024-01-01', transactionTime: '10:00', productCode: 'P1', quantity: 1}));
console.log(trx.processTransaction({site: 'B', customer: 'C1', transactionDate: '2024-01-01', transactionTime: '10:10', productCode: 'P1', quantity: 1}));
console.log(trx.processTransaction({site: 'C', customer: 'C1', transactionDate: '2024-01-01', transactionTime: '15:20', productCode: 'P1', quantity: 1}));
console.log(trx.processTransaction({site: 'D', customer: 'C1', transactionDate: '2024-01-01', transactionTime: '19:30', productCode: 'P1', quantity: 1}));


console.log(trx.transactions);