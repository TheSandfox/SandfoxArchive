function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	var outFile = './Config.json'
	var outputJ = 'C:/war3lib/maps/SkillArchive/Config.j'
 	excelReader(xlsx,{ sheet: 'Config' }).then((rows) => {
		var i = 0;
		var first = true
		fs.writeFileSync(outFile,'{','utf-8');
		fs.writeFileSync(outputJ,"globals\n",'utf-8');
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
				//내용J
				fs.appendFileSync(outputJ, "constant "+rows[i][0]+" "+rows[i][1]+" = "+rows[i][2]+"\n",'utf-8');
			} else {
				//주석J
				fs.appendFileSync(outputJ, "/*"+rows[i][1]+"*/\n",'utf-8');
			}
			i++;
		}
		fs.appendFileSync(outFile,'\n}','utf-8');
		fs.appendFileSync(outputJ,'endglobals\n','utf-8');
	});
}

module.exports = main