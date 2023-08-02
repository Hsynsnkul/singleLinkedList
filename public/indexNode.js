const main=document.querySelector('.main');
const nodeAll=document.querySelectorAll('.node');

console.log(nodeAll)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SingleList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length=0;
  }
  push(value){
  const newNode=new Node(value);
  if(!this.head){
    this.head=newNode;
    this.tail=newNode;
  }else{
    this.tail.next=newNode;
    this.tail=newNode
  }
  this.length++;
  return this;
  }

  /* En arkadadakini silme. */
  pop(){
    if(!this.head) return undefined;
    let current=this.head;
    let newTail=current;
    while(current.next){
        newTail=current;
        current=current.next;
    }
    this.tail=newTail;
    this.tail.next=null;
    this.length--;
    if(this.length===0){
        this.head=null;
        this.tail=null;
    }
    return current;
  }
  shift(){
    if(!this.head) return undefined;
    let currentHead=this.head;
    this.head=currentHead.next;
    this.length--;
    if(this.length===0){
        this.tail=null
    }
    return currentHead;
  }
  unShift(value){
    let newNode=new Node(value);
    if(!this.head){
        this.head=newNode;
        this.tail=this.head;
    }else{
        newNode.next=this.head;
        this.head=newNode;
    }
    this.length++;
    return newNode
  }

  get(index){
    if(index<0 || index >=this.length) return null;
    let current=this.head;
    let counter=0;
    while(counter!==index){
      current=current.next;
      counter++;
    }
    return current;
  }
  set(index,value){
    let foundNode=this.get(index);
    if(foundNode){
      foundNode.value=value;
      return foundNode;
    }
    return null;
  }
  insert(index,value){
    if(index<0 ||index>this.length)return false;
    if(index===0) return this.unShift(value);
    if(index===this.length) return this.push(value);
    let newNode=new Node(value);
    let prev=this.get(index-1);
    
    let temp=prev.next;
    prev.next=newNode;
    newNode.next=temp;
    this.length++;
    return true;
  }
  remove(index){
    if(index<0 || index >=this.length)return undefined;
    if(index === 0) return this.shift();
    if(index === this.length-1 ) return this.pop();
    let previousNode = this.get(index-1);
    let removeNode=previousNode.next;
    previousNode.next=removeNode.next;
    this.length--;
    return removeNode;
  }
  print(){
    const arr=[];
    let current=this.head;
    while(current){
      arr.push(current.value);
      current=current.next;
    }
    return arr;
  }
  reverse(){
    let arr=this.print();
    this.head.value=arr[arr.length-1];
    this.tail.value=arr[0];
    for(let i=1;i<this.length-1;i++){
     this.get(i).value=arr[this.length-i-1];
    }
    console.log(this.print())
    return this;
  }
}

/* const singleList=new SingleList();
singleList.push(11);
singleList.push(12);
singleList.push(13);
singleList.push(15);
singleList.insert(3,14);
console.log(singleList);
console.log(singleList.print());
singleList.reverse();
console.log(singleList); */

const node=document.querySelector('.node');




