//By Joshua Wiens 10FEB2018

class DropBox {
    constructor(box,{action = "click",actionMobile = "click"}={}){
        this.isMobile = this.checkMobile();
        this.label = box.children[0];
        this.list = box.children[1];

        if(this.isMobile){this.attachListener(this.label,actionMobile,this._ev_toggleList);}
        else{this.attachListener(this.label,action,this._ev_toggleList);}

        this._initStyle(this.label,this.list);
    }

    checkMobile(){
        var W = window.innerWidth, H = window.innerHeight;
        if((W/H)>1){return false;}
        else{return true;}
    }

    attachListener(element,action,listenerFunction){
        element.addEventListener(action,listenerFunction,false);
    }
    _ev_toggleList(evt){
        var target = evt.currentTarget.nextElementSibling;
        if(target.style.display == "none"){target.style.display = "block";}
        else{target.style.display = "none";}
    }

    _initStyle(label,list){
        // label.style.cursor = "default";
        if(window.getComputedStyle(label,null).cursor=="auto"){label.style.cursor="default";} 
        list.style.display = "none";
        
    }

    static initDropBoxes(selector,{action = "click",actionMobile = "click"}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var dropBoxes = new Array(numBoxes);
        for(var i=0;i<numBoxes;i++){
            dropBoxes[i] = new DropBox(boxes[i],action,actionMobile);
        }
        return dropBoxes;
    }

}