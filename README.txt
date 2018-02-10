To use the DropBox class, you simply need to link the DropBox.js file
into your html file. 
To create a DropBox object, first construct the following html:
    <div class="drop-box">
        <div class="db-label">This is a DropBox</div>
        <div class="db-list">
            <div class="db-list-item">
            </div>
        </div>
    </div>
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
DropBox.initDropBoxes(".drop-box")
This method call will create DropBox objects out of every element on
the page with a class name "drop-box" and returns a list of the 
objects created, in the order that they appear in the page.  