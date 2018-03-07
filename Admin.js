window.onload = function(){
  var storageDataObj = JSON.parse(localStorage.Admin);
  if($("#taskBody").children().length>0){
  		$("#taskBody").children().remove();
  }
  for(keys in storageDataObj){
  	var individualDataObj = storageDataObj[keys];	
  	for(var i=0;i<individualDataObj.length;i++){
  		var appendingRow = '<tr><td><input type="checkbox" onchange="addCheckboxClass(this)"></td><td></td><td></td><td><select><option value="Pradeep P"> Pradeep P</option><option value="Darshan Sagar L">Darshan Sagar L</option><option value="Harish Babu">Harish Babu</option><option value="Sahas Chowdry">Sahas Chowdry</option></select></td><td><select onchange="onStatusChange(this)"><option value="None">None</option><option value="In-Progress"> In-Progress</option><option value="Blocked"> Blocked</option><option value="Completed"> Completed</option></select></td><td></td><td><input type="text"></input></td><td><input type="text" onchange="addPORemarks(this)"></td><td><select onchange="changeItemType(this)"><option value="Epic"> Epic</option><option value="Stories">Stories</option><option value="Tasks">Tasks</option><option value="Bugs">Bugs</option><option value="Subtasks">Subtasks</option></select></td><td><img src="icons8-edit-image-50.png" onclick="editRespectiveRow(this)" style="width:15px"></td></tr>';
  		document.getElementById('taskBody').innerHTML += appendingRow;
  		var newRow = document.getElementById('taskBody');
		var newRowCount =newRow.rows.length;
		newRow.rows[newRowCount-1].cells[1].innerText = newRowCount;
		newRow.rows[newRowCount-1].cells[2].innerText = individualDataObj[i].task;
		var tempSlected = newRow.rows[newRowCount-1].cells[3];
		$(tempSlected).find("option[value='"+keys+"']").attr("selected","selected");
		if(individualDataObj[i].status!==undefined){ 
			var tempStatus = newRow.rows[newRowCount-1].cells[4];
			$(tempStatus).find("option[value='"+individualDataObj[i].status+"']").attr("selected","selected");
		}
		newRow.rows[newRowCount-1].cells[5].innerText = individualDataObj[i].estimatedtime;
		//newRow.rows[newRowCount-1].cells[6].firstChild.innerText  = individualDataObj[i].timespent;
		newRow.rows[newRowCount-1].cells[6].firstChild.setAttribute("value",individualDataObj[i].timespent);
		if(individualDataObj[i].remarks!==undefined){
	      newRow.rows[newRowCount-1].cells[7].firstChild.setAttribute("value",individualDataObj[i].remarks);
	    }else{
	       newRow.rows[newRowCount-1].cells[7].firstChild.setAttribute("value","");
	    }
	    if(individualDataObj[i].itemtype!==undefined){ 
			var tempStatus = newRow.rows[newRowCount-1].cells[8];
			$(tempStatus).find("option[value='"+individualDataObj[i].itemtype+"']").attr("selected","selected");
		}
		//$(newRow.rows[newRowCount-1].cells[4]).find("select").val(individualDataObj[i].status);
		//"{"Pradeep P":[],"Darshan Sagar L":[{"task":"Search Enhancement"}],"Harish Babu":[{"task":"New Widget Addition"}],"Sahas Chowdry":[{"task":"Generation Changes"}]}"
  	}
  }
  generateChart();

};
function filterTask(obj){
	//var filteredUser = $("#filterByUser").val();
	//var storageDataObj = JSON.parse(localStorage.Admin);
  var storageDataObj = JSON.parse(localStorage.Admin);
  var currentUser = $("#filterByUser").val();
  var currentStatus = $("#filterByStatus").val();
  $("#taskBody").children().remove();
  if(currentUser=="All"&&currentStatus=="All"){
  	window.onload();
  }else if(currentUser!=="All" && currentStatus!=="All"){ 
	var individualDataObj =storageDataObj[currentUser];
	specificUserSpecificStatus(individualDataObj,currentStatus,currentUser);
    /*for(var i=0;i<individualDataObj.length;i++){ 
	    var appendingRow = '<tr><td><input type="checkbox" onchange="addCheckboxClass(this)"></td><td></td><td></td><td><select><option value="Pradeep P"> Pradeep P</option><option value="Darshan Sagar L">Darshan Sagar L</option><option value="Harish Babu">Harish Babu</option><option value="Sahas Chowdry">Sahas Chowdry</option></select></td><td><select onchange="onStatusChange(this)"><option value="None">None</option><option value="In-Progress"> In-Progress</option><option value="Blocked"> Blocked</option><option value="Completed"> Completed</option></select></td></tr>';
		document.getElementById('taskBody').innerHTML += appendingRow;
		var newRow = document.getElementById('taskBody');
		var newRowCount =newRow.rows.length;
		newRow.rows[newRowCount-1].cells[1].innerText = newRowCount;
		newRow.rows[newRowCount-1].cells[2].innerText = individualDataObj[i].task;
		var tempSlected = newRow.rows[newRowCount-1].cells[3];
		$(tempSlected).find("option[value='"+currentUser+"']").attr("selected","selected");
		if(individualDataObj[i].status!==undefined){ 
			var tempStatus = newRow.rows[newRowCount-1].cells[4];
			$(tempStatus).find("option[value='"+individualDataObj[i].status+"']").attr("selected","selected");
		}
  	}*/
  }else if(currentUser=="All" && currentStatus!=="All"){
  	allUserSpecificStatus(storageDataObj,currentStatus);
  }else if(currentUser!=="All"&& currentStatus=="All"){
  	var individualDataObj =storageDataObj[currentUser];
  	specificUserAllStatus(individualDataObj,currentUser);
  }
  generateChart();
}
/*function filterByStatus(obj){
	var currentStatus = $("#filterByUser").val();
	var currentUser = $("#filterByUser").val();
	if(currentStatus=="All" && currentUser=="All"){
		window.onload();
	}else if(currentUSer=="All" && currentStatus!=="All"){

	}else if(currentUSer!=="All"&&){

	}
}*/
function addTask(event){
	 var popup = document.getElementById("myPopup");
	  popup.classList.toggle("show");
}

