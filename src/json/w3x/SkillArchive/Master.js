var convertConfig = require('./module_Config.js');
var convertCustomString = require('./module_CustomString.js');
var convertAbilityParams = require('./module_AbilityParams.js');
var convertUnitParams = require('./module_UnitParams.js');
var convertAbilityTooltips = require('./module_AbilityTooltips.js');
var convertAbilityMix = require('./module_AbilityMix.js');
var convertAbilityTable = require('./module_AbilityTable.js');

async function main() {
	await convertConfig();
	console.log('config: complete');
	await convertCustomString();
	console.log('custom string: complete');
	await convertAbilityParams();
	console.log('ability params: complete');
	await convertUnitParams();
	console.log('unit params: complete');
	await convertAbilityTooltips();
	console.log('ability tooltip: complete');
	await convertAbilityMix();
	console.log('ability mix: complete');
	await convertAbilityTable();
	console.log('ability table: complete');
	console.log('complete');
}

main();
