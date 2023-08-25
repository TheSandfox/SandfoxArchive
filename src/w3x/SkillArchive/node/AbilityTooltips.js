const CustomString = require('../json/CustomString.json')
const AbilityParams = require('../json/AbilityParams.json')
const BuffParams = require('../json/BuffParams.json')

var mode = [0]
var param = ['']
var innertagtemp = ''
var innertag = []
var rs = ['','']
var rs_json = ''
var rs_jass = ''
var currentAbilityId = ''
const fs = require('fs')

function refineMap(ojsn) {
	var mapstring = '{'
	var ii = 0
	while(ii < ojsn["params"].length) {
		if(ii===0) {
			mapstring = mapstring+'"'+ojsn["params"][ii]["ID"]+'":"'+String(ii)+'"'
		} else {
			mapstring = mapstring+',"'+ojsn["params"][ii]["ID"]+'":"'+String(ii)+'"'
		}
		ii++
	}
	mapstring = mapstring + '}'
	return JSON.parse(mapstring)
}

const AbilityMap = refineMap(AbilityParams)
const BuffMap = refineMap(BuffParams)

function main() {
	var excelReader = require('read-excel-file/node')
	var xlsx = 'C:/war3lib/maps/SkillArchive/Master.xlsx'
	var outFile = '../json/AbilityTooltips.json'
	var outputJ = 'C:/war3lib/maps/SkillArchive/Ability/AbilityData/GeneratedAbilityTooltips.j'
	excelReader(xlsx,{ sheet: 'AbilityTooltips' }).then((rows) => {
		var i = 0
		//대괄호열기
		fs.writeFileSync(outFile,'{','utf-8')
		fs.writeFileSync(outputJ,'','utf-8')
		while(true) {
			if (i>=rows.length) {
				break;
			}
			currentAbilityId = rows[i][0]
			fs.appendFileSync(outputJ,"\n//! textmacro abilityTooltip"+rows[i][0],'utf-8')
			fs.appendFileSync(outputJ,"\nmethod relativeTooltip takes nothing returns string\n\treturn ",'utf-8')
			//json괄호열기
			if (i==0) {
				fs.appendFileSync(outFile,'\n\t"'+currentAbilityId+'":{','utf-8')
			} else {
				fs.appendFileSync(outFile,',\n\t"'+currentAbilityId+'":{','utf-8')
			}
			//멤버네임
			fs.appendFileSync(outFile,'\n\t\t"ID":"'+currentAbilityId+'",','utf-8')
			//내용JSON
			fs.appendFileSync(outFile,'\n\t\t"TOOLTIP":"','utf-8')
			if (rows[i][1]!=null || rows[i][1]!=undefined) {
				fs.appendFileSync(outFile,pars_json(rows[i][1])["JSON"],'utf-8')
			}
			fs.appendFileSync(outFile,'"','utf-8')
			//내용J
			let jstring = pars_json(rows[i][1])["J"]
			if (jstring[jstring.length-1]=='+') {
				jstring = jstring.slice(0,-1)
			}
			fs.appendFileSync(outputJ,jstring,'utf-8')
			//json괄호닫기
			fs.appendFileSync(outFile,"\n\t}")
			//괄호닫기
			fs.appendFileSync(outputJ,"\nendmethod",'utf-8')
			fs.appendFileSync(outputJ,"\n//! endtextmacro",'utf-8')
			i++;
		}
		//대괄호닫기
		fs.appendFileSync(outFile,'\n}','utf-8')
	});
}

function monotag(main,par) {
	let jsn = {}
	switch (main) {
		case 'br' :
			rs_json = rs_json+"<br>"
			rs_jass = rs_jass+'"\\n"+'
			break;
		case 'customString' :
			if (par[0]=='#') {
				//
				
			} else if (par[0]=='$') {
				//커스텀 스트링
				var did = par.substring(1,par.length)
				//json
				rs_json = rs_json+'<b><span style=\\\"color: #'+CustomString[did]["COLOR"]+';\\\">'+CustomString[did]["NAME"]+'</span></b>'
				//j
				rs_jass = rs_jass+"CUSTOM_STRING_"+CustomString[did]["ARRNAME"]+"_COLOR["+did+"]"
				rs_jass = rs_jass+"+CUSTOM_STRING_"+CustomString[did]["ARRNAME"]+"_NAME["+did+"]"+'+"|r"+'
			} else { 
				//프로퍼티 참조형
				jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
				//jsn = JSON.parse(fs.readFileSync('../json/Ability/Ability'+currentAbilityId+'.json','utf-8'))
				var did = jsn[par]
				//json
				rs_json = rs_json+'<b><span style=\\\"color: #'+CustomString[did]["COLOR"]+';\\\">'+CustomString[did]["NAME"]+'</span></b>'
				//j
				rs_jass = rs_jass+"CUSTOM_STRING_"+CustomString[did]["ARRNAME"]+"_COLOR["+did+"]"
				rs_jass = rs_jass+"+CUSTOM_STRING_"+CustomString[did]["ARRNAME"]+"_NAME["+did+"]"+'+"|r"+'
			}
			break;
		case 'prop' :
			switch (par[0]) {
				case '#' :
					rs_json = rs_json+par.substring(1,par.length)
					rs_jass = rs_jass+par.substring(1,par.length)
					break;
				case '%' :
					//버프테이블에서 참조
					let buffid = par.substring(1,5)
					let par2 = par.substring(5,par.length)
					jsn = BuffParams["params"][BuffMap[buffid]]
					rs_json = rs_json+jsn[par2]
					rs_jass = rs_jass+"Buff"+buffid+"_"+par2
					break;
				default :
					jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
					rs_json = rs_json+jsn[par]
					rs_jass = rs_jass+jsn[par]
			}
			break;
		case 'propString' :
			jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
			rs_json = rs_json+jsn[par]
			rs_jass = rs_jass+'"'+jsn[par]+'"+'
			break;
		case 'second' :
			//초("초"문자열 붙여서)
			jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
			rs_json = rs_json+'<b><span style=\\\"color: #'+CustomString["CONFIG_STAT_CONSTANT"]["COLOR"]+';\\\">'+jsn[par]+'초</span></b>'
			rs_jass = rs_jass+'CUSTOM_STRING_STAT_COLOR[CONFIG_STAT_CONSTANT]+"'+jsn[par]+'초|r"+'
			break;
		case 'percentString' :
			//퍼센트("%"문자열 붙여서)
			jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
			rs_json = rs_json+jsn[par]+'%'
			rs_jass = rs_jass+'"'+jsn[par]+'%"+'
			break;
		case 'shift' :
			//쉬프트 스탯 툴팁(jass에서만 보임, json작성 불필요)
			jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
			rs_jass = rs_jass+"CustomString.shiftStatTooltip("+jsn[par]+")+"
			break;
		case 'xSkillLevel' :
			jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
			//json
			rs_json = rs_json+"(1+스킬 레벨 당 "+jsn["DAMAGE_PER_LEVEL"]+")"
			//j
			rs_jass = rs_jass+"(1.+.level*DAMAGE_PER_LEVEL)"
			break;
		case 'skillLevel' :
			jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
			//json
			rs_json = rs_json+"스킬 레벨"
			//j
			rs_jass = rs_jass+".level"
			break;
		case 'heroLevel' :
			jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
			//json
			rs_json = rs_json+"시전자 레벨"
			//j
			rs_jass = rs_jass+".owner.level"
			break;
		case 'statValue' :
			jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
			var did = jsn[par]
			//json
			rs_json = rs_json+CustomString[did]["NAME"]
			//j
			rs_jass = rs_jass+"owner.getCarculatedStatValue("+did+")"
			break;
	}
}

