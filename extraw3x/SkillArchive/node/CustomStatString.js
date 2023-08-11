function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	var outFile = '../json/CustomString/CustomStatString.json'
	excelReader(xlsx,{ sheet: 'CustomStatString' }).then((rows) => {
		var i = 1;
		var j = 1;
		var first = true
		var firstsub = true
		fs.writeFileSync(outFile,'{','utf-8');
		while (i<rows.length) {
			j = 1;
			firstsub = true
			//멤버네임
			if (first) {
				fs.appendFileSync(outFile,'\n\t"'+rows[i][0]+'":{','utf-8')
				first = false
			} else {
				fs.appendFileSync(outFile,',\n\t"'+rows[i][0]+'":{','utf-8')
			}
			while (j<rows[0].length) {
				//멤버네임
				if(firstsub) {
					fs.appendFileSync(outFile,'\n\t\t"'+rows[0][j]+'":','utf-8')
					firstsub = false
				} else {
					fs.appendFileSync(outFile,',\n\t\t"'+rows[0][j]+'":','utf-8')
				}
				//내용
				fs.appendFileSync(outFile,'"'+rows[i][j]+'"','utf-8')
				j++;
			}
			fs.appendFileSync(outFile,'\n\t}','utf-8')
			i++;
		}
		fs.appendFileSync(outFile,'\n}','utf-8')
	});
}

module.exports = main