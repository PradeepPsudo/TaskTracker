function moveToSpecificPage(argument) {
	var currentLocation = window.location.href;
	var newPage = currentLocation.split("/");
	var userName = $("#username").val();
	localStorage.setItem("userName",userName);
	if(userName=="Chandu"|| userName=="chandu"){ 
	 newPage[newPage.length-1] = "Admin.html";
	}else{
	 newPage[newPage.length-1] = "User.html";
	}
	location.href = newPage.join("/");
}