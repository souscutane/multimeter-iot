$(document).ready(function(){
    $.get('/analog/', function(json, status){
        console.log(json.value)
    })
})