function addCheckboxClass(pobject){
	pobject.parentElement.parentElement.classList.add("checked");
}

function toggleFunction(e){
	var appendingRow = '<tr><td><input type="checkbox" onchange="addCheckboxClass(this)"></td><td></td><td></td><td><select><option value="Pradeep P"> Pradeep P</option><option value="Darshan Sagar L">Darshan Sagar L</option><option value="Harish Babu">Harish Babu</option><option value="Sahas Chowdry">Sahas Chowdry</option></select></td><td><select onchange="onStatusChange(this)"><option value="None">None</option><option  value="In-Progress"> In-Progress</option><option value="Blocked"> Blocked</option><option value="Completed"> Completed</option></select></td><td></td><td><input type="text"></td><td><input type="text" onchange="addPORemarks(this)"></td><td><select onchange="changeItemType(this)"><option value="Epic"> Epic</option><option value="Stories">Stories</option><option value="Tasks">Tasks</option><option value="Bugs">Bugs</option><option value="Subtasks">Subtasks</option></select></td><td><img src="icons8-edit-image-50.png" onclick="editRespectiveRow(this)" style="width:15px"></td></tr>';
	document.getElementById('taskBody').innerHTML += appendingRow;
	var descrption = document.getElementById("popupdescription").value;
	var assignee = document.getElementById("assignee").value;
	var assigneeIndex = document.getElementById("assignee").selectedIndex;
	var status = document.getElementById("status").value;
	var itemType = document.getElementById("itemtype").value;
	var newRow = document.getElementById('taskBody');
	var estimatedtime = document.getElementById("estimatedtime").value;
	var newRowCount =newRow.rows.length;
	if(checkIfExistInLocalStorage(descrption,assignee)){
		newRow.rows[newRowCount-1].cells[1].innerText = newRowCount;
		newRow.rows[newRowCount-1].cells[2].innerText = descrption;
		newRow.rows[newRowCount-1].cells[3].firstElementChild .options[assigneeIndex].setAttribute("selected","selected");
		if(status!==undefined){
			var tempStatus = newRow.rows[newRowCount-1].cells[4];
			$(tempStatus).find("option[value='"+status+"']").attr("selected","selected");
		}
		newRow.rows[newRowCount-1].cells[5].innerText = estimatedtime;
		// newRow.rows[newRowCount-1].cells[6].firstChild.value  = 0;
		newRow.rows[newRowCount-1].cells[6].firstChild.setAttribute("value",0);
		if(itemType!==undefined){
			var itemTypeField = newRow.rows[newRowCount-1].cells[8];
			$(itemTypeField).find("option[value='"+itemType+"']").attr("selected","selected");
		}
	}else{
		$("#taskBody").remove(newRow.rows[newRowCount-1]);
	}
	 var popup = document.getElementById("myPopup");
     popup.classList.toggle("show");
}

