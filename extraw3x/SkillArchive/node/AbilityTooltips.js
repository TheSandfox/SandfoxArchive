var mode = [0]
var param = ['']
var rs = ['','']
var rs_json = ''
var rs_j = ''
var currentAbilityId = ''
const fs = require('fs')

function modepush(main,par) {
	mode.push(main)
	param.push(par)
	let jsn = {}
	switch (main) {
		case 'c' :
			jsn = JSON.parse(fs.readFileSync('../json/CustomString/CustomStatString.json','utf-8'))
			//json
			rs_json = rs_json+'<span style=\\\"color: #'+jsn[par]["COLOR"]+';\\\">'
			//j
			rs_j = rs_j+'"|cff'+jsn[par]["COLOR"]+'"+'
			break;
		case 'xSkillLevel' :
			jsn = JSON.parse(fs.readFileSync('../json/Ability/Ability'+currentAbilityId+'.json'))
			//json
			rs_json = rs_json+"(1+스킬 레벨 당 "+jsn["DAMAGE_PER_LEVEL"]+")"
			//j
			rs_j = rs_j+"(1.+.level*DAMAGE_PER_LEVEL)"
			break;
		case 'statName' :
			jsn = JSON.parse(fs.readFileSync('../json/Ability/Ability'+currentAbilityId+'.json'))
			var did = jsn[par]
			jsn = JSON.parse(fs.readFileSync('../json/CustomString/CustomStatString.json','utf-8'))
			//json
			rs_json = rs_json+jsn[did]["NAME"]
			//j
			rs_j = rs_j+"owner.getCarculatedStatValue("+did+")"
			break;
		case 'real' :
			rs_j = rs_j+"R2SW("
	}
}

function modepop(str) {
	let jsn = {}
	switch (mode[mode.length-1]) {
		case 'c' :
			rs_json = rs_json+'</span>'
			rs_j = rs_j+'"|r"+'
			break;
		case 'prop' :
			jsn = JSON.parse(fs.readFileSync('../json/Ability/Ability'+currentAbilityId+'.json'))
			rs_json = rs_json+jsn[str]
			rs_j = rs_j+jsn[str]
			break;
		case 'real' :
			rs_j = rs_j+",2,2)+"
	}
	mode.pop()
	param.push()
}

function pars_json(str) {
	rs_json = ''
	rs_j = ''
	var char = ''
	var tagstring = ''
	var innertag = ''
	var normalstring = ''
	var i = 0
	while (i<str.length) {
		char = str[i];
		//꺾쇠 만나면 태그 한 번에 읽고 모드체인지
		if (char=='<') {
			tagstring = ''
			if (normalstring!='') {
				rs_j = rs_j+'"'+normalstring+'"+'
				normalstring = ''
			}
			while (true) {
				/*꺾쇠닫기를 만날 때 까지*/
				i++
				char = str[i]
				if (char=='>') {
					if (tagstring.includes('/')) {
						/*닫기태그임*/
						modepop(innertag)
					} else {
						if (tagstring.includes(':')) {
							/*속성값이 있음*/
							modepush(tagstring.substring(0,tagstring.indexOf(':')),tagstring.substring(tagstring.indexOf(':')+1,tagstring.length))
						} else {
							/*없음*/
							modepush(tagstring,'')
						}
					}
					break;
				}
				/*꺾쇠 안 문자열을 추가*/
				tagstring = tagstring + char
			}
			innertag = ''
		} else {
			switch (mode[mode.length-1]) {
				case 0 :
					//json
					rs_json = rs_json + char;
					//j
					normalstring = normalstring + char;
					break;
				case 'c' :
					//json
					rs_json = rs_json + char;
					//j
					normalstring = normalstring + char;
					break;
				case 'real' :
					//json
					rs_json = rs_json + char;
					//j
					rs_j = rs_j +char;
					break;
				default :
					//json
					innertag = innertag + char;
					//j
					break;
			}
			if (i==str.length-1) {
				if(normalstring!='') {
					rs_j = rs_j+'"'+normalstring+'"'
					normalstring = ''
				}
			}
		}
		//
		i++;
	}
	rs["JSON"] = rs_json;
	rs["J"] = rs_j
	return rs;
} 

function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var tooltipsDir = '../json/Ability/'
	var outFile = '../json/Ability/AbilityTooltips.json'
	var outputJ = 'C:/war3lib/maps/SkillArchive/Ability/AbilityData/GeneratedAbilityTooltips.j'
	excelReader(xlsx,{ sheet: 'AbilityTooltips' }).then((rows) => {
		var i = 0
		var singleFile = ''
		//대괄호열기
		fs.writeFileSync(outFile,'{','utf-8')
		fs.writeFileSync(outputJ,'','utf-8')
		while(true) {
			if (i>=rows.length) {
				break;
			}
			currentAbilityId = rows[i][0]
			singleFile = tooltipsDir+'Tooltip'+currentAbilityId+'.json'
			fs.appendFileSync(outputJ,"\n//! textmacro abilityTooltip"+rows[i][0],'utf-8')
			fs.appendFileSync(outputJ,"\nmethod relativeTooltip takes nothing returns string\n\treturn ",'utf-8')
			//멤버네임
			if (i==0) {
				fs.appendFileSync(outFile,'\n\t"'+currentAbilityId+'":','utf-8')
			} else {
				fs.appendFileSync(outFile,',\n\t"'+currentAbilityId+'":','utf-8')
			}
			fs.writeFileSync(singleFile,'{"TOOLTIP":','utf-8')
			//내용JSON
			fs.appendFileSync(outFile,'"','utf-8')
			fs.appendFileSync(singleFile,'"','utf-8')
			if (rows[i][1]!=null || rows[i][1]!=undefined) {
				fs.appendFileSync(outFile,pars_json(rows[i][1])["JSON"],'utf-8')
				fs.appendFileSync(singleFile,pars_json(rows[i][1])["JSON"],'utf-8')
			}
			fs.appendFileSync(outFile,'"','utf-8')
			fs.appendFileSync(singleFile,'"}','utf-8')
			//내용J
			let jstring = pars_json(rows[i][1])["J"]
			if (jstring[jstring.length-1]=='+') {
				jstring.pop()
			}
			fs.appendFileSync(outputJ,jstring,'utf-8')
			//괄호닫기
			fs.appendFileSync(outputJ,"\nendmethod",'utf-8')
			fs.appendFileSync(outputJ,"\n//! endtextmacro",'utf-8')
			i++;
		}
		//대괄호닫기
		fs.appendFileSync(outFile,'\n}','utf-8')
	});
}

module.exports = main