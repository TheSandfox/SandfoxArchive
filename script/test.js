
fetch('extraw3x/SkillArchive/json/Ability/Tooltip0100.json')
.then(response => response.json())
.then(data => {
	console.log(data)
	const outputDiv = document.getElementById('jsonOutput');
	outputDiv.innerHTML = data["TOOLTIP"]
})
.catch(error => {
	console.error('Error reading or parsing JSON file:', error);
});

/*var reader = new FileReader();
var jsn = JSON.parse(reader.readAsText())
document.getElementById("jsonOutPut").innerHTML = jsn["TOOLTIP"]*/