function deleteTask(){
	var tbody = document.getElementById('taskBody');
	var deleteFromLocalStorage = $(".checked");
	var localStorageData = JSON.parse(localStorage.Admin);
	for(var i=0;i<deleteFromLocalStorage.length;i++){
		var description = deleteFromLocalStorage[i].cells[2].innerText;
		var tempAssignee = $(deleteFromLocalStorage[i].cells[3]).find("option[selected='selected']")[0];
		var assignee = tempAssignee.value;
		var assigneeData = localStorageData[assignee];
		for(var j=0;j<assigneeData.length;j++){
			if(assigneeData[j].task==description){
				localStorageData[assignee].splice(j,1);
			}
		}
	}
	localStorage.setItem("Admin",JSON.stringify(localStorageData));
	$(".checked").remove();

}
function savePoData(){
	var descrption = document.getElementById("popupdescription").value;
	var assignee = document.getElementById("assignee").value;
	var status = document.getElementById("status").value;
	var estimatedtime = document.getElementById("estimatedtime").value;
	var itemType = document.getElementById("itemtype").value;
	var storageDataObj = JSON.parse(localStorage.Admin);
	var timespent = 0;
	var storeObj = {"task":descrption,"status":status,"estimatedtime":estimatedtime,"timespent":timespent,"itemtype":itemType};
	if(checkIfExistInLocalStorage(descrption,assignee) && descrption!==""){ 
	 storageDataObj[assignee].push(storeObj);
	 var storageDataStr = JSON.stringify(storageDataObj);
	 localStorage.setItem("Admin",storageDataStr);
	}
}

function checkIfExistInLocalStorage(descrption,assignee){
	var flag = true;
	var storageDataObj = JSON.parse(localStorage.Admin);
	var particularUserObj = storageDataObj[assignee];
	particularUserObj.forEach(function(obj){
		if(obj.task == descrption && descrption!==""){
			flag = false;
		}
	});
	return flag;
}

function onStatusChange(value){
	if(!document.getElementById("editPopUp").classList.contains("show")){ 
		 var storageDataObj = JSON.parse(localStorage.Admin);
		 var currentUser = $(value).parents("tr").find("select").val();
		 var descrptionField = $(value).parents("tr").find("td")[2];
		 var descrption = descrptionField.innerText;
	     var userData =storageDataObj[currentUser];
	     var status = $(value).val();
	     var index = $("tr").index($(value).parents("tr")[0]);
	     var itemIndex;
	     userData.forEach(function(elem,index){
	     	if(elem.task==descrption){
	     		itemIndex = index;
	     	}
	     });
	     if(itemIndex!==undefined){
	      userData[itemIndex].status = status;
	 	 }
	     localStorage.setItem("Admin",JSON.stringify(storageDataObj));
	     generateChart();
 	}

}

