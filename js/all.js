var ary = JSON.parse(localStorage.getItem("img")) || [];
var input = document.querySelector('.input');
var img = document.querySelector('.img');
var div = document.querySelector('.div');
var body = document.querySelector('body');
var gotop = document.querySelector('#go-top');
var deleteAll = document.querySelector('.icon-cancel');
function update(){
    var str = "";
    for(i=0;i<ary.length;i++){
        str += '<img data-num="'+i+'" src = "'+ary[i]+'"></img><div id="delete"><a href="#" class="delete">&times;</a></div>';
    }
    div.innerHTML = str;
}
function readURL(){
    if(this.files && this.files[0]){
        for(i=0;i < this.files.length;i++){
            var reader = new FileReader();
            reader.onload = function(e){
                ary.push(e.target.result);
                update();
                localStorage.setItem("img", JSON.stringify(ary));
            }
            reader.readAsDataURL(this.files[i]);    
        }
    }
    input.value = "";
}
function checkDelete(e){
    if(e.target.nodeName == "A" && e.target.className == "delete"){
        e.preventDefault();
        ary.splice(e.target.parentNode.previousElementSibling.dataset.num,1);
        update();
        localStorage.setItem("img", JSON.stringify(ary));
    }
}
function checkDeleteAll(){
    if(confirm("確定要清除全部?")){
        ary = [];
        update();
        localStorage.setItem("img", JSON.stringify(ary));
    }else{
        return;
    }
}
input.addEventListener('change',readURL,false);
body.addEventListener('click',checkDelete,false);
deleteAll.addEventListener('click',checkDeleteAll,false);
$(document).ready(function(){
    gotop.addEventListener('click',function(e){
        e.preventDefault();
        $("html,body").stop().animate({"scrollTop":"0"},"slow");
    },false);
});
update();