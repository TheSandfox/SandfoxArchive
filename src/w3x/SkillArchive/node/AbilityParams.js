function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	var abilityJSONDir = '../json/Ability/'
	var outFile = '../json/AbilityParams.json'
	var outputJ = 'C:/war3lib/maps/SkillArchive/Ability/AbilityData/GeneratedAbilityParams.j'
	excelReader(xlsx,{ sheet: 'AbilityParams' }).then((rows) => {
		var datafromX = 3;
		var dataType = 2;
		var allowNull = 1;
		var i = 0;
		var j = datafromX;
		var singleFile = ''
		fs.writeFileSync(outFile, '{"params":[','utf-8');
		fs.writeFileSync(outputJ,'','utf-8');
		while (true) {
			//끝까지가면 루프탈출
			if (j==rows[0].length) {
				break;
			}
			singleFile = abilityJSONDir+"Ability"+rows[0][j]+".json"
			//괄호 열기
			if (j==datafromX) {
				fs.appendFileSync(outFile, '\n\t\{','utf-8');
			} else {
				fs.appendFileSync(outFile, ',\n\t\{','utf-8');
			}
			fs.writeFileSync(singleFile,"{",'utf-8');
			//텍매열기J
			fs.appendFileSync(outputJ, '//! textmacro abilityDataHeader'+rows[0][j]+"\nglobals\n",'utf-8');
			//셀 데이터 기록
			i = 0;
			while (true) {
				if (i==rows.length) {
					break;
				}
				//빈 값이 아닐때만
				if (rows[i][j]!=null||rows[i][allowNull]==="true") {
					//멤버네임JSON
					if (i == 0) {
						fs.appendFileSync(outFile, '\n\t\t"'+rows[i][0]+'":','utf-8');
						fs.appendFileSync(singleFile, '\n\t"'+rows[i][0]+'":','utf-8');
					} else {
						fs.appendFileSync(outFile, ',\n\t\t"'+rows[i][0]+'":','utf-8');
						fs.appendFileSync(singleFile, ',\n\t"'+rows[i][0]+'":','utf-8');
					}
					//내용JSON
					switch (rows[i][dataType]) {
						case 'iconpath' :
							fs.appendFileSync(outFile, '"ReplaceableTextures/CommandButtons/'+rows[i][j]+'.png"','utf-8');
							fs.appendFileSync(singleFile, '"ReplaceableTextures/CommandButtons/'+rows[i][j]+'.png"','utf-8');
							break;
						case 'abilitytag' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outFile, '"CONFIG_ABILITY_TAG_'+rows[i][j]+'"','utf-8');
								fs.appendFileSync(singleFile, '"CONFIG_ABILITY_TAG_'+rows[i][j]+'"','utf-8');
							} else {
								fs.appendFileSync(outFile, '"null"','utf-8');
								fs.appendFileSync(singleFile, '"null"','utf-8');
							}
							break;
						case 'casttype' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outFile, '"CONFIG_CAST_TYPE_'+rows[i][j]+'"','utf-8');
								fs.appendFileSync(singleFile, '"CONFIG_CAST_TYPE_'+rows[i][j]+'"','utf-8');
							} else {
								fs.appendFileSync(outFile, '"null"','utf-8');
								fs.appendFileSync(singleFile, '"null"','utf-8');
							}
							break;
						default :
							fs.appendFileSync(outFile, '"'+rows[i][j]+'"','utf-8');
							fs.appendFileSync(singleFile, '"'+rows[i][j]+'"','utf-8');
							break;
					}
					//내용J
					switch (rows[i][dataType]) {
						case 'iconpath' :
							fs.appendFileSync(outputJ, '\tprivate constant string '+rows[i][0]+' = "ReplaceableTextures\\\\CommandButtons\\\\'+rows[i][j]+'.blp"\n','utf-8');
							break;
						case 'fourcc' :
							fs.appendFileSync(outputJ, '\tprivate constant integer '+rows[i][0]+" = '"+rows[i][j]+"'\n",'utf-8');
							break;
						case 'string' :
							fs.appendFileSync(outputJ, '\tprivate constant string '+rows[i][0]+' = "'+rows[i][j]+'"\n','utf-8');
							break;
						case 'abilitytag' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outputJ, "\tprivate constant integer "+rows[i][0]+" = CONFIG_ABILITY_TAG_"+rows[i][j]+"\n",'utf-8');
							} else {
								fs.appendFileSync(outputJ, "\tprivate constant integer "+rows[i][0]+" = -1\n",'utf-8');
							}
							break;
						case 'casttype' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outputJ, "\tprivate constant integer "+rows[i][0]+" = CONFIG_CAST_TYPE_"+rows[i][j]+"\n",'utf-8');
							} else {
								fs.appendFileSync(outputJ, "\tprivate constant integer "+rows[i][0]+" = -1\n",'utf-8');
							}
							break;
						default :
							fs.appendFileSync(outputJ, "\tprivate constant "+rows[i][dataType]+" "+rows[i][0]+" = "+rows[i][j]+"\n",'utf-8');
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
			//괄호닫기J
			fs.appendFileSync(outputJ, "endglobals\n//! endtextmacro\n",'utf-8');
			//인덱스 ++
			j++;
		}
		fs.appendFileSync(outFile, "\n]}",'utf-8');
	});
}

module.exports = main