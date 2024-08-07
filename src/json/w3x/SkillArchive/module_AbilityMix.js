async function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = './Master.xlsx';
	var fs = require('fs');
	
	await excelReader(xlsx,{ sheet: 'AbilityMix' }).then((rows) => {
		var outJson = './AbilityMix.json'
		var outJass = 'C:/war3lib/maps/SkillArchive/Ability/GeneratedAbilityMix.j'
		var i = 1;/*두 번째 행부터*/
		var data1 	= 0	/*main_id*/
		var data2 	= 3	/*sub_id*/
		var data3 	= 6	/*result*/
		fs.writeFileSync(outJson, '{"params":[','utf-8');
		fs.writeFileSync(outJass,'','utf-8');
		while (true) {
			if (i>=rows.length) {
				break;
			}
			/*JSON */
			fs.appendFileSync(outJson,(i==1?'':',')+'\n\t{\n\t\t"ID1":"'+rows[i][data1]+'",','utf-8')
			fs.appendFileSync(outJson,'\n\t\t"ID2":"'+rows[i][data2]+'",','utf-8')
			fs.appendFileSync(outJson,'\n\t\t"RESULT":"'+rows[i][data3]+'"\n\t}','utf-8')
			/*JASS */
			fs.appendFileSync(outJass,"call AbilityMix.create('"+rows[i][data1]+"', '"+rows[i][data2]+"', '"+rows[i][data3]+"')\n",'utf-8')
			i++
		}
		fs.appendFileSync(outJson, "\n]}",'utf-8');
	})
}

module.exports = main