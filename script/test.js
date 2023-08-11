import fs from 'fs'
var jsn = JSON.parse(fs.readFileSync('extraw3x/SkillArchive/json/Ability/Ability0100.json'))
document.getElementById("jsonOutPut").innerHTML = jsn["TOOLTIP"]