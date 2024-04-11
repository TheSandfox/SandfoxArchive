var convertConfig = require('./Config.js');
var convertCustomString = require('./CustomString.js');
var convertAbilityParams = require('./AbilityParams.js');
var convertUnitParams = require('./UnitParams.js');
var convertAbilityTooltips = require('./AbilityTooltips.js');
var convertAbilityMix = require('./AbilityMix.js');
var convertAbilityTable = require('./AbilityTable.js');

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

}

main();
console.log('complete');
