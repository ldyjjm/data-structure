function createElement(val){
    let ele = {
        data:val,
        next:null
    }
    return ele;
}

class Link{
    constructor(n){
        this.head = null;
        this.tmp = null ; // 反转时暂存用
        this.prev = null ; // 反转前一个结点
    }
    inserted(val){
        if(!this.head){
            this.head = createElement(val);
        }else{
            let data = this.head;
            while(data.next){
                data = data.next;
            }
            data.next = createElement(val);  
        }
    }
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
    /* 寻找链表的中点:利用快慢指针*/
    middle(){
        let fast = this.head,slow = this.head;
        while(fast && fast.next){
            slow = slow.next;
            fast = fast.next.next;  
        }
        return slow   
    }
    /**
     * 链表反转
     * 
    */
    reverse(current){
        if(!current) current = this.head;
       /**
        * 翻转链表的主要方法：
        * 迭代：
            每次分出来一个节点把节点作为头节点添加到新链表上：

            原链表：1->2->3->4->5

            分离第一个节点作为头节点添加到新链表：1 原链表：2->3->4->5

            分离下一个节点作为头节点添加到新链表：2->1 原链表：3->4->5

            分离下一个节点作为头节点添加到新链表：3->2->1 原链表：4->5

            分离下一个节点作为头节点添加到新链表：4->3->2->1 原链表：5

            分离下一个节点作为头节点添加到新链表：5->4->3->2->1 原链表：null
        * 
        * 
        */
       let head = current;
       let tmp = null;
       let pre = null;
       while(head){
        tmp = head.next; // 暂存下一个结点
        head.next = pre; // 把当前结点的next设置为前一个结点
        pre = head;      // 前一个结点等于当前结点
        head = tmp;       // 当前结点等于暂存的下一个结点
       }
       return pre;
    }
    /**
     * 链表中环的检测
    */
    isCircle(){
        let slow = this.head,fast = this.head;
        while(fast && fast.next){
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast){
                return true;
            }
            return false;
        }
    }
    /**
     * 
     * 两个有序的链表合并
    */


    /**
     * 
     * 删除链表倒数第n个结点
     * 利用快慢指针:
     * 快指针
    */

   deleteKey(n){
    if(this.isCircle())return null;
    // 删除倒数第n个结点
    let fast = this.head;
    fast = this.moveKey(n,fast);
    let prev = new Link();
    prev.inserted('0');
    prev.next = this.head;
    let slow = prev;
    while(fast){
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return prev.next;
   }
   moveKey(n,current){
    if(!current) current = this.head;
    let data = current;
    for(let i = 1;i<=n;i++){
        data= data.next;
    }
    return data;
   }
   
   contactLink(list1,list2){
       let a = list1.head,b = list2.head;
       let res ;
       if(a.data >= b.data){
        res = a;
        a = a.next;
       }else{
        res = b; 
        b = b.next;
       }
       let currentNode = res;
      // console.log('--res',res);
       while(a && b){
        if(a.data < b.data){
            currentNode.next = a;
            a = a.next;
        }else{
            currentNode.next = b;
            b = b.next;
        }
        
        currentNode = currentNode.next; // 为啥currentNode = currentNode.next
        console.log('--cureent',currentNode);
       }
       if (a != null) {
            currentNode.next = a
        } else {
            currentNode.next = b
        }
        return res
    }
}


let linkLists1 = new Link();
linkLists1.inserted(1);
linkLists1.inserted(2);
linkLists1.inserted(4);
linkLists1.inserted(5);


let linkLists2 = new Link();
linkLists2.inserted(1);
linkLists2.inserted(3);
linkLists2.inserted(4);

let linkLists3 = new Link();
let result = linkLists3.contactLink(linkLists1,linkLists2)

console.log('--link',result);