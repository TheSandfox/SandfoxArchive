function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	var outFile = '../json/CustomString.json'
	var outputJ = 'C:/war3lib/maps/SkillArchive/Game/GeneratedCustomString.j'
	excelReader(xlsx,{ sheet: 'CustomString' }).then((rows) => {
		//json
		var i = 1;
		var j = 2;
		var first = true
		var firstsub = true
		fs.writeFileSync(outFile,'{','utf-8');
		fs.writeFileSync(outputJ,'//! textmacro generatedCustomString','utf-8')
		while (i<rows.length) {
			j = 2;
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
				//내용JSON
				switch(j) {
					case 4 :
						fs.appendFileSync(outFile,'"ui/widgets/tooltips/human/'+rows[i][j]+'.png"','utf-8')
						break;
					default :
						fs.appendFileSync(outFile,'"'+rows[i][j]+'"','utf-8')
				}
				
				//내용J
				switch(j) {
					case 3 :
						fs.appendFileSync(outputJ,'\n\tset CUSTOM_STRING_'+rows[i][1]+'_'+rows[0][j]+'['+rows[i][0]+'] = "|cff'+rows[i][j]+'"','utf-8')
						break;
					case 4 : 
						fs.appendFileSync(outputJ,'\n\tset CUSTOM_STRING_'+rows[i][1]+'_'+rows[0][j]+'['+rows[i][0]+'] = "ui\\\\widgets\\\\tooltips\\\\human\\\\'+rows[i][j]+'.blp"','utf-8')
						break;
					default :
						fs.appendFileSync(outputJ,'\n\tset CUSTOM_STRING_'+rows[i][1]+'_'+rows[0][j]+'['+rows[i][0]+'] = "'+rows[i][j]+'"','utf-8')
				}
				j++;
			}
			fs.appendFileSync(outFile,'\n\t}','utf-8')
			i++;
		}
		fs.appendFileSync(outFile,'\n}','utf-8')
		fs.appendFileSync(outputJ,'\n//! endtextmacro','utf-8')
		//j
		
	});
}

module.exports = main