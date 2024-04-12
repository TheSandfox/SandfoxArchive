let CustomString// = require('./CustomString.json')
let AbilityParams// = require('./AbilityParams.json')
let BuffParams// = require('./BuffParams.json')
let UnitParams// = require('./UnitParams.json')

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

let AbilityMap// = refineMap(AbilityParams)
let BuffMap// = refineMap(BuffParams)
let UnitMap// = refineMap(UnitParams)

async function main() {
	CustomString = require('./CustomString.json')
	AbilityParams = require('./AbilityParams.json')
	BuffParams = require('./BuffParams.json')
	UnitParams = require('./UnitParams.json')
	AbilityMap = refineMap(AbilityParams)
	BuffMap = refineMap(BuffParams)
	UnitMap = refineMap(UnitParams)
	//
	var excelReader = require('read-excel-file/node')
	var xlsx = './Master.xlsx';
	var outFile = './AbilityTooltips.json'
	var outputJ = 'C:/war3lib/maps/SkillArchive/Ability/AbilityData/GeneratedAbilityTooltips.j'
	var descriptioncol = 2
	var customcostcol = 3
	await excelReader(xlsx,{ sheet: 'AbilityTooltips' }).then((rows) => {
		var i = 0
		var j = descriptioncol
		//대괄호열기
		fs.writeFileSync(outFile,'{','utf-8')
		fs.writeFileSync(outputJ,'','utf-8')
		while(true) {
			if (i>=rows.length) {
				break;
			}
			currentAbilityId = rows[i][0]
			j = descriptioncol
			try {
				//텍매열기
				fs.appendFileSync(outputJ,"\n//! textmacro abilityTooltip"+rows[i][0],'utf-8')
				//json괄호열기
				if (i==0) {
					fs.appendFileSync(outFile,'\n\t"'+currentAbilityId+'":{','utf-8')
				} else {
					fs.appendFileSync(outFile,',\n\t"'+currentAbilityId+'":{','utf-8')
				}
				//ID JSON
				fs.appendFileSync(outFile,'\n\t\t"ID":"'+currentAbilityId+'",','utf-8')
				while(j<=customcostcol) {
					if (rows[i][j]===null||rows[i][j]===undefined) {
						j++;
						continue;
					}
					//함수이름
					switch (j) {
					case descriptioncol :
						fs.appendFileSync(outputJ,"\nmethod relativeTooltip takes nothing returns string\n\treturn ",'utf-8')
						break;
					case customcostcol :
						fs.appendFileSync(outputJ,"\nmethod customCostTooltip takes nothing returns string\n\treturn ",'utf-8')
						break;
					}
					//내용JSON
					switch (j) {
					case descriptioncol:
						fs.appendFileSync(outFile,'\n\t\t"TOOLTIP":"','utf-8')
						break;
					case customcostcol:
						fs.appendFileSync(outFile,',\n\t\t"CUSTOM_COST":"','utf-8')
						break;
					}
					fs.appendFileSync(outFile,pars_json(rows[i][j])["JSON"],'utf-8')
					fs.appendFileSync(outFile,'"','utf-8')
					//내용J
					let jstring = pars_json(rows[i][j])["J"]
					if (jstring[jstring.length-1]=='+') {
						jstring = jstring.slice(0,-1)
					}
					fs.appendFileSync(outputJ,jstring,'utf-8')
					//괄호닫기
					fs.appendFileSync(outputJ,"\nendmethod",'utf-8')
					j++;
				}
				//json괄호닫기
				fs.appendFileSync(outFile,"\n\t}")
				//텍매닫기
				fs.appendFileSync(outputJ,"\n//! endtextmacro",'utf-8')
			} catch(err) {
				console.log(err.message)
				console.log("범인:================'"+currentAbilityId+"'================")
			}
			i++;
		}
		//대괄호닫기
		fs.appendFileSync(outFile,'\n}','utf-8')
	});
}

function getProperty(par) {
	let jsn = {}
	let subparam = ''
	let context = ''
	if (par[1]=='(') {
		//참조의참조인거임..
		subparam = getProperty(par.substring(2,par.lastIndexOf(')')))
		context = par.substring(par.lastIndexOf(')')+1,par.length)
	} else {
		subparam = par.substring(1,5)
		context = par.substring(5,par.length)
	}
	switch (par[0]) {
	case '#' :
		return par.substring(1,par.length) //받은 문자열 샾 빼서 반환
	case '$' :
		return CustomString["CONFIG_"+par.substring(1,par.length)]// JSON 형태로 리턴함(알아서 잘 쓰기)
	case '%' :
		jsn = BuffParams["params"][BuffMap[subparam]]
		return jsn[context] //버프테이블의 값을 반환
	case '^' :
		jsn = AbilityParams["params"][AbilityMap[subparam]]
		return jsn[context] //다른 어빌리티의 값을 반환
	case '&' :
		jsn = UnitParams["params"][UnitMap[subparam]]
		return jsn[context] //유닛 테이블의 값을 반환
	default :
		jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
		return jsn[par] //어빌리티테이블의 값을 반환
	}
}

