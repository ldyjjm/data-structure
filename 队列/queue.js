/**
 * 顺序队列
 * 
*/

class ArrayQueue {
    constructor(){
        this.arr = []
    }
    // 入队
    enqueue(val){
        this.arr.push(val);
    }

    // 出队
    dequeue(){
        this.arr.shift();
    }

    // 队列长度
    count(){
        return this.arr.length;
    }
}

/**
 * 链式队列
 * 
*/

function createElement(val){
    return {
        data:val,
        next:null
    }
}

class LinkQueue {
    constructor(){
        this.head = null;
        this.tail = null;
    }
    // 入队
    enqueue(val){
        let ele = createElement(val);
        if(!this.head){
            this.head = ele;
            this.tail = ele;
        }else{
            this.tail.next = ele;
            this.tail = ele;
        } 
    }

    // 出队
    dequeue(){
        if(!this.head) return -1;
        let node = this.head;
        this.head = node.next;
        return node.data;
    }

    // 队列长度
    count(){
        if(!this.head) return 0;
        let node = this.head;
        let count = 0;
        while(node){
            count++;
            node = node.next;
        }
        return count
    }

    // 打印队列
    print(){
        if(!this.head){
            return null
        }else{
            let data = this.head;
            let arr = [];
            while(data.next){
                arr.push(data.data)
                data = data.next;
            }
            arr.push(data.data)
            return arr.join('-');
        }
    }

    // 获取队头和队尾
    peek(type){
        return type === 'head' ?  this.head.data : this.tail.data;
    }
}

const linkQueue = new LinkQueue();
linkQueue.enqueue(3);
linkQueue.enqueue(8);
linkQueue.enqueue(4);
linkQueue.enqueue(15);

// console.log('--dequeue--',linkQueue.dequeue());
// console.log('--count--',linkQueue.count());
// console.log('--print--',linkQueue.print());
// console.log('--head--',linkQueue.peek('head'));
// console.log('--tail--',linkQueue.peek('tail'));

/**
 * 数组循环队列
 * 
 * 对于一个数组形式的循环队列，知道队列的总长度，首部元素的索引，数组的长度，那么尾部元素的索引就等于：
 * tail = （head + arrLen -1）% queueLen 
 * 
 * [ 
 * tail：尾部元素的索引,
 * head:头部元素的索引,
 * arrLen:数组的长度,
 * queueLen:队列的长度
 * ]
 * 
*/

class ArrayCircleQueue {
    constructor(k){
       this.headIndex = 0; // 队首的索引
       this.arrLen = 0; // 当前数组的长度
       this.queue = []; // 存储数据
       this.queueLen = k; // 队列总长度
    }
     // 入队
     enqueue(val){
        // 队列满，不能进行插入操作
      if(this.queueLen === this.arrLen) return false;
      // 入队是从队尾入队，每次入队一个元素后，arrLen就加1，加上初始的值
      let index = (this.headIndex + this.arrLen) % this.queueLen;
      this.queue[index] = val;
      this.arrLen += 1;
      return true;  
    }
    // 出队
    dequeue() {
        // 队列为空，不能出队列
       if(this.count ==0) return false;
       this.headIndex = (this.headIndex +1 ) % this.queueLen; // 队头索引往后移1个
       this.arrLen -= 1;
        return;
    }
    // 取队首元素
    front(){
        if(this.arrLen == 0) return false;
        return this.queue[this.headIndex];
    }
    // 取队尾元素
    rear(){
        if(this.arrLen == 0) return false;
         let index = (this.headIndex + this.arrLen -1) % this.queueLen;
         return this.queue[index]
    }
    /**
    *  判断队空的操作：
    * head === tail
    * 
    */
    isEmpty(){
        return this.arrLen === 0
    }

    /**
    *  判断队满的操作：
    * 
    */
    
    isFull(){
        return this.arrLen == this.queueLen;
    }

    print() {
        return this.queue
    }
}

let arrayCircleQueue = new ArrayCircleQueue(5);
arrayCircleQueue.enqueue(1);
arrayCircleQueue.enqueue(2);
arrayCircleQueue.enqueue(3);
arrayCircleQueue.enqueue(4);
arrayCircleQueue.enqueue(5);
arrayCircleQueue.enqueue(6);

// console.log(arrayCircleQueue.print());
// console.log(arrayCircleQueue.front());
// console.log(arrayCircleQueue.rear());

/**
 * 链表循环队列
 * 
 *  capacity：循环队列可容纳的最大元素数量。
 *  head：队首元素索引。
 *  count：当前队列长度。该属性很重要，可以用来做边界检查。
 *  tail：队尾元素索引。与数组实现方式相比，如果不保存队尾索引，则需要花费O(N) 时间找到队尾元素。
*/
class LinkCircleQueue {
    constructor(k){
        this.capacity = k;
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    // 入队
    enqueue(val){
        // 队列满不能再进行插入操作
        if(this.count === this.capacity) return;
        // 创建节点
        let node = createElement(val);
        if(this.count == 0){ // 如果队列是空的，那么首尾元素都是一样的
            this.head = this.tail = node;
        }else{
            this.tail.next = node;
            this.tail = node;
        }
        this.count += 1;
        return true;
    }

    //出队
    dequeue(){
      if(this.count === 0) return false;
      let val = this.head.data
      this.head = this.head.next;
      this.count -= 1;
      return val;
    }
    // 队首
    front(){
        if(this.count === 0) return -1;
        return this.head.data;
    }

    // 队尾
    rear(){
        if(this.count === 0) return -1;
        return this.tail.data;
    }

    // 是否为空
    isEmpty(){

    }
     
    // 是否满了
}