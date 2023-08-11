function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	var outFile = '../json/Config.json'
	excelReader(xlsx,{ sheet: 'Config' }).then((rows) => {
		var i = 0;
		var first = true
		fs.writeFileSync(outFile,'{','utf-8');
		while (i<rows.length) {
			if (rows[i][0]!='annotation') {
				//멤버네임
				if (first) {
					fs.appendFileSync(outFile,'\n"'+rows[i][1]+'":','utf-8');
					first = false
				} else {
					fs.appendFileSync(outFile,',\n"'+rows[i][1]+'":','utf-8');
				}
				//내용
				if (rows[i][0]=='string') {
					fs.appendFileSync(outFile,String(rows[i][2]),'utf-8')
				} else {
					fs.appendFileSync(outFile,'"'+String(rows[i][2])+'"','utf-8')
				}
			}
			i++;
		}
		fs.appendFileSync(outFile,'\n}','utf-8');
	});
}

module.exports = main