function monotag(main,par) {
	let jsn = {}
	switch (main) {
	case 'br' :
		rs_json = rs_json+"<br>"
		rs_jass = rs_jass+'"\\n"+'
		break;
	case 'customStringColored' :
		var did = ''
		switch (par[0]) {
		case '$' :
			//커스텀 스트링
			did = "CONFIG_"+par.substring(1,par.length)
			break;
		default :
			did = getProperty(par)
		}
		// console.log(currentAbilityId+"----"+did)
		//json
		rs_json = rs_json+'<span style=\\\"color: #'+CustomString[did]["COLOR"]+';\\\">'+CustomString[did]["NAME"]+'</span>'
		//j
		// rs_jass = rs_jass+"CUSTOM_STRING_"+CustomString[did]["ARRNAME"]+"_COLOR["+did+"]"
		// rs_jass = rs_jass+"+CUSTOM_STRING_"+CustomString[did]["ARRNAME"]+"_NAME["+did+"]"+'+"|r"+'
		rs_jass = rs_jass+'"|cff'+CustomString[did]["COLOR"]+CustomString[did]["NAME"]+'|r"+'
		break;
	case 'customString' :
		var did = ''
		switch (par[0]) {
		case '$' :
			//커스텀 스트링
			did = "CONFIG_"+par.substring(1,par.length)
			break;
		default :
			did = getProperty(par)
		}
		//json
		rs_json = rs_json+CustomString[did]["NAME"]
		//j
		rs_jass = rs_jass+'"'+CustomString[did]["NAME"]+'"+'
		break;
	case 'abilityTag' :
		var did = ''
		switch (par[0]) {
		case '$' :
			did = "CONFIG_ABILITY_TAG_"+par.substring(1,par.length)
		default :
			did = getProperty(par)
		}
		//json
		rs_json = rs_json+'<span style=\\\"color: #'+CustomString[did]["COLOR"]+';\\\">'+CustomString[did]["NAME"]+'</span>'
		//j
		rs_jass = rs_jass+'"|cff'+CustomString[did]["COLOR"]+CustomString[did]["NAME"]+'|r"+'
		break;
	case 'prop' :
		var did = ''
		switch (par[0]) {
		default :
			did = getProperty(par)
			rs_json = rs_json+did
			rs_jass = rs_jass+did
		}
		break;
	case 'propString' :
		var did = ''
		switch (par[0]) {
		default :
			did = getProperty(par)
		}
		rs_json = rs_json+did
		rs_jass = rs_jass+'"'+did+'"+'
		break;
	case 'second' :
		//초("초"문자열 붙여서)
		var did = ''
		switch (par[0]) {
		case '$' :
			did = getProperty(par)["NAME"]
			break;
		default :
			did = getProperty(par)
		}
		rs_json = rs_json+did+'초'
		rs_jass = rs_jass+'"'+did+'초"+'
		break;
	case 'percent' :
		//퍼센트("%"문자열 붙여서)
		var did = ''
		switch (par[0]) {
		default :
			did = getProperty(par)
		}
		rs_json = rs_json+did+'%'
		rs_jass = rs_jass+'"'+did+'%"+'
		break;
	case 'shift' :
		//쉬프트 스탯 툴팁(jass에서만 보임, json작성 불필요)
		var did = ''
		switch (par[0]) {
		case '$' :
			did = "CONFIG_"+par.substring(1,par.length)
			break;
		default :
			did = getProperty(par)
		}
		rs_jass = rs_jass+"CustomString.shiftStatTooltip("+did+")+"
		break;
	case 'xSkillLevel' :
		jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
		//json
		rs_json = rs_json+"(1+스킬 레벨 당 "+jsn["DAMAGE_PER_LEVEL"]+")"
		//j
		rs_jass = rs_jass+"(1.+(.level-1)*DAMAGE_PER_LEVEL)"
		break;
	case 'skillLevel' :
		jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
		//json
		rs_json = rs_json+'<img src=\\\"/resource/'+CustomString["CONFIG_STAT_SKILL_LEVEL"]["ICON"]+'\\\" title=\\\"'+CustomString["CONFIG_STAT_SKILL_LEVEL"]["NAME"]+'\\\"/>'
		//j
		rs_jass = rs_jass+".level"
		break;
	case 'heroLevel' :
		jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
		//json
		rs_json = rs_json+'<img src=\\\"/resource/'+CustomString["CONFIG_STAT_UNIT_LEVEL"]["ICON"]+'\\\" title=\\\"'+CustomString["CONFIG_STAT_UNIT_LEVEL"]["NAME"]+'\\\"/>'
		//j
		rs_jass = rs_jass+".owner.level"
		break;
	case 'statValue' :
		//jsn = AbilityParams["params"][AbilityMap[currentAbilityId]]
		var did = getProperty(par)
		//json
		rs_json = rs_json+/*CustomString[did]["NAME"]*/''+'<img src=\\\"/resource/'+CustomString[did]["ICON"]+'\\\" title=\\\"'+CustomString[did]["NAME"]+'\\\"/>'
		//j
		rs_jass = rs_jass+".owner.getCarculatedStatValue("+did+")"
		break;
	case 'icon' :
		var did = getProperty(par)
		// console.log(did)
		//json
		rs_json = rs_json+/*CustomString[did]["NAME"]*/''+'<img src=\\\"/resource/'+did["ICON"]+'\\\" title=\\\"'+did["NAME"]+'\\\"/>'
		break;
	case 'lucky' :
		var quoteind = par.indexOf(',')
		var p1 = getProperty(par.substring(0,quoteind))
		var p2 = getProperty(par.substring(quoteind+1,par.length))
		//json
		rs_json = rs_json+'<span style=\\\"color: #'+CustomString["CONFIG_STAT_LUCK"]["COLOR"]+';\\\">'+p1+'%</span>'
		rs_json = rs_json+'<img src=\\\"/resource/'+CustomString["CONFIG_STAT_LUCK"]["ICON"]+'\\\" title=\\\"'+CustomString["CONFIG_STAT_LUCK"]["NAME"]+'\\\"/>'
		//jass
		rs_jass = rs_jass+'"|cff'+CustomString["CONFIG_STAT_LUCK"]["COLOR"]+'"+'+'R2SW(.owner.getLuckyPercent('+(p1/100.)+','+p2+')*100.,1,1)+"%|r"+'
		rs_jass = rs_jass+'CustomString.shiftStatTooltip(CONFIG_STAT_LUCK)+'
		break;
	case 'multiply' :
		var quoteind = par.indexOf(',')
		var p1 = getProperty(par.substring(0,quoteind))
		var p2 = getProperty(par.substring(quoteind+1,par.length))
		var val = Number.isInteger(p1*p2)?String(Number(p1*p2).toFixed(1)):String(p1*p2)
		//json
		rs_json = rs_json+val
		//jass
		rs_jass = rs_jass+val
		break;
	case 'unitInfo' :
		var did = getProperty(par)
		//json
		rs_json = rs_json+'<a class=\\\"unitinfo\\\" href=\\\"/w3x/SkillArchive/Unit/'+did+'\\\">'+UnitParams["params"][UnitMap[did]]["NAME"]+"</a>"
		//jass
		rs_jass = rs_jass+'"'+UnitParams["params"][UnitMap[did]]["NAME"]+'"+'
		break;
	case 'abilityInfo' :
		var did = getProperty(par)
		//json
		rs_json = rs_json+'<a class=\\\"unitinfo\\\" href=\\\"/w3x/SkillArchive/Ability/'+did+'\\\">'+AbilityParams["params"][AbilityMap[did]]["NAME"]+"</a>"
		//jass
		rs_jass = rs_jass+'"'+AbilityParams["params"][AbilityMap[did]]["NAME"]+'"+'
		break;
	}
}

