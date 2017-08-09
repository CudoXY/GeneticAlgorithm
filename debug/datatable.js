function addTable(){
  var table = "<table border=\"1\" width=\"100%\" style=\"border-collapse: collapse;\">" + 
  			  "<thead>" +
			  "<tr>" +
			    "<th>Gen #</th>" +
			    "<th>Max Fit</th>" +
			    "<th>Average Fit</th>" +
			    "<th>Min Fit</th>" +
			    "<th>Max Fit A* Len</th>" +
			    "<th>Min Fit A* Len</th>" +
			    "<th>Avg Fit A* Len</th>" +
			  "</tr>" +
			  "</thead>" +
			  "<tbody>" +
			  "</tbody>" +
			  "</table>";

	$("body").append(table);
}

function addRow(genno, maxfit, minfit, avgfit, maxAS, minAS, avgAS){
	var data = 
	"<tr>" + 
	"<td>" + genno + "</td>" +
	"<td>" + maxfit + "</td>" + 
	"<td>" + minfit + "</td>" + 
	"<td>" + avgfit + "</td>" + 
	"<td>" + maxAS + "</td>" +
	"<td>" + minAS + "</td>" +
	"<td>" + avgAS + "</td>" +
	"</tr>";

    $("table tbody").append(data);
}