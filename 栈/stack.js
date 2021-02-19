/**
 * 基于数组实现的栈。
 *
 */
class ArrayStack {
    constructor(){
        this.arr = [];
    }

    // 入栈
    push(item) {
        this.arr.push(item);
    }
    
    // 出栈
    pop(){
        if(!this.arr.length) return null;
        return this.arr.pop();
    }
    // 打印元素
    print(){
        return this.arr.join('-');
    }
    // 为空判断
    isEmpty(){
        return !!!this.arr.length;
    }
    // 栈顶元素
    peek(){
        let len = this.arr.length;
        if(len){
            return this.arr[len-1]
        }else{
            return null;
        }
       
    }
     // 清空栈
     clear(){
        this.arr = [];
        return true;
    }
}
// const arrStack = new ArrayStack();
// arrStack.push(3)
// arrStack.push(8)
// arrStack.push(4)
// arrStack.push(15)
// console.log('--arrStack--',arrStack.print());

/**
 * 基于链表实现的栈。
 *
 */
function createElement(val){
    let ele = {
        data:val,
        next:null
    }
    return ele;
}
class LinkStack {
    constructor(){
        this.top = null;
    }

    // 入栈:存储顶部，新创建的元素要在最顶部
    push(ele){
        let node = createElement(ele);
        if(!this.top){ 
            this.top = node;
        }else{
            node.next = this.top;
            this.top = node;
        }
    }
    // 出栈
    pop(){
        if(!this.top){
            return -1;
        }else{
            let node = this.top.data;
            this.top = this.top.next;
            return node;
        }
    }
    // 打印
    print(){
        let node = this.top;
        let str = '';
        while(node){
            str += node.data + '-';
            node = node.next;  
        }
        return str.slice(0,-1);
    }

    // 为空判断
    isEmpty(){
        return !!!this.top
    }

    // 栈顶元素
    peek(){
        return this.top;
    }

    // 清空栈
    clear(){
        this.top = null;
        return true;
    }

}

// const linkStack = new ArrayStack();
// linkStack.push(2)
// linkStack.push(14)
// linkStack.push(3)
// linkStack.push(7)
// linkStack.pop();
// console.log('--linkStack--',linkStack.print());

/*
* 判断输入的括号是否匹配
*
*/

const isMatch = (str)=>{
    let len = str.length;
    let stack = new ArrayStack();
    const character = ['(','{','['];
    for(let i = 0;i<len;i++){
        if(~character.indexOf(str[i])){
            stack.push(str[i])
        }else{
            let top = stack.peek();
            switch(str[i]){
                case ')':
                    if(top === '('){
                        stack.pop();
                    }
                break;
                case ']':
                    if(top === '['){
                        stack.pop();
                    }
                break;
                case '}':
                    if(top === '{'){
                        stack.pop();
                    }
                break;
            }
            
        }
    }
    return stack.isEmpty();
}
const str = '([]{)}'
const result = isMatch(str)
//console.log('--result',result);

/*
* 实现浏览器的前进和后退
*
*/

class Browser {
    constructor(){
        // 前进的栈
        this.normalStack = new LinkStack();
        // 后退的栈
        this.backStack = new LinkStack();
    }
    //正常浏览页面
    pushNormal(page){
        this.normalStack.push(page);
       // this.backStack.clear();
        this.displayAllStack();
    }

      // 打印栈内的数据
      displayAllStack(){
        console.log('--浏览页面--',this.normalStack.print());
        console.log(this.normalStack.print());
        console.log('--后退页面--',this.backStack.print());
       
    }

    // 后退
    back(){
        const value = this.normalStack.pop();
        if(value){
            this.backStack.push(value);
            this.displayAllStack();
        }else{
            return '无法后退'
        }
    }

    // 前进
    front(){
        const value = this.backStack.pop();
        if(value){
            this.normalStack.push(value);
            this.displayAllStack();
        }else{
            return '无法前进'
        }
    }

  
}

// Test
const browser = new Browser()

 browser.pushNormal('www.google.com')
 browser.pushNormal('www.baidu.com')
 browser.pushNormal('www.github.com')
// 后退
browser.back()
browser.back()
browser.front()
browser.pushNormal('www.new.com')