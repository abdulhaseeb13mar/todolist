var dragged;
var tasks;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {}, false);

document.addEventListener("dragstart", function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.backgroundColor="black";
    event.target.style.color = "white";

    event.target.style.opacity = 0.6;
    tempdropzone();
    document.getElementById("dustbin").style.display="block";
}, false);

document.addEventListener("dragend", function (event) {
    // reset the transparency
    event.target.style.opacity = "";
    event.target.style.backgroundColor = "rgb(250, 250, 250)";
    event.target.style.color = "black";    
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
        event.target.style.background = "rgb(141, 138, 138)";
    }
    else if (event.target.className == "dropbin") {
        document.getElementById("dustbin").src = "dustbinred.png";
    }
}, false);

document.addEventListener("dragleave", function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "dropzone" || event.target.className == "dropzonetxt") {
        event.target.style.background = "";
    }
    else if (event.target.className == "dropbin") {
        document.getElementById("dustbin").src = "dustbin.png";
    }
}, false);

document.addEventListener("drop", function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();    
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
        document.getElementById("dustbin").style.display = "none";
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        var tobereplace = event.target;
        dragged.removeAttribute("draggable");
        dragged.removeAttribute("ondragstart");
        $(tobereplace).replaceWith(dragged);        
    }
    else if (event.target.className == "dropbin") {
        document.getElementById("dustbin").style.display = "none";
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        document.getElementById("completedtasks").lastChild.remove();                
    }
    else{
        document.getElementById("completedtasks").lastChild.remove();
        document.getElementById("dustbin").style.display = "none";
    }    
}, false);


function tempdropzone() {
    var div = document.createElement("div");
    div.setAttribute("class","dropzone");
    var h4txt = document.createTextNode("Drop Here");
    div.appendChild(h4txt);
    document.getElementById("completedtasks").appendChild(div);    
}


$(function () {
    $("#sortable").sortable();
    $("#sortable").disableSelection();
});


function reorder() {
    var content = $("#taskscontent").children();
    document.getElementById("taskscontent").remove();
    var ul = document.createElement("ul");
    ul.setAttribute("id","sortable");
    document.getElementById("todotasks").appendChild(ul);        
    $("#sortable").append(content);
    $(function () {
        $("#sortable").sortable();
        $("#sortable").disableSelection();
    });   
    document.getElementById("reorderbtn").style.display="none";
    document.getElementById("setorderbtn").style.display="inline-block";
    document.getElementById("blackcurtain").style.display="block";
}

function setorder() {
    var div = document.createElement("div");
    div.setAttribute("id","taskscontent");
    var content = $("#sortable").children();
    document.getElementById("sortable").remove();
    document.getElementById("todotasks").appendChild(div);
    $("#taskscontent").append(content);
    document.getElementById("reorderbtn").style.display = "inline-block";
    document.getElementById("setorderbtn").style.display = "none";
    document.getElementById("blackcurtain").style.display = "none";
}


function add_task() {
    var task = document.createTextNode(document.getElementById("inputtask").value);
    var div = document.createElement("div");
    div.setAttribute("class","draggable");
    div.setAttribute("draggable","true");
    div.setAttribute("ondragstart", "event.dataTransfer.setData('text/plain',null)");
    div.appendChild(task);
    document.getElementById("taskscontent").appendChild(div);
    document.getElementById("inputtask").value = '';       
}









