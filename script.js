$(document).ready(function(){
$("button").click(function(){
    postData();
});
});
var tmout;
var codeId;
function fetchData(){
    var request=new XMLHttpRequest();

    request.open("GET", "https://codequotient.com/api/codeResult/"+codeId);

    request.send();

    request.addEventListener("load", function(event){
        var data=JSON.parse(request.responseText);
        var ans=JSON.parse(data["data"]);
        console.log(ans);
        var lang=document.getElementById("lang").value;
        $("#op").empty();
        if(ans["output"]!=""){
        $("#op").append(ans["output"]);
        }
        else if(ans["errors"]!=""){
            $("#op").append(ans["errors"]);
        }
        clearTimeout(tmout);
    });
};


function postData(){
    var receivedData=getData();

     var request=new XMLHttpRequest();

     request.open("POST", "https://codequotient.com/api/executeCode");

     request.setRequestHeader("Content-Type", "application/json");

     request.send(JSON.stringify(receivedData));

     request.addEventListener("load", function(){
        var data=JSON.parse(request.responseText);
        if("codeId" in data){
            codeId=data["codeId"];
            tmout=setTimeout(fetchData, 5000);
        }
        else{
            console.log(data["error"]);
            $("#op").empty();
            $("#op").append(data["error"]);
        }

     });
}


function getData(){
    var code=document.getElementById("code").value;
    var lang=document.getElementById("lang").value;

    var receivedData={"code":code , "langId":lang};
    return receivedData;
}

