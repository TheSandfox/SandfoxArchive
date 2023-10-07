function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var fs = require('fs');
	
	excelReader(xlsx,{ sheet: 'AbilityMix' }).then((rows) => {
		var outJson = '../json/AbilityMix.json'
		var outJass = 'C:/war3lib/maps/SkillArchive/Ability/GeneratedAbilityMix.j'
		var i = 1;/*두 번째 행부터*/
		var data1 	= 0	/*main_id*/
		var count1 	= 2	/*main_count*/
		var data2 	= 4	/*sub_id*/
		var count2 	= 6	/*sub_count*/
		var data3 	= 8	/*result*/
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
			fs.appendFileSync(outJass,"call AbilityMix.create('"+rows[i][data1]+"', '"+rows[i][data2]+"', "+rows[i][count1]+", "+rows[i][count2]+", '"+rows[i][data3]+"')\n",'utf-8')
			i++
		}
		fs.appendFileSync(outJson, "\n]}",'utf-8');
	})
}

module.exports = main