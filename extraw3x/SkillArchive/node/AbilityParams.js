function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	var abilityJSONDir = '../json/Ability/'
	var outFile = abilityJSONDir+'AbilityParams.json'
	excelReader(xlsx,{ sheet: 'AbilityParams' }).then((rows) => {
		var i = 0;
		var j = 2;
		var singleFile = ''
		fs.writeFileSync(outFile, "{",'utf-8');
		while (true) {
			//끝까지가면 루프탈출
			if (j==rows[0].length) {
				break;
			}
			singleFile = abilityJSONDir+"Ability"+rows[0][j]+".json"
			//괄호 열기
			if (j==2) {
				fs.appendFileSync(outFile, '\n\t\"'+rows[0][j]+'"'+":{",'utf-8');
			} else {
				fs.appendFileSync(outFile, ',\n\t\"'+rows[0][j]+'"'+":{",'utf-8');
			}
			fs.writeFileSync(singleFile,"{",'utf-8');
			//셀 데이터 기록
			i = 0;
			while (true) {
				if (i==rows.length) {
					break;
				}
				//빈 값이 아닐 때만
				if (rows[i][j]!=null) {
					//멤버네임
					if (i == 0) {
						fs.appendFileSync(outFile, '\n\t\t"'+rows[i][0]+'":','utf-8');
						fs.appendFileSync(singleFile, '\n\t"'+rows[i][0]+'":','utf-8');
					} else {
						fs.appendFileSync(outFile, ',\n\t\t"'+rows[i][0]+'":','utf-8');
						fs.appendFileSync(singleFile, ',\n\t"'+rows[i][0]+'":','utf-8');
					}
					switch (rows[i][1]) {
						case 'iconpath' :
							fs.appendFileSync(outFile, '"ReplaceableTextures/CommandButtons/'+rows[i][j]+'.blp"','utf-8');
							fs.appendFileSync(singleFile, '"ReplaceableTextures/CommandButtons/'+rows[i][j]+'.blp"','utf-8');
							break;
						default :
							fs.appendFileSync(outFile, '"'+rows[i][j]+'"','utf-8');
							fs.appendFileSync(singleFile, '"'+rows[i][j]+'"','utf-8');
							break;
					}
				} else {
		
				}
				//인덱스
				i++;
			}
			//괄호 닫기
			fs.appendFileSync(outFile, "\n\t}",'utf-8');
			fs.appendFileSync(singleFile,"\n}",'utf-8');
			//인덱스 ++
			j++;
		}
		fs.appendFileSync(outFile, "\n}",'utf-8');
	});
}

module.exports = main