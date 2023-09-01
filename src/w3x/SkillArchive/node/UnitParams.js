function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	var outJson = '../json/UnitParams.json'
	var outJass = 'C:/war3lib/maps/SkillArchive/Unit/GeneratedUnitParams.j'
	var dataFrom = 2
	var dataType = 1

	excelReader(xlsx,{ sheet: 'UnitParams' }).then((rows) => {
		let i = 0
		let j = dataFrom
		let iaindex = 0

		//JSON,JASS열기
		fs.writeFileSync(outJson,'{"params":[','utf-8')
		fs.writeFileSync(outJass,'','utf-8')

		while(j<rows[0].length) {
			i = 0
			iaindex = 0
			//JSON유닛필드열기
			if (j==dataFrom) {
				fs.appendFileSync(outJson,'\n\t{')
			} else {
				fs.appendFileSync(outJson,',\n\t{')
			}
			//JASS유닛스코프 열기
			fs.appendFileSync(outJass,'//! '+rows[1][j])
			fs.appendFileSync(outJass,'\nscope Unit'+rows[0][j]+' initializer init')
			fs.appendFileSync(outJass,'\n\tprivate function init takes nothing returns nothing')
			while(true) {
				if (i===rows.length) {
					break;
				}
				//dataType로 분기JSON
				switch(rows[i][dataType]) {
				case 'id' :
					fs.appendFileSync(outJson,'\n\t\t"ID":"'+rows[i][j]+'"')
					break;
				case 'iconpath' :
					fs.appendFileSync(outJson,',\n\t\t"'+rows[i][0]+'":"replaceabletextures/commandbuttons/'+rows[i][j]+'.png"')
					break;
				default :
					fs.appendFileSync(outJson,',\n\t\t"'+rows[i][0]+'":"'+rows[i][j]+'"')
					//
				}
				//dataType로 분기JASS
				if(rows[i][j]!=null) {
					switch(rows[i][dataType]) {
					case 'id' :
						fs.appendFileSync(outJass,'\n\t\tset UnitData.ID = '+"'"+rows[i][j]+"'")
						break;
					case 'unitname' :
						break;
					case 'iconpath' :
						fs.appendFileSync(outJass,'\n\t\tcall UnitData.setIconPath("ReplaceableTextures\\\\CommandButtons\\\\'+rows[i][j]+'.blp")')
						break;
					case 'initialability' :
						fs.appendFileSync(outJass,'\n\t\tcall UnitData.setInitialAbility('+String(iaindex)+','+"'"+rows[i][j]+"'"+')')
						iaindex++
						break;
					default :
						//
					}
				}
				i++
			}
			//JSON유닛필드닫기
			fs.appendFileSync(outJson,'\n\t}')
			//JASS유닛스코프 닫기
			fs.appendFileSync(outJass,'\n\tendfunction')
			fs.appendFileSync(outJass,'\nendscope\n')
			j++
		}

		//JSON닫기
		fs.appendFileSync(outJson,'\n]}','utf-8')

	});

}

module.exports = main