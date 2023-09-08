const CustomString = require('../json/CustomString.json')

function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	
	function wwrite(rows,mode) {
		var outJson = ''
		var outJass = ''
		var outMap = ''
		var prefix = ''
		if (mode==='ability') {
			outJson = '../json/AbilityParams.json'
			outJass = 'C:/war3lib/maps/SkillArchive/Ability/AbilityData/GeneratedAbilityParams.j'
			outMap = '../json/AbilityMap.json'
			prefix = 'private'
		} else if (mode==='buff') {
			outJson = '../json/BuffParams.json'
			outJass = 'C:/war3lib/maps/SkillArchive/Ability/AbilityData/GeneratedBuffParams.j'
			outMap = '../json/BuffMap.json'
			prefix = 'public'
		}
		var datafromX = 3;
		var dataType = 2;
		var allowNull = 1;
		var i = 0;
		var j = datafromX;
		fs.writeFileSync(outJson, '{"params":[','utf-8');
		fs.writeFileSync(outJass,'','utf-8');
		fs.writeFileSync(outMap, '{','utf-8');
		while (true) {
			//끝까지가면 루프탈출
			if (j==rows[0].length||rows[0][j]==null) {
				break;
			}
			//괄호 열기
			if (j==datafromX) {
				fs.appendFileSync(outJson, '\n\t\{','utf-8');
			} else {
				fs.appendFileSync(outJson, ',\n\t\{','utf-8');
			}
			//맵 기록
			if (j==datafromX) {
				fs.appendFileSync(outMap,'"'+rows[0][j]+'":"'+(j-datafromX)+'"')
			} else {
				fs.appendFileSync(outMap,',"'+rows[0][j]+'":"'+(j-datafromX)+'"')
			}
			//텍매열기J
			fs.appendFileSync(outJass, '//! textmacro '+mode+'DataHeader'+rows[0][j]+"\nglobals\n",'utf-8');
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
						fs.appendFileSync(outJson, '\n\t\t"'+rows[i][0]+'":','utf-8');
					} else {
						fs.appendFileSync(outJson, ',\n\t\t"'+rows[i][0]+'":','utf-8');
					}
					//내용JSON
					switch (rows[i][dataType]) {
						case 'iconpath' :
							fs.appendFileSync(outJson, '"ReplaceableTextures/CommandButtons/'+rows[i][j]+'.png"','utf-8');
							break;
						case 'abilitytag' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outJson, '"CONFIG_ABILITY_TAG_'+rows[i][j]+'"','utf-8');
							} else {
								fs.appendFileSync(outJson, '"null"','utf-8');
							}
							break;
						case 'casttype' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outJson, '"CONFIG_CAST_TYPE_'+rows[i][j]+'"','utf-8');
							} else {
								fs.appendFileSync(outJson, '"null"','utf-8');
							}
							break;
						case 'configinteger' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outJson, '"CONFIG_'+rows[i][j]+'"','utf-8');
							} else {
								fs.appendFileSync(outJson, '"null"','utf-8');
							}
							break;
						case 'real' :
							if (rows[i][j][rows[i][j].length-1]==='%') {
								//퍼센트임
								fs.appendFileSync(outJson, '"'+rows[i][j].substring(0,rows[i][j].length-1)+'"','utf-8');
							} else {
								//아님
								fs.appendFileSync(outJson, '"'+rows[i][j]+'"','utf-8');
							}
							break;
						default :
							fs.appendFileSync(outJson, '"'+rows[i][j]+'"','utf-8');
							break;
					}
					//내용J
					switch (rows[i][dataType]) {
						case 'iconpath' :
							fs.appendFileSync(outJass, '\t'+prefix+' constant string '+rows[i][0]+' = "ReplaceableTextures\\\\CommandButtons\\\\'+rows[i][j]+'.blp"\n','utf-8');
							break;
						case 'fourcc' :
							fs.appendFileSync(outJass, '\t'+prefix+' constant integer '+rows[i][0]+" = '"+rows[i][j]+"'\n",'utf-8');
							break;
						case 'string' :
							fs.appendFileSync(outJass, '\t'+prefix+' constant string '+rows[i][0]+' = "'+rows[i][j]+'"\n','utf-8');
							break;
						case 'abilitytag' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outJass, '\t'+prefix+' constant integer '+rows[i][0]+" = CONFIG_ABILITY_TAG_"+rows[i][j]+"\n",'utf-8');
							} else {
								fs.appendFileSync(outJass, '\t'+prefix+' constant integer '+rows[i][0]+" = -1\n",'utf-8');
							}
							break;
						case 'casttype' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outJass, '\t'+prefix+' constant integer '+rows[i][0]+" = CONFIG_CAST_TYPE_"+rows[i][j]+"\n",'utf-8');
							} else {
								fs.appendFileSync(outJass, '\t'+prefix+' constant integer '+rows[i][0]+" = -1\n",'utf-8');
							}
							break;
						case 'configinteger' :
							if (rows[i][j]!=null) {
								fs.appendFileSync(outJass, '\t'+prefix+' constant integer '+rows[i][0]+" = CONFIG_"+rows[i][j]+"\n",'utf-8');
							} else {
								fs.appendFileSync(outJass, '\t'+prefix+' constant integer '+rows[i][0]+" = -1\n",'utf-8');
							}
							break;
						case 'real' :
							if (rows[i][j][rows[i][j].length-1]==='%') {
								let pure = Number(rows[i][j].substring(0,rows[i][j].length-1)/100.)
								//퍼센트임
								fs.appendFileSync(outJass, '\t'+prefix+' constant real '+rows[i][0]+" = "+String(pure)+"\n",'utf-8');
							} else {
								//아님
								fs.appendFileSync(outJass, '\t'+prefix+' constant real '+rows[i][0]+" = "+rows[i][j]+"\n",'utf-8');
							}
							break;
						default :
							fs.appendFileSync(outJass, '\t'+prefix+' constant ' +rows[i][dataType]+" "+rows[i][0]+" = "+rows[i][j]+"\n",'utf-8');
							break;
					}
				} else {
		
				}
				//인덱스
				i++;
			}
			//괄호 닫기
			fs.appendFileSync(outJson, "\n\t}",'utf-8');
			//괄호닫기J
			fs.appendFileSync(outJass, "endglobals\n//! endtextmacro\n",'utf-8');
			//인덱스 ++
			j++;
		}
		fs.appendFileSync(outJson, "\n]}",'utf-8');
		fs.appendFileSync(outMap, "}",'utf-8');
	} 

	excelReader(xlsx,{ sheet: 'AbilityParams' }).then((rrows) => {
		wwrite(rrows,'ability')
	});

	excelReader(xlsx,{ sheet: 'BuffParams' }).then((rrows) => {
		wwrite(rrows,'buff')
	});
}

module.exports = main