function modepush(main,par) {
	mode.push(main)
	param.push(par)
	innertag[innertag.length-1] = innertag[innertag.length-1]+innertagtemp
	innertag.push('')
	innertagtemp = ''
	let jsn = {}
	switch (main) {
		case 'c' :
			var color = ''
			if (par[0]=='#') {
				//색상코드형
				color = par.substring(1,par.length)
			} else if (par[0]=='$') {
				//커스텀 스트링 색상
				color = CustomString[par.substring(1,par.length)]["COLOR"]
			} else {
				//프로퍼티참조형
				jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
				var did = jsn[par]
				color = CustomString[did]["COLOR"]
			}
			//json
			rs_json = rs_json+'<b><span style=\\\"color: #'+color+';\\\">'
			//j
			rs_jass = rs_jass+'"|cff'+color+'"+'
			break;
		case 'real' :
			rs_jass = rs_jass+"R2SW("
			break;
	}
}

function modepop() {
	let jsn = {}
	switch (mode[mode.length-1]) {
		case 'c' :
			rs_json = rs_json+'</span></b>'
			rs_jass = rs_jass+'"|r"+'
			break;
		case 'real' :
			if (param[param.length-1]!='') {
				rs_jass = rs_jass+","+param[param.length-1]+")+"
			} else {
				rs_jass = rs_jass+",2,2)+"
			}
			break;
	}
	mode.pop()
	param.pop()
	innertag.pop()
	innertag[innertag.length-1] = innertag[innertag.length-1]+innertagtemp
	innertagtemp = ''
}

function pars_json(str) {
	rs_json = ''
	rs_jass = ''
	var char = ''
	var tagstring = '' //꺾쇠안쪽(태그이름&속성값)
	var normalstring = ''
	var i = 0
	while (i<str.length) {
		char = str[i];
		//꺾쇠 만나면 태그 한 번에 읽고 모드체인지
		if (char=='<') {
			tagstring = ''
			if (normalstring!='') {
				rs_jass = rs_jass+'"'+normalstring+'"+'
				normalstring = ''
			}
			while (true) {
				/*꺾쇠닫기를 만날 때 까지*/
				i++
				char = str[i]
				if (char=='>') {
					if (tagstring[0]=='/') {
						/*닫기태그임*/
						modepop()
					} else if (tagstring[tagstring.length-1]=='/') {
						/*모노태그임*/
						if (tagstring.includes(':')) {
							/*속성있음*/
							monotag(tagstring.substring(0,tagstring.indexOf(':')),tagstring.substring(tagstring.indexOf(':')+1,tagstring.length-1))
						} else {
							/*속성없음*/
							monotag(tagstring.slice(0,-1),'')
						}
					} else if (tagstring.includes(':')) {
						/*속성값이 있음*/
						modepush(tagstring.substring(0,tagstring.indexOf(':')),tagstring.substring(tagstring.indexOf(':')+1,tagstring.length))
					} else {
						/*없음*/
						modepush(tagstring,'')
					}
					break;
				}
				/*꺾쇠 안 문자열을 추가*/
				tagstring = tagstring + char
			}
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
					rs_jass = rs_jass +char;
					break;
				default :
					//json
					//
					//j
					break;
			}
			innertagtemp = innertagtemp + char;
			if (i==str.length-1) {
				if(normalstring!='') {
					rs_jass = rs_jass+'"'+normalstring+'"'
					normalstring = ''
				}
			}
		}
		//
		i++;
	}
	rs["JSON"] = rs_json;
	rs["J"] = rs_jass
	return rs;
} 

module.exports = main