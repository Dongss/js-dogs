// handle tab intextarea
function handleTab() {
    var textareas = document.getElementsByTagName('textarea');
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
        textareas[i].onkeydown = function(e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s+1; 
            }
        }
    }
}

handleTab();

var inputTextarea = document.getElementById("editor");
var outputTextarea = document.getElementById("output-text");
var inputErrorEl = document.getElementById("input-error");

function UpdateInputHeight() {
    var _inputEl = document.getElementsByClassName("input")[0];
    var _inputCodeMirrorEl = _inputEl.getElementsByClassName("CodeMirror")[0];
    if (!_inputCodeMirrorEl) { return; }
    var _inputErrorEl = document.getElementById("input-error");
    var errortHeight = _inputErrorEl.clientHeight;  
    var inputHeight = _inputEl.clientHeight;
    _inputCodeMirrorEl.style.height = (inputHeight -errortHeight) + "px";
};

// CodeMirror
var inputCodeMirror = CodeMirror.fromTextArea(inputTextarea, {  
    lineNumbers: true,
    mode: "javascript" 
});

var outputCodeMirror = CodeMirror.fromTextArea(outputTextarea, {  
    lineNumbers: true,
    mode: "javascript",
    readOnly: true
});

inputCodeMirror.on("change", function(me, ctx) {
    inputErrorEl.innerHTML = "";
    var input = inputCodeMirror.getValue();
    try {
        var transCode = babel.transform(input).code;
        outputCodeMirror.setValue(transCode);

    } catch (e) {
        inputErrorEl.innerHTML = "<pre>" + e + "</pre>";
    }
    
    //UpdateInputHeight();
});

