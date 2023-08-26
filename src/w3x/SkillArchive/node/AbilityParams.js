function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	
	function wwrite(rows,mode) {
		var outFile = ''
		var outputJ = ''
		var prefix = ''
		if (mode==='ability') {
			outFile = '../json/AbilityParams.json'
			outputJ = 'C:/war3lib/maps/SkillArchive/Ability/AbilityData/GeneratedAbilityParams.j'
			prefix = 'private'
		} else if (mode==='buff') {
			outFile = '../json/BuffParams.json'
			outputJ = 'C:/war3lib/maps/SkillArchive/Ability/AbilityData/GeneratedBuffParams.j'
			prefix = 'public'
		}
		var datafromX = 3;
		var dataType = 2;
		var allowNull = 1;
		var i = 0;
		var j = datafromX;
		fs.writeFileSync(outFile, '{"params":[','utf-8');
		fs.writeFileSync(outputJ,'','utf-8');
		while (true) {
			//끝까지가면 루프탈출
			if (j==rows[0].length||rows[0][j]==null) {
				break;
			}
			if (rows[0][j][0]==='e') {
				j++
				continue;
			}
			//괄호 열기
			if (j==datafromX) {
				fs.appendFileSync(outFile, '\n\t\{','utf-8');
			} else {
				fs.appendFileSync(outFile, ',\n\t\{','utf-8');
			}
			//텍매열기J
			fs.appendFileSync(outputJ, '//! textmacro '+mode+'DataHeader'+rows[0][j]+"\nglobals\n",'utf-8');
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
					} else {
						fs.appendFileSync(outFile, ',\n\t\t"'+rows[i][0]+'":','utf-8');
					}
					//내용JSON
					switch (rows[i][dataType]) {
						case 'iconpath' :
							fs.appendFileSync(outFile, '"ReplaceableTextures/CommandButtons/'+rows[i][j]+'.png"','utf-8');
							break;
						case 'abilitytag' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outFile, '"CONFIG_ABILITY_TAG_'+rows[i][j]+'"','utf-8');
							} else {
								fs.appendFileSync(outFile, '"null"','utf-8');
							}
							break;
						case 'casttype' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outFile, '"CONFIG_CAST_TYPE_'+rows[i][j]+'"','utf-8');
							} else {
								fs.appendFileSync(outFile, '"null"','utf-8');
							}
							break;
						case 'real' :
							if (rows[i][j][rows[i][j].length-1]==='%') {
								//퍼센트임
								fs.appendFileSync(outFile, '"'+rows[i][j].substring(0,rows[i][j].length-1)+'"','utf-8');
							} else {
								//아님
								fs.appendFileSync(outFile, '"'+rows[i][j]+'"','utf-8');
							}
							break;
						default :
							fs.appendFileSync(outFile, '"'+rows[i][j]+'"','utf-8');
							break;
					}
					//내용J
					switch (rows[i][dataType]) {
						case 'iconpath' :
							fs.appendFileSync(outputJ, '\t'+prefix+' constant string '+rows[i][0]+' = "ReplaceableTextures\\\\CommandButtons\\\\'+rows[i][j]+'.blp"\n','utf-8');
							break;
						case 'fourcc' :
							fs.appendFileSync(outputJ, '\t'+prefix+' constant integer '+rows[i][0]+" = '"+rows[i][j]+"'\n",'utf-8');
							break;
						case 'string' :
							fs.appendFileSync(outputJ, '\t'+prefix+' constant string '+rows[i][0]+' = "'+rows[i][j]+'"\n','utf-8');
							break;
						case 'abilitytag' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outputJ, '\t'+prefix+' constant integer '+rows[i][0]+" = CONFIG_ABILITY_TAG_"+rows[i][j]+"\n",'utf-8');
							} else {
								fs.appendFileSync(outputJ, '\t'+prefix+' constant integer '+rows[i][0]+" = -1\n",'utf-8');
							}
							break;
						case 'casttype' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outputJ, '\t'+prefix+' constant integer '+rows[i][0]+" = CONFIG_CAST_TYPE_"+rows[i][j]+"\n",'utf-8');
							} else {
								fs.appendFileSync(outputJ, '\t'+prefix+' constant integer '+rows[i][0]+" = -1\n",'utf-8');
							}
							break;
						case 'real' :
							if (rows[i][j][rows[i][j].length-1]==='%') {
								let pure = Number(rows[i][j].substring(0,rows[i][j].length-1)/100.)
								//퍼센트임
								fs.appendFileSync(outputJ, '\t'+prefix+' constant real '+rows[i][0]+" = "+String(pure)+"\n",'utf-8');
							} else {
								//아님
								fs.appendFileSync(outputJ, '\t'+prefix+' constant real '+rows[i][0]+" = "+rows[i][j]+"\n",'utf-8');
							}
							break;
						default :
							fs.appendFileSync(outputJ, '\t'+prefix+' constant ' +rows[i][dataType]+" "+rows[i][0]+" = "+rows[i][j]+"\n",'utf-8');
							break;
					}
				} else {
		
				}
				//인덱스
				i++;
			}
			//괄호 닫기
			fs.appendFileSync(outFile, "\n\t}",'utf-8');
			//괄호닫기J
			fs.appendFileSync(outputJ, "endglobals\n//! endtextmacro\n",'utf-8');
			//인덱스 ++
			j++;
		}
		fs.appendFileSync(outFile, "\n]}",'utf-8');
	} 

	excelReader(xlsx,{ sheet: 'AbilityParams' }).then((rrows) => {
		wwrite(rrows,'ability')
	});

	excelReader(xlsx,{ sheet: 'BuffParams' }).then((rrows) => {
		wwrite(rrows,'buff')
	});
}

module.exports = main