function modepush(main,par) {
	mode.push(main)
	param.push(par)
	innertag[innertag.length-1] = innertag[innertag.length-1]+innertagtemp
	innertag.push('')
	innertagtemp = ''
	switch (main) {
		case 'c' :
			var color = ''
			// console.log(currentAbilityId+"++++"+par)
			switch (par[0]) {
			case '#' :
				color = getProperty(par)
				break;
			case '$' :
				color = CustomString["CONFIG_"+par.substring(1,par.length)]["COLOR"]
				break;
			default :
				color = CustomString[getProperty(par)]["COLOR"]
			}
			// console.log(currentAbilityId+"----"+color)
			//json
			rs_json = rs_json+'<span style=\\\"color: #'+color+';\\\">'
			//j
			rs_jass = rs_jass+'"|cff'+color+'"+'
			break;
		case 'real' :
			rs_jass = rs_jass+"R2SW("
			break;
		case 'int' :
			rs_jass = rs_jass+"I2S("
			break;
		case 'percent' :
			rs_json = rs_json+"("
			rs_jass = rs_jass+"R2SW(("
			break;
	}
}

function modepop() {
	let jsn = {}
	switch (mode[mode.length-1]) {
		case 'c' :
			rs_json = rs_json+'</span>'
			rs_jass = rs_jass+'"|r"+'
			break;
		case 'real' :
			if (param[param.length-1]!='') {
				rs_jass = rs_jass+","+param[param.length-1]+")+"
			} else {
				rs_jass = rs_jass+",2,2)+"
			}
			break;
		case 'int' :
			rs_jass = rs_jass+")+"
			break;
		case 'percent' :
			rs_json = rs_json+')%'
			if (param[param.length-1]!='') {
				rs_jass = rs_jass+","+param[param.length-1]+")+"
			} else {
				rs_jass = rs_jass+'),1,1)+"%"+'
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
				case 'int' :
					//json
					rs_json = rs_json + char;
					//j
					rs_jass = rs_jass +char;
					break;
				case 'percent' :
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
	rs["JSON"] = rs_json.replace(/\*/g,'×')
	rs["J"] = rs_jass
	return rs;
} 

module.exports = main