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
    // 获取当前栈的长度
    size(){
        return this.arr.length 
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
// const browser = new Browser()

//  browser.pushNormal('www.google.com')
//  browser.pushNormal('www.baidu.com')
//  browser.pushNormal('www.github.com')
// // 后退
// browser.back()
// browser.back()
// browser.front()
// browser.pushNormal('www.new.com')


/**
 * 题目：
 * 在水中有许多鱼，可以认为这些鱼停放在 x 轴上。再给定两个数组 Size，Dir，Size[i] 表示第 i 条鱼的大小，Dir[i] 表示鱼的方向 （0 表示向左游，1 表示向右游）。这两个数组分别表示鱼的大小和游动的方向，并且两个数组的长度相等。
 * 鱼的行为符合以下几个条件:
 * 所有的鱼都同时开始游动，每次按照鱼的方向，都游动一个单位距离；
 * 当方向相对时，大鱼会吃掉小鱼；
 * 鱼的大小都不一样。
 * 输入：Size = [4, 2, 5, 3, 1], Dir = [1, 1, 0, 0, 0]
 * 输出：3
 * 请完成以下接口来计算还剩下几条鱼
 * 
 * 
*/
const Size = [4,3,2,1,5];
const Dir = [0,0,0,0,1];
const eatFish = (Size,Dir)=>{
    let stack = new ArrayStack();
    // 当前鱼的数量
    let len = Size.length;
    /**
     * 因为每次鱼都是同时开始游动，每次按照鱼的方向游动一个单位，那么就保证了同一方向的鱼是不会相遇的，
     * 也就是说，只有当鱼的方向相同或者相反时，是不会存在大鱼吃小鱼的情况，只有当鱼相对时，才会出现大鱼吃小鱼的情况
     * 
    */

    if(len <= 1) return len;

    for(let i = 0;i<len;i++){
        // 当前鱼的大小和方向
        let size = Size[i];
        let dir = Dir[i];
        if(stack.peek() === null){
            stack.push(i);
        }else{
            let index = stack.peek();
            while(size > Size[index] && index !== null && Dir[index] != dir){
                stack.pop();
                index = stack.peek();
            }
            stack.push(i) 
        }
    }
    return stack.size();
}
//console.log('--size',eatFish(Size,Dir));

/** 单调栈案例应用1:递增栈
 * 
 *【题目】一个整数数组 A，找到每个元素：右边第一个比我小的下标位置，没有则用 -1 表示。
 * 个人解析：
 * 1.将下标元素依次入栈；
 * 2.如果发现当前元素的的值比栈顶的元素小，那么就将当前的栈顶的元素出栈，记录下当前栈的索引的值所对应的
 * 当前循环的索引；依次将栈顶元素与当前元素进行比较，如果都不满足的话，那么当前栈顶元素的右侧最小的值的
 * 小标为-1
 * 
*/

const arr = [1,2,4,9,4,0,5]
const findRightSmall = (data)=>{
    let stack = new ArrayStack();
    let len = data.length;
    let result = [];
    for(let i = 0;i<len;i++){
        while(!stack.isEmpty() && data[stack.peek()]>data[i]){
            result[stack.peek()] = i;
            stack.pop();
        }
        stack.push(i);
    }
    while (!stack.isEmpty()) {
        result[stack.peek()] = -1;
        stack.pop();
    }
    return result;
}

//console.log('--findRightSmall-result',findRightSmall(arr));

/**
 * 单调栈案例应用2：递减栈
 * 数组中右边第一个比我大的元素：
 * 
 * 个人分析：
 * 1.栈中存储当前数组元素的索引
 * 2.当发现当前的的元素比我大时，那么消除栈顶元素，一次向左侧遍历，直到当前元素比我小
 * 3.当栈中仍存在元素的时候，那么就是没找到比当前元素大的，那么当前元素返回的索引就是-1 
 * */
const findRightBig = (data)=>{
    let result = [];
    let len = data.length;
    let stack = new ArrayStack();
    for(let i = 0;i<len;i++){
        while(!stack.isEmpty() && data[stack.peek()]<data[i]){
            result[stack.peek()] = i;
            stack.pop();
        }
        stack.push(i);
    }

    while(!stack.isEmpty()){
        result[stack.peek()] = -1;
        stack.pop();
    }
    return result;
}
//console.log('--findRightSmall',findRightBig(arr));

/**
 * 单调栈案例应用3：大数消除小数，递减栈
 * 数组中左边第一个比我小的元素：
 * 
 * 个人分析：左边第一个比我小，
 * 1.遍历时，从数组的尾部向头部遍历，那么第一个入栈的就是元素尾部的元素
 * 2.当发现当前的元素（也就是尾部前一个元素），要找左边第一个比我小的元素，那么也就是找右边第一个比我小的元素，
 * 当发现当前的元素比栈顶的元素小时，那么当前栈顶元素的索引的值就是当前的索引值
 * 3.当栈中仍存在元素的时候，那么就是没找到比当前元素大的，那么当前元素返回的索引就是-1 
 * */

 const findLeftSmall = (data)=>{
     let len = data.length;
     let result = [];
     let stack = new ArrayStack();
     for(let i = len-1;i>=0;i--){
        while(!stack.isEmpty() && data[stack.peek()]>data[i]){
            result[stack.peek()] = i;
            stack.pop();
        }
        stack.push(i);
     }
     while(!stack.isEmpty()){
        result[stack.peek()] = -1;
        stack.pop()
     }
    return result;
 }  
 //console.log('--findLeftSmall--',findLeftSmall(arr));


 /**
 * 单调栈案例应用4：小数消除大数字：递增栈
 * 数组中左边第一个比我大的元素：
 * 
 * 个人分析：
 * 1.栈中存储当前数组元素的索引
 * 2.当发现当前的的元素比栈顶元素小时，那么消除栈顶元素，一次向左侧遍历，直到当前元素比我小
 * 3.当栈中仍存在元素的时候，那么就是没找到比当前元素大的，那么当前元素返回的索引就是-1 
 * */

 const findLeftBig = (data)=>{
    let len = data.length;
    let result = [];
    let stack = new ArrayStack();
    for(let i = len-1;i>=0;i--){
       while(!stack.isEmpty() && data[stack.peek()]<data[i]){
           result[stack.peek()] = i;
           stack.pop();
       }
       stack.push(i);
    }
    while(!stack.isEmpty()){
        result[stack.peek()] = -1;
        stack.pop()
     }
   return result;
 }
 //console.log('--findLeftBig--',findLeftBig(arr));


 /**
 * 题目：字典序就是要找最小的那个值，能组成的数组，所以算是小数消除
 * 大数，属于递增栈
 * 给定一个正整数数组和 k，要求依次取出 k 个数，输出其中数组的一个子序列，
 * 需要满足：1. 长度为 k；2.字典序最小
 * 输入：nums = [3,5,2,6], k = 2
 * 输出：[2,6]
 * 
 * ps:字典序：
 * 
 * 所谓字典序就是，给定两个数组：x = [x1,x2,x3,x4]，y = [y1,y2,y3,y4]，
 * 如果 0 ≤ p < i，xp == yp 且 xi < yi，那么我们认为 x 的字典序小于 y。
 * 
 * 
 * */
 const nums = [1,2,3,4]
 const k = 3;
 const findSmallSeq = (data,k)=>{
     let result = [];
     let len = data.length;
     let stack = new ArrayStack();

     for(let i = 0;i<len;i++){
         // 要取出k个个数，所以要控制剩余个数
         let reset = len - i;
         while(!stack.isEmpty() && stack.peek()>data[i] && (stack.size() + reset)>k){
            stack.pop();  
         }
         stack.push(data[i])
     }
     /**
      * 边界处理：
      * 如果数组本身就是升序的，那么就会全部入栈，这时就会出现stack.size()>k的情况
      * 
     */
     while(stack.size()>k){
         stack.pop();
     }
     for (let i = k - 1; i >= 0; i--) {
        result[i] = stack.peek();
        stack.pop();
    }
     return result;
 }

 //console.log('--findSmallSeq--',findSmallSeq(nums,k));

 /**
  * 给定一个数组，数组中的元素代表木板的高度。请你求出相邻木板能剪出的最大矩形面积
  * 
  * 一.暴力解法：
  * 可以枚举以每个柱形为高度的最大矩形的面积。具体来说：依次遍历柱形的高度，对于每一个高度分别向两边扩散，求出以当前高度
  * 为矩形的最大宽度。
  * 为此，我们需要：
  * 左边看一下，看最多能向左延伸多长，找到大于等于当前柱形高度的最左边元素的下标；
  * 右边看一下，看做多能向右延伸多长，找到大于等于当前柱形高度的最右面元素的下标。
  * 对于每一个位置，我们都这样操作，得到一个矩形面积，求出它们的最大的值
  * 
  * 暴力解法的复杂度为：O(N^2)
  *          
  * 
 */
const recent = [16,10,8,7,6,5,4,3]
const maxRecent1 = (data)=>{
    // 如果数组不存在，返回的面积为0
    let len = data.length;
    if(len<=1) return 0 ;
    // 设置面积的初始值为0
    let res = 0; 
    for(let i = 0;i<len;i++){
        let currentHeight = data[i];
        // 找左边最后 1 个大于等于 data[i] 的下标
        let left = i;
        while(left>0 && data[left-1] >= currentHeight){
            left--;
        }
        // 找到右面最后1个大于等于data[i]的下标
        let right = i;
        while(right<len-1 && data[right+1]>=currentHeight){
            right++;
        }
        let width = right - left + 1;
        res = Math.max(res,width * currentHeight)
    }

    return res;
    
}

console.log('--maxRecent1--',maxRecent1(recent));


 /**
  * 给定一个数组，数组中的元素代表木板的高度。请你求出相邻木板能剪出的最大矩形面积
  * 
  * Leetcode:https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/zhu-zhuang-tu-zhong-zui-da-de-ju-xing-by-leetcode-/
  * 
  * 空间换时间：单调栈
  * 我们归纳一下枚举「高」的方法：
  * 首先我们枚举某一根柱子 i， 作为高 h=heights[i]；
  * 随后我们需要进行向左右两边扩展，使得扩展到的柱子的高度均不小于 h。
  * 换句话说，我们需要找到左右两侧最近的高度小于 h 的柱子，这样这两根柱子之间（不包括其本身）的所有柱子高度均不小于 h，
  * 并且就是 i 能够扩展到的最远范围。
  * 那么我们先来看看如何求出一根柱子的左侧且最近的小于其高度的柱子。
  * 除了根据「前言」部分暴力地进行枚举之外，我们可以通过如下的一个结论来深入地进行思考：
  * 对于两根柱子 j[0],j[1]
  * 由于0<1,并且heights[0]>heights[1]
​  * 那么对于任意的在它们之后出现的柱子 j[i]（1 < i ),
  * j[0]一定不会是i最左侧且最近的小于其高度的柱子
​  * 换句话说，如果有两根柱子 j[0]和j[1],其中j[0]在j[1]的左侧，并且j[0]的高度大于j[1]，那么在后面的柱子i向左找小于其高度的柱子时，
  * j[1]会挡住j[0],j[0]就不会作为答案了。
  * 这样以来，我们可以对数组从左向右进行遍历，同时维护一个【可能作为答案】的数据结构，其中按照从小到大的顺序存放了一些j值。根据上面的结论，
  * 如果我们存放了j[0],j[1]....j[s]，那么一定会有heights[j0]<heights[j1]...<height[js],因为如果有两个两邻的j值不满足<关系，那么后者
  * 一定会【挡住】前者，前者就不可能作为答案了。
  * 这样我们在枚举到第 ii 根柱子的时候，就可以先把所有高度大于等于 heights[i] 的 j 值全部移除，剩下的 j 值中高度最高的即为答案。在这之后，我们将 ii 放入数据结构中，开始接下来的枚举。
  * 此时，我们需要使用的数据结构也就呼之欲出了，它就是栈    
  * 栈中存放了 j 值。从栈底到栈顶，j 的值严格单调递增，同时对应的高度值也严格单调递增；
  * 当我们枚举到第 i 根柱子时，我们从栈顶不断地移除 heights[j]>heights[i] 的 j 值。在移除完毕后，栈顶的 j 值就一定满足 
  * heights[j]<heights[i]，此时 j 就是 i 左侧且最近的小于其高度的柱子。
  * 这里会有一种特殊情况。如果我们移除了栈中所有的 j 值，那就说明 ii 左侧所有柱子的高度都大于 heights[i]，那么我们可以认为 i 左侧且最近的小于其高度的柱子在位置 j=-1，它是一根「虚拟」的、高度无限低的柱子。
  * 这样的定义不会对我们的答案产生任何的影响，我们也称这根「虚拟」的柱子为「哨兵」。
  * 我们再将 i 放入栈顶。
  * 栈中存放的元素具有单调性，这就是经典的数据结构「单调栈」了
  * 
  * 结论：可以根据利用单调栈的案例1和3处理
  * 

 */
  const testRecent = [6,7,5,2,4,5,9,3];
  const maxRecent2 = (data)=>{
    let len = data.length;
    // 获取每一项左侧的最小值的下标
    const leftArr = findLeftSmall(data);
    // 获取每一项右侧的最小值的下标
    console.log('--left',leftArr);
    let rightArr = findRightSmall(data);
    console.log('--right',rightArr);
    // 初始化的面积
    let res = 0; 
    // 下标从-1开始，所以计算宽度的时候，要将计算右侧-左侧-1
    for(let i = 0;i<len;i++){
        res = Math.max(res,(rightArr[i] - leftArr[i] -1) * data[i])
    }
    return res;
  }
  
  console.log('--maxRecent2--',maxRecent2(testRecent));

  /**
   * 单调栈优化 ?? 
   * 在方法一中，我们在对位置i进行入栈操作时，确定了它的左边界。从直觉上说，与之对应的我们在对位置i进行出栈操作时可以确定它的右边界。
   * 仔细想一想，这确实是对的。当位置i被弹出栈时，说明此时遍历到的位置i0的高度小于等于height[i]，并且i0和i之间没有其他高度小于等于height[i]的柱子。
   * 这是因为，如果在i和i0之间还有其他位置的高度小于等于height[i]的
   * 
   * 
   * 
  */
   const maxRecent3 = (data)=>{
    let len = data.length;
    let rightArr = [];
    let leftArr = [];

    let stack = new ArrayStack();
    for(let i = 0;i<len;i++){
        while(!stack.isEmpty() && data[stack.peek()]>=data[i]){
            rightArr[stack.peek()]  = i;
            stack.pop();
        }
        leftArr[i] = stack.isEmpty() ? -1 : stack.peek();
        stack.push(i);
    }
   
    while(!stack.isEmpty()){
        rightArr[stack.peek()] = -1;
        stack.pop();
    }
    let res = 0; 
    // 下标从-1开始，所以计算宽度的时候，要将计算右侧-左侧-1
    for(let i = 0;i<len;i++){
        res = Math.max(res,(rightArr[i] - leftArr[i] -1) * data[i])
    }
    return res;
  }
  
  console.log('--maxRecent3--',maxRecent3(testRecent));