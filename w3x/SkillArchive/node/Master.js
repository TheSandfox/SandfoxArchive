var convertAbilityParams = require('./AbilityParams.js')
var convertAbilityTooltips = require('./AbilityTooltips.js')
var convertConfig = require('./Config.js')
var convertCustomStatString = require('./CustomStatString.js')

convertAbilityParams();
convertConfig();
convertCustomStatString();
convertAbilityTooltips();