function exportToExcel(){
 /* var str="";
  var myTableHead = document.getElementById('headers');
  var rowCount = myTableHead.rows.length;
  var colCount = myTableHead.getElementsByTagName("tr")[0].getElementsByTagName("th").length; 
  var ExcelSheet = new ActiveXObject("Excel.Sheet");
  ExcelSheet.Application.Visible = true;
  for(var i=0; i<rowCount; i++) {   
    for(var j=0; j<colCount; j++) 
    {           
        str= myTableHead.getElementsByTagName("tr")[i].getElementsByTagName("th")[j].innerHTML;
        ExcelSheet.ActiveSheet.Cells(i+1,j+1).Value = str;
    }
  }*/

  /*var tableToExcel = (function () {
       var uri = 'data:application/vnd.ms-excel;base64,'
       , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"      
         xmlns:x="urn:schemas-microsoft-com:office:excel"    
         xmlns="http://www.w3.org/TR/REC-
         html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook>   
        <x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name> 
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions> 
        </x:ExcelWorksheet></x:ExcelWorksheets>
        </x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" 
        content="text/plain; charset=UTF-8"/></head><body><table>{table}
         </table></body></html>'
         base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s)))}, 
         format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) {     
         return c[p]; }) }
         return function (table, name) {
              if (!table.nodeType) table = document.getElementById(table)
              var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
              window.location.href = uri + base64(format(template, ctx))
           }
        })*/

        /*
        $("#btnExport").click(function (e) {
    window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
    e.preventDefault();
	});
	*/
}
function allUserSpecificStatus(storageDataObj,currentStatus){
for(keys in storageDataObj){
  	var individualDataObj = storageDataObj[keys];	
  	for(var i=0;i<individualDataObj.length;i++){
  		if(individualDataObj[i].status==currentStatus){ 
	  		var appendingRow = '<tr><td><input type="checkbox" onchange="addCheckboxClass(this)"></td><td></td><td></td><td><select><option value="Pradeep P"> Pradeep P</option><option value="Darshan Sagar L">Darshan Sagar L</option><option value="Harish Babu">Harish Babu</option><option value="Sahas Chowdry">Sahas Chowdry</option></select></td><td><select onchange="onStatusChange(this)"><option value="None">None</option><option value="In-Progress"> In-Progress</option><option value="Blocked"> Blocked</option><option value="Completed"> Completed</option></select></td><td></td><td><input type="text"></td><td><input type="text" onchange="addPORemarks(this)"></td><td><select onchange="changeItemType(this)"><option value="Epic"> Epic</option><option value="Stories">Stories</option><option value="Tasks">Tasks</option><option value="Bugs">Bugs</option><option value="Subtasks">Subtasks</option></select></td><td><img src="icons8-edit-image-50.png" onclick="editRespectiveRow(this)" style="width:15px"></td></tr>';
	  		document.getElementById('taskBody').innerHTML += appendingRow;
	  		var newRow = document.getElementById('taskBody');
			var newRowCount =newRow.rows.length;
			newRow.rows[newRowCount-1].cells[1].innerText = newRowCount;
			newRow.rows[newRowCount-1].cells[2].innerText = individualDataObj[i].task;
			var tempSlected = newRow.rows[newRowCount-1].cells[3];
			$(tempSlected).find("option[value='"+keys+"']").attr("selected","selected");
			if(individualDataObj[i].status!==undefined){ 
				var tempStatus = newRow.rows[newRowCount-1].cells[4];
				$(tempStatus).find("option[value='"+individualDataObj[i].status+"']").attr("selected","selected");
			}
			newRow.rows[newRowCount-1].cells[5].innerText = individualDataObj[i].estimatedtime;
			newRow.rows[newRowCount-1].cells[6].firstChild.setAttribute("value",individualDataObj[i].timespent);
			if(individualDataObj[i].remarks!==undefined){
		      newRow.rows[newRowCount-1].cells[7].firstChild.setAttribute("value",individualDataObj[i].remarks);
		    }else{
		       newRow.rows[newRowCount-1].cells[7].firstChild.setAttribute("value","");
		    }
		    if(individualDataObj[i].itemtype!==undefined){ 
			var itemTypeField = newRow.rows[newRowCount-1].cells[8];
			$(itemTypeField).find("option[value='"+individualDataObj[i].itemtype+"']").attr("selected","selected");
			}
		//$(newRow.rows[newRowCount-1].cells[4]).find("select").val(individualDataObj[i].status);
		//"{"Pradeep P":[],"Darshan Sagar L":[{"task":"Search Enhancement"}],"Harish Babu":[{"task":"New Widget Addition"}],"Sahas Chowdry":[{"task":"Generation Changes"}]}"
  		}
  	}
  }
}
function specificUserSpecificStatus(individualDataObj,currentStatus,currentUser){
	for(var i=0;i<individualDataObj.length;i++){ 
		if(individualDataObj[i].status==currentStatus){ 
		    var appendingRow = '<tr><td><input type="checkbox" onchange="addCheckboxClass(this)"></td><td></td><td></td><td><select><option value="Pradeep P"> Pradeep P</option><option value="Darshan Sagar L">Darshan Sagar L</option><option value="Harish Babu">Harish Babu</option><option value="Sahas Chowdry">Sahas Chowdry</option></select></td><td><select onchange="onStatusChange(this)"><option value="None">None</option><option value="In-Progress"> In-Progress</option><option value="Blocked"> Blocked</option><option value="Completed"> Completed</option></select></td><td></td><td><input type="text"></td><td><input type="text" onchange="addPORemarks(this)"></td><td><select onchange="changeItemType(this)"><option value="Epic"> Epic</option><option value="Stories">Stories</option><option value="Tasks">Tasks</option><option value="Bugs">Bugs</option><option value="Subtasks">Subtasks</option></select></td><td><img src="icons8-edit-image-50.png" onclick="editRespectiveRow(this)" style="width:15px"></td></tr>';
			document.getElementById('taskBody').innerHTML += appendingRow;
			var newRow = document.getElementById('taskBody');
			var newRowCount =newRow.rows.length;
			newRow.rows[newRowCount-1].cells[1].innerText = newRowCount;
			newRow.rows[newRowCount-1].cells[2].innerText = individualDataObj[i].task;
			var tempSlected = newRow.rows[newRowCount-1].cells[3];
			$(tempSlected).find("option[value='"+currentUser+"']").attr("selected","selected");
			if(individualDataObj[i].status!==undefined){ 
				var tempStatus = newRow.rows[newRowCount-1].cells[4];
				$(tempStatus).find("option[value='"+individualDataObj[i].status+"']").attr("selected","selected");
			}
			newRow.rows[newRowCount-1].cells[5].innerText = individualDataObj[i].estimatedtime;
			newRow.rows[newRowCount-1].cells[6].firstChild.setAttribute("value",individualDataObj[i].timespent);
			if(individualDataObj[i].remarks!==undefined){
		      newRow.rows[newRowCount-1].cells[7].firstChild.setAttribute("value",individualDataObj[i].remarks);
		    }else{
		       newRow.rows[newRowCount-1].cells[7].firstChild.setAttribute("value","");
		    }
		    if(individualDataObj[i].itemtype!==undefined){
			var itemTypeField = newRow.rows[newRowCount-1].cells[8];
			$(itemTypeField).find("option[value='"+itemType+"']").attr("selected","selected");
		}
		}
  	}
}
function specificUserAllStatus(individualDataObj,currentUser){
	for(var i=0;i<individualDataObj.length;i++){ 
	    var appendingRow = '<tr><td><input type="checkbox" onchange="addCheckboxClass(this)"></td><td></td><td></td><td><select><option value="Pradeep P"> Pradeep P</option><option value="Darshan Sagar L">Darshan Sagar L</option><option value="Harish Babu">Harish Babu</option><option value="Sahas Chowdry">Sahas Chowdry</option></select></td><td><select onchange="onStatusChange(this)"><option value="None">None</option><option value="In-Progress"> In-Progress</option><option value="Blocked"> Blocked</option><option value="Completed"> Completed</option></select></td><td></td><td><input type="text"></td><td><input type="text" onchange="addPORemarks(this)"></td><td><select onchange="changeItemType(this)"><option value="Epic"> Epic</option><option value="Stories">Stories</option><option value="Tasks">Tasks</option><option value="Bugs">Bugs</option><option value="Subtasks">Subtasks</option></select></td><td><img src="icons8-edit-image-50.png" onclick="editRespectiveRow(this)" style="width:15px"></td></tr>';
		document.getElementById('taskBody').innerHTML += appendingRow;
		var newRow = document.getElementById('taskBody');
		var newRowCount =newRow.rows.length;
		newRow.rows[newRowCount-1].cells[1].innerText = newRowCount;
		newRow.rows[newRowCount-1].cells[2].innerText = individualDataObj[i].task;
		var tempSlected = newRow.rows[newRowCount-1].cells[3];
		$(tempSlected).find("option[value='"+currentUser+"']").attr("selected","selected");
		if(individualDataObj[i].status!==undefined){ 
			var tempStatus = newRow.rows[newRowCount-1].cells[4];
			$(tempStatus).find("option[value='"+individualDataObj[i].status+"']").attr("selected","selected");
		}
		newRow.rows[newRowCount-1].cells[5].innerText = individualDataObj[i].estimatedtime;
		newRow.rows[newRowCount-1].cells[6].firstChild.setAttribute("value",individualDataObj[i].timespent);
		if(individualDataObj[i].remarks!==undefined){
	      newRow.rows[newRowCount-1].cells[7].firstChild.setAttribute("value",individualDataObj[i].remarks);
	    }else{
	       newRow.rows[newRowCount-1].cells[7].firstChild.setAttribute("value","");
	    }
	    if(individualDataObj[i].itemtype!==undefined){ 
			var itemTypeField = newRow.rows[newRowCount-1].cells[8];
			$(itemTypeField).find("option[value='"+individualDataObj[i].itemtype+"']").attr("selected","selected");
		}
  	}
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
var currentUser =  $("#filterByUser").val();
var totalRecord ="";
var noneCount =0,completedCount = 0,blockedCount = 0,inProgressCount=0;
var data = [];
//var currentUser = localStorage.getItem("userName");
if(currentUser!=="All"){ 
	var currentUserData =storageDataObj[currentUser];
	//var currentUserData = userData;
    totalRecord = currentUserData.length;
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
}else{
	var count=0;
	for(keys in storageDataObj){
	  	var currentUserData = storageDataObj[keys];	
	  	for(var i=0;i<currentUserData.length;i++){
	  		if(currentUserData[i].status=="In-Progress"){
			   inProgressCount++;
		    }else if(currentUserData[i].status=="Blocked"){
			    blockedCount++;
			}else if(currentUserData[i].status=="Completed"){
			    completedCount++;
			}else{
			    noneCount++;
			}
			count++;
	  	}
  }
  totalRecord = count;
}
var percentage = 100;
var value = 0;
data.push({"text":"In-Progress","value":Number(((inProgressCount/totalRecord)*100).toString().slice(0,4))});
//percentage = percentage-value; blockedCount
data.push({"text":"Blocked","value":Number(((blockedCount/totalRecord)*100).toString().slice(0,4))});
//percentage = percentage-value; completedCount
data.push({"text":"Completed","value":Number(((completedCount/totalRecord)*100).toString().slice(0,4))});
//percentage = percentage-value; noneCount
data.push({"text":"None","value":Number(((noneCount/totalRecord)*100).toString().slice(0,4))});
$("#adminChart").find("svg").remove();
var vis = d3.select('#adminChart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

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

function table2excelAdmin(){
  $("#tasktable").table2excel({
    // exclude CSS class
    exclude: ".noExl",
    name: "Worksheet Name",
    filename: "SomeFile" //do not include extension
  });

}

function addPORemarks(value){
	 var storageDataObj = JSON.parse(localStorage.Admin);
	 var currentUser = $(value).parents("tr").find("select").val();
	 var remarksField = $(value).parents("tr").find("td")[7];
	 var remarks = remarksField.firstElementChild.value;
     var userData =storageDataObj[currentUser];
     var index = $("tr").index($(value).parents("tr")[0]);
     userData[index-1].remarks = remarks;
     localStorage.setItem("Admin",JSON.stringify(storageDataObj));
}

function changeItemType(value){
	if(document.getElementById("editPopUp").classList.contains("show")){ 
	 var storageDataObj = JSON.parse(localStorage.Admin);
	 var currentUser = $(value).parents("tr").find("select").val();
	 var itemTypeField = $(value).parents("tr").find("td")[8];
	 var itemType = itemTypeField.firstElementChild.value;
     var userData =storageDataObj[currentUser];
     var index = $("tr").index($(value).parents("tr")[0]);
     userData[index-1].itemtype = itemType;
     localStorage.setItem("Admin",JSON.stringify(storageDataObj));
 	}
}

function editRespectiveRow(value){
	 var popup = document.getElementById("editPopUp");
	 popup.classList.toggle("show");
	 var index = $("tr").index($(value).parents("tr")[0]);
	 var rowValues = $("tr")[index].cells;
	 document.getElementById("editpopupdescription").value =rowValues[2].innerText;
	 document.getElementById("editassignee").value = rowValues[3].firstElementChild.value;
	 document.getElementById("editstatus").value = rowValues[4].firstElementChild.value;
	 document.getElementById("editestimatedtime").value = rowValues[5].innerText;
	 document.getElementById("edititemtype").value = rowValues[8].firstElementChild.value;
	 editRowNo = index;
}
	// document.getElementById("editassignee").value = rowValues[3].firstElementChild.value;
	/* var tempSlected = rowValues[3];
	 $(tempSlected).find("option[value='"+rowValues[3].firstElementChild.value+"']").attr("selected","selected");
	 var tempStatus = rowValues[4];
	 $(tempStatus).find("option[value='"+rowValues[3].firstElementChild.value+"']").attr("selected","selected");*/
	/*var storageDataObj = JSON.parse(localStorage.Admin);
	var currentUser = $(value).parents("tr")[0].cells[3].firstElementChild.value; 
	var currentUserData = storageDataObj[currentUser];
	var userDataIndex;
	var descrption = document.getElementById("popupdescription").value;
	var assignee = document.getElementById("assignee").value;
	var status = document.getElementById("status").value;
	var estimatedtime = document.getElementById("estimatedtime").value;
	var itemType = document.getElementById("itemtype").value;
	for(var i=0;i<currentUserData.length;i++){
		if(currentUserData.descrption==descrption){
			userDataIndex = i; break;
		}
	}
	currentUserData[userDataIndex].descrption = descrption;
	currentUserData[userDataIndex].assignee = assignee;
	currentUserData[userDataIndex].status = status;
	currentUserData[userDataIndex].estimatedtime = estimatedtime;
	currentUserData[userDataIndex].itemType = itemType;*/



	//localStorage.setItem("Admin",JSON.stringify(storageDataObj));
	//var storeObj = {"task":descrption,"status":status,"estimatedtime":estimatedtime,"timespent":timespent,"itemtype":itemType};
	//var index = $("tr").index($(value).parents("tr")[0]);
	//console.log(value);

	/* 
		add One more popup for edit and on apply call different Method
	*/
//}

function addAlteredValues(e){
	var descrption = document.getElementById("editpopupdescription").value;
	var assignee = document.getElementById("editassignee").value;
	var status = document.getElementById("editstatus").value;
	var estimatedtime = document.getElementById("editestimatedtime").value;
	var itemType = document.getElementById("edititemtype").value;
	var currentUSerTaskDesc = document.getElementById("editpopupdescription").innerText;
	var storageDataObj = JSON.parse(localStorage.Admin);
	var currentUserData = storageDataObj[assignee];
	var index;
	for(var i=0;i<currentUserData.length;i++){
		if(currentUserData[i].task==descrption){
			index = i; break;
		}
	}
	if(index!==undefined){       
		currentUserData[index].descrption = descrption;
		currentUserData[index].assignee = assignee;
		currentUserData[index].status = status;
		currentUserData[index].estimatedtime = estimatedtime;
		currentUserData[index].itemType = itemType
		localStorage.setItem("Admin",JSON.stringify(storageDataObj));
	}else{
		var timespent = 0;
		var pushData = {"task":descrption,"status":status,"estimatedtime":estimatedtime,"timespent":timespent,"itemtype":itemType};
		currentUserData.push(pushData);
		localStorage.setItem("Admin",JSON.stringify(storageDataObj));
	}
	var popup = document.getElementById("editPopUp");
	 popup.classList.toggle("show");
	 var row = $("tr")[editRowNo];
	 row.cells[2] = descrption;
	 row.cells[3].firstElementChild.value = assignee;
	 row.cells[4].firstElementChild.value = status;
	 row.cells[8].firstElementChild.value = itemType; 
}