 var userData = "";
window.onload = function(){
 // var userTable = document.getElementById("usertaskbody");
  var storageDataObj = JSON.parse(localStorage.Admin);
  currentUser = localStorage.getItem("userName");
   userData =storageDataObj[currentUser];
  for(var i=0;i<userData.length;i++){ 
    var newRow = "<tr><td>1</td><td>AutoComplete Feature</td><td>Chandu</td><td><select><option value='Pradep P'> Pradeep P</option><option value='Darshan Sagar L'>Darshan Sagar L</option><option value='Harish Babu'>Harish Babu</option><option value='Sahas Chowdry'>Sahas Chowdry</option></select></td><td><select onchange='onStatusChange(this)'><option value='None'>None</option><option value='In-Progress'> In-Progress</option><option value='Blocked'> Blocked</option><option value='Completed'> Completed</option></select></td><td></td><td><input type='text' onchange='timeSpent(this)'></td><td><input type='text' onchange='addRemarks(this)'></td></tr>";
    document.getElementById('usertaskbody').innerHTML += newRow;
    var appendTo = document.getElementById('usertaskbody');
    var newRowCount =appendTo.rows.length;
	appendTo.rows[newRowCount-1].cells[0].innerText = newRowCount;
	appendTo.rows[newRowCount-1].cells[1].innerText = userData[i].task;
	var tempSlected = appendTo.rows[newRowCount-1].cells[3];
	$(tempSlected).find("option[value='"+currentUser+"']").attr("selected","selected");
	//$(appendTo.rows[newRowCount-1].cells[4]).find("select").val(userData[i].status);
	if(userData[i].status!==undefined){ 
				var tempStatus = appendTo.rows[newRowCount-1].cells[4];
				$(tempStatus).find("option[value='"+userData[i].status+"']").attr("selected","selected");
	}
   appendTo.rows[newRowCount-1].cells[5].innerText = userData[i].estimatedtime;
  //var ab =  appendTo.rows[newRowCount-1].cells[6];//.firstChild;//value = userData[i].timespent;
 // $(ab).find("input").attr("value",userData[i].timespent);
  appendTo.rows[newRowCount-1].cells[6].firstChild.setAttribute("value",userData[i].timespent);
    if(userData[i].remarks!==undefined){
      appendTo.rows[newRowCount-1].cells[7].firstChild.setAttribute("value",userData[i].remarks);
    }else{
       appendTo.rows[newRowCount-1].cells[7].firstChild.setAttribute("value","");
    }
  }
 generateChart();
}

function onStatusChange(value){
	 var storageDataObj = JSON.parse(localStorage.Admin);
	 var currentUser = localStorage.getItem("userName");
     var userData =storageDataObj[currentUser];
     var status = $(value).val();
     var index = $("tr").index($(value).parents("tr")[0]);
     userData[index-1].status = status;
     localStorage.setItem("Admin",JSON.stringify(storageDataObj));
     generateChart();

}
function timeSpent(value){
   var storageDataObj = JSON.parse(localStorage.Admin);
   var currentUser = localStorage.getItem("userName");
     var userData =storageDataObj[currentUser];
     var timespent = $(value).val();
     var index = $("tr").index($(value).parents("tr")[0]);
     userData[index-1].timespent = timespent;
     localStorage.setItem("Admin",JSON.stringify(storageDataObj));
}

function generateChart(){
  var w = 400;
var h = 400;
var r = h/2;
var aColor = [
    'rgb(178, 55, 56)',
    'rgb(213, 69, 70)',
    'rgb(230, 125, 126)',
    'rgb(239, 183, 182)'
]

/*var data = [
    {"label":"Colorectale levermetastase (n=336)", "value":74}, 
    {"label": "Primaire maligne levertumor (n=56)", "value":12},
    {"label":"Levensmetatase van andere origine (n=32)", "value":7}, 
    {"label":"Beningne levertumor (n=34)", "value":7}
];*/
var storageDataObj = JSON.parse(localStorage.Admin);
var currentUser = localStorage.getItem("userName");
var currentUserData =storageDataObj[currentUser];
//var currentUserData = userData;
var totalRecord = currentUserData.length;
var data = [];
var noneCount =0,completedCount = 0,blockedCount = 0,inProgressCount=0;
for(var i = 0;i<currentUserData.length;i++){
  if(currentUserData[i].status=="In-Progress"){
    inProgressCount++;
  }else if(currentUserData[i].status=="Blocked"){
    blockedCount++;
  }else if(currentUserData[i].status=="Completed"){
    completedCount++;
  }else{
    noneCount++;
  }
}
var percentage = 100;
var value = 0;
data.push({"text":"In-Progress","value":Number(((inProgressCount/totalRecord)*100).toString().slice(0,4))});
//percentage = percentage-value;blockedCount
data.push({"text":"Blocked","value":Number(((blockedCount/totalRecord)*100).toString().slice(0,4))});
//percentage = percentage-value;completedCount
data.push({"text":"Completed","value":Number(((completedCount/totalRecord)*100).toString().slice(0,4))});
//percentage = percentage-value;noneCount
data.push({"text":"None","value":Number(((noneCount/totalRecord)*100).toString().slice(0,4))});
$("#chart").find("svg").remove();
var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

var pie = d3.layout.pie().value(function(d){
  return d.value;
});

// Declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// Select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){return aColor[i];})
    .attr("d", function (d) {return arc(d);})
;

// Add the text
arcs.append("svg:text")
    .attr("transform", function(d){
        d.innerRadius = 100;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}
    )
    .attr("text-anchor", "middle")
    .text( function(d, i) {
      if(data[i].value!==0)
      return data[i].text+":"+data[i].value + '%';
    });
}

