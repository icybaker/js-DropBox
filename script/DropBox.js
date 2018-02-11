//By Joshua Wiens 10FEB2018
//DONT FORGET TO FIX HEIGHT BUG
class DropBox {
    constructor(box,{action = "click",actionMobile = "click"}={}){
        this.isMobile = this.checkMobile();
        this.label = box.children[0];
        this.list = box.children[1];
        this.contentArea = this._createContentArea(box,this.label,this.list);

        if(this.isMobile){this.attachListener(this.label,actionMobile,this._ev_toggleList);}
        else{this.attachListener(this.label,action,this._ev_toggleList);}

        this.attachListener(window,"click",this._ev_hideList);
        // this.attachListener(this.contentArea,"click",this._ev_stopPropagation);

        this._initStyle(box,this.label,this.list);
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
        if(target.style.display == "none"){
            try{
               window.activeList.style.display = "none"; 
            }
            catch(error){
                console.log("no list has been activated yet");
            }
            target.style.display = "block";            
            window.activeList = target;
        }
        else{target.style.display = "none";}
        evt.stopPropagation();
    }
    _ev_hideList(evt){
        var target = evt.currentTarget.activeList;
        try{
            target.style.display = "none";
        }
        catch{
            console.log("no list has been activated yet");
        }
    }
    _createContentArea(box,label,list){
        var contentArea = document.createElement("div");
        box.appendChild(contentArea);
        contentArea.appendChild(label);
        contentArea.appendChild(list);
        // contentArea.style.display = "inline-block";
        return contentArea;
    }

    _initStyle(box,label,list){
        // label.style.cursor = "default";
        box.style.height = window.getComputedStyle(label,null).height;
        if(window.getComputedStyle(label,null).cursor=="auto"){label.style.cursor="default";} 
        list.style.display = "none";
    }

    static initDropBoxes(selector,{action = "click",actionMobile = "click"}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var dropBoxes = new Array(numBoxes);
        for(var i=0;i<numBoxes;i++){
            dropBoxes[i] = new DropBox(boxes[i],{action:action,actionMobile:actionMobile});
        }
        return dropBoxes;
    }

    static _doc(){
        var docString = `To use the DropBox class, you simply need to link the DropBox.js file
        into your html file. 
        To create a DropBox object, first construct the following html:
        
        <div class="drop-box">
            <div class="db-label">This is a DropBox</div>
            <div class="db-list">
                <div class="db-list-item">
                </div>
            </div>
        </div>
        
        **it is recommended to copy and paste this html into your own code
        
        The class names are arbitrary and technically unnecessary, but for
        claritie's sake, I will refer to internal DropBox elements by their
        class names above. 
        The most basic application of the DropBox object may be constructed
        as new DropBox(element),(this is not the recommended initialization
        procedure; see next paragraph) where the element must have an internal
        structure such as depicted above. After the element has been made into
        a DropBox, the db-list element will initialize to invisible, and is
        togglable by clicking on the db-label element.
        The recommended procedure for initializing DropBoxes is to give the
        root element (drop-box element here) a class name and pass its selector
        string to the static DropBox method as follows: 
        
        DropBox.initDropBoxes(".drop-box");
        
        This method call will create DropBox objects out of every element on
        the page with a class name "drop-box" and returns a list of the 
        objects created, in the order that they appear in the page.  
        
        You can set any CSS you like on any of the elements, with the 
        exception of the db-list element whose style.display property is
        controlled by the script, and the height of the drop-box element
        which is set to the height of the db-label element to keep from 
        shifting surrounding elements when toggling the list. 
        To change the way the db-list element appears when visible you can
        alter the _ev_showList method.
        
        In order to control the positioning of the DropBox, adjust the CSS of
        the drop-box element, and to change the shape and internal formatting
        adjust the CSS of the db-label element. The CSS for anything inside
        the db-list element (which can literally be anything) is completely
        free for the user to play with, assuming it's not associated with any
        other CSS shifting tools.`;
        console.log(docString);
    }
}