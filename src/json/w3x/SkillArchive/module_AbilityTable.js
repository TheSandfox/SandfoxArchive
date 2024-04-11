async function main() {
	var excelReader = require('read-excel-file/node');
	var xlsx = './Master.xlsx';
	var fs = require('fs');
	
	await excelReader(xlsx,{ sheet: 'AbilityTable' }).then((rows) => {
		// var outJson = '../json/AbilityTable.json';
		var outJass = 'C:/war3lib/maps/SkillArchive/Ability/GeneratedAbilityTable.j';
		var i = 2;/*두 번째 행부터*/
		var j = 0;
		// fs.writeFileSync(outJson, '{"params":[','utf-8');
		fs.writeFileSync(outJass,'','utf-8');
		while (j<rows[0].length) {
			i = 2;
			// console.log("DDD")
			while (true) {
				if (i>=rows.length) {
					break;
				}
				/*JSON */
				/*JASS */
				if (rows[i][j]!=null&&rows[i][j+1]==true) {
					fs.appendFileSync(outJass,"call AbilityTable.addAbility(AbilityTable."+rows[0][j]+", '"+rows[i][j]+"')\n",'utf-8');
				}
				i++;
			}
			j = j + 3;
		}
		// fs.appendFileSync(outJson, "\n]}",'utf-8');
	})
}

module.exports = main;