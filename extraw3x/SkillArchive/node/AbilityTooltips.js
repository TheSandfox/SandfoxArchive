var mode = [0]
var param = ['']
var rs = ''
var currentAbilityId = ''
const fs = require('fs')

function modepush(main,par) {
	mode.push(main)
	param.push(par)
	let jsn = {}
	switch (main) {
		case 'c' :
			jsn = JSON.parse(fs.readFileSync('../json/CustomString/CustomStatString.json','utf-8'))
			rs = rs+'<span style=\\\"color: #'+jsn[par]["COLOR"]+';\\\">'
			break;
		case 'xSkillLevel' :
			jsn = JSON.parse(fs.readFileSync('../json/Ability/Ability'+currentAbilityId+'.json'))
			rs = rs+"(1+스킬 레벨 당 "+jsn["DAMAGE_PER_LEVEL"]+")"
			break;
		case 'statName' :
			jsn = JSON.parse(fs.readFileSync('../json/Ability/Ability'+currentAbilityId+'.json'))
			var did = jsn[par]
			jsn = JSON.parse(fs.readFileSync('../json/CustomString/CustomStatString.json','utf-8'))
			rs = rs+jsn[did]["NAME"]
			break;
	}
}

function modepop(str) {
	let jsn = {}
	switch (mode[mode.length-1]) {
		case 'c' :
			rs = rs+'</span>'
			break;
		case 'prop' :
			jsn = JSON.parse(fs.readFileSync('../json/Ability/Ability'+currentAbilityId+'.json'))
			rs = rs+jsn[str]
			break;
	}
	mode.pop()
	param.push()
}

function parse(str) {
	rs = ''
	var char = ''
	var tagstring = ''
	var innertag = ''
	var i = 0
	while (i<str.length) {
		char = str[i];
		//꺾쇠 만나면 태그 한 번에 읽고 모드체인지
		if (char=='<') {
			tagstring = ''
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
					rs = rs + char;
					break;
				case 'c' :
					rs = rs + char;
					break;
				default :
					innertag = innertag + char;
					break;
			}
		}
		//
		i++;
	}
	return rs;
} 

function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var tooltipsDir = '../json/Ability/'
	var outFile = '../json/Ability/AbilityTooltips.json'
	excelReader(xlsx,{ sheet: 'AbilityTooltips' }).then((rows) => {
		var i = 0
		var singleFile = ''
		//대괄호열기
		fs.writeFileSync(outFile,'{','utf-8')
		while(true) {
			if (i>=rows.length) {
				break;
			}
			currentAbilityId = rows[i][0]
			singleFile = tooltipsDir+'Tooltip'+currentAbilityId+'.json'
			//멤버네임
			if (i==0) {
				fs.appendFileSync(outFile,'\n\t"'+currentAbilityId+'":','utf-8')
			} else {
				fs.appendFileSync(outFile,',\n\t"'+currentAbilityId+'":','utf-8')
			}
			fs.writeFileSync(singleFile,'{"TOOLTIP":','utf-8')
			//내용
			fs.appendFileSync(outFile,'"','utf-8')
			fs.appendFileSync(singleFile,'"','utf-8')
			if (rows[i][1]!=null || rows[i][1]!=undefined) {
				fs.appendFileSync(outFile,parse(rows[i][1]),'utf-8')
				fs.appendFileSync(singleFile,parse(rows[i][1]),'utf-8')
			}
			fs.appendFileSync(outFile,'"','utf-8')
			fs.appendFileSync(singleFile,'"}','utf-8')
			//괄호닫기
			i++;
		}
		//대괄호닫기
		fs.appendFileSync(outFile,'\n}','utf-8')
	});
}

module.exports = main