Array.prototype.myArrayPop = function(){
    if(this.length === 0){
        return undefined;
    }else{
        let lastIndex = this.length - 1;
        poppedElement = this[lastIndex];
        this.length = lastIndex;
        return poppedElement;
    }
}

let arr=[12,23,23,30,45,55];
console.log(arr, " main Array ");
let popEl = arr.myArrayPop();
console.log(popEl, ' popEl ', arr);