function fnExcelReport()
         {
               var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
               var textRange; var j=0;
               tab = document.getElementById('usertable'); // id of table
  
               for(j = 0 ; j < tab.rows.length ; j++) 
               {     
                     tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
                     //tab_text=tab_text+"</tr>";
               }
  
               tab_text=tab_text+"</table>";
   
  
               var ua = window.navigator.userAgent;
               var msie = ua.indexOf("MSIE "); 
  
               if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
               {
                  txtArea1.document.open("txt/html","replace");
                  txtArea1.document.write(tab_text);
                  txtArea1.document.close();
                  txtArea1.focus(); 
                  sa=txtArea1.document.execCommand("SaveAs",true,"Global View Task.xls");
               }  
               else //other browser not tested on IE 11
                  sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  
                 return (sa);
         }
function table2excel(){
  $("#usertable").table2excel({
    // exclude CSS class
    exclude: ".noExl",
    name: "Worksheet Name",
    filename: "SomeFile" //do not include extension
  });

}

function filterUserStatus(obj){
  var currentUser = localStorage.getItem("userName");
  var storageDataObj = JSON.parse(localStorage.Admin);
  var userData =storageDataObj[currentUser];
  var currentUserStatus = $("#userStatus").val();
  $("#usertaskbody").children().remove();
  if(currentUserStatus!=="All"){ 
    for(var i=0;i<userData.length;i++){ 
      if(userData[i].status==currentUserStatus){ 
        var newRow = "<tr><td>1</td><td>AutoComplete Feature</td><td>Chandu</td><td><select><option value='Pradep P'> Pradeep P</option><option value='Darshan Sagar L'>Darshan Sagar L</option><option value='Harish Babu'>Harish Babu</option><option value='Sahas Chowdry'>Sahas Chowdry</option></select></td><td><select onchange='onStatusChange(this)'><option value='None'>None</option><option value='In-Progress'> In-Progress</option><option value='Blocked'> Blocked</option><option value='Completed'> Completed</option></select></td><td></td><td><input type='text' onchange='timeSpent(this)'></td><td><input type='text' onchange='addRemarks(this)'></td></tr>";
        document.getElementById('usertaskbody').innerHTML += newRow;
        var appendTo = document.getElementById('usertaskbody');
        var newRowCount =appendTo.rows.length;
        appendTo.rows[newRowCount-1].cells[0].innerText = newRowCount;
        appendTo.rows[newRowCount-1].cells[1].innerText = userData[i].task;
        var tempSlected = appendTo.rows[newRowCount-1].cells[3];
        $(tempSlected).find("option[value='"+currentUser+"']").attr("selected","selected");
        //$(appendTo.rows[newRowCount-1].cells[4]).find("select").val(userData[i].status);
        if(userData[i].status!==undefined){ 
              var tempStatus = appendTo.rows[newRowCount-1].cells[4];
              $(tempStatus).find("option[value='"+userData[i].status+"']").attr("selected","selected");
        }
        appendTo.rows[newRowCount-1].cells[5].innerText = userData[i].estimatedtime;
       // appendTo.rows[newRowCount-1].cells[6].firstChild.value = userData[i].timespent;
      /* var ab =  appendTo.rows[newRowCount-1].cells[6];//.firstChild;//value = userData[i].timespent;
      $(ab).find("input").attr("value",userData[i].timespent);*/
      appendTo.rows[newRowCount-1].cells[6].firstChild.setAttribute("value",userData[i].timespent);
      if(userData[i].remarks!==undefined){
        appendTo.rows[newRowCount-1].cells[7].firstChild.setAttribute("value",userData[i].remarks);
      }else{
       appendTo.rows[newRowCount-1].cells[7].firstChild.setAttribute("value","");
      }
      }
    }
  }else{
    window.onload();
  }
 //generateChart();
}

function addRemarks(value){
   var storageDataObj = JSON.parse(localStorage.Admin);
   var currentUser = localStorage.getItem("userName");
   var userData =storageDataObj[currentUser];
   var remarks = $(value).val();
   var index = $("tr").index($(value).parents("tr")[0]);
   userData[index-1].remarks = remarks;
   localStorage.setItem("Admin",JSON.stringify(storageDataObj));
}
