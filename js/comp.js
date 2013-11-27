/**
 * COMP object constructor.
 */
function COMPImpl() {
	//
	// Private Variables
	//

	// List of demons in the COMP.
	this.mCompList = [ ];

	// Order is the same as the tribe list. For example, to combine 女神 and 霊鳥:
	// var a = tribeListJP.indexOf("女神");
	// var b = tribeListJP.indexOf("霊鳥");
	// var result = fusionChart[a][b];
	// from there you can use the levels to calculate which demon in the tribe.
	// Note: This is in Japanese because there is no "translation" to change.
	this.mFusionChart = [["精霊", "幻魔", "天使", "天使", "邪神", "霊鳥", "神樹", "女神", "-", "-", "-", "女神", "霊鳥", "霊鳥", "-", "天使", "聖獣", "魔神", "妖鳥", "-", "-", "-", "-", "死神", "女神", "破壊神", "-", "-", "妖鳥", "天女", "妖魔", "-", "-", "-", "邪神", "-", "妖鳥", "女神", "魔神", "魔王", "女神", "天使", "-", "女神", "女神"],
		["幻魔", "精霊", "天女", "大天使", "妖魔", "天使", "天女", "神樹", "-", "-", "-", "神獣", "魔神", "霊鳥", "神樹", "幻魔", "堕天使", "神樹", "妖樹", "-", "-", "-", "-", "地母神", "魔神", "大天使", "幻魔", "外道", "天女", "-", "天女", "-", "-", "-", "地母神", "-", "鬼女", "神樹", "天女", "地母神", "神獣", "天女", "-", "-", "魔神"],
		["天使", "天女", "精霊", "妖鳥", "妖鳥", "天使", "外道", "神樹", "-", "-", "-", "聖獣", "大天使", "妖鳥", "聖獣", "女神", "妖鳥", "妖魔", "-", "-", "-", "-", "-", "大天使", "破壊神", "神獣", "夜魔", "凶鳥", "幻魔", "女神", "凶鳥", "-", "-", "-", "凶鳥", "-", "妖鳥", "聖獣", "大天使", "天使", "聖獣", "天使", "-", "大天使", "破壊神"],
		["天使", "大天使", "妖鳥", "精霊", "大天使", "霊鳥", "幻魔", "女神", "-", "-", "-", "妖魔", "天女", "地霊", "-", "幻魔", "神獣", "妖精", "妖鳥", "-", "-", "-", "-", "国津神", "龍神", "龍王", "国津神", "邪神", "国津神", "地母神", "妖魔", "-", "-", "-", "妖樹", "-", "妖樹", "妖精", "地霊", "地霊", "妖魔", "天使", "-", "魔神", "龍神"],
		["邪神", "妖魔", "妖鳥", "大天使", "精霊", "霊鳥", "妖鳥", "女神", "凶鳥", "-", "地霊", "大天使", "妖精", "神獣", "天女", "天女", "妖鬼", "堕天使", "妖虫", "邪神", "凶鳥", "妖精", "凶鳥", "堕天使", "外道", "邪龍", "龍王", "-", "地霊", "天女", "女神", "凶鳥", "凶鳥", "妖魔", "堕天使", "邪鬼", "堕天使", "邪神", "女神", "邪神", "大天使", "-", "堕天使", "大天使", "外道"],
		["霊鳥", "天使", "天使", "霊鳥", "霊鳥", "精霊", "天女", "霊鳥", "凶鳥", "霊鳥", "凶鳥", "大天使", "妖虫", "神獣", "神獣", "天使", "妖魔", "霊鳥", "魔獣", "悪霊", "外道", "邪龍", "堕天使", "堕天使", "夜魔", "魔獣", "霊鳥", "天使", "魔獣", "魔獣", "堕天使", "邪龍", "外道", "凶鳥", "龍王", "夜魔", "凶鳥", "邪龍", "霊鳥", "龍王", "大天使", "-", "龍神", "霊鳥", "夜魔"],
		["神樹", "天女", "外道", "幻魔", "妖鳥", "天女", "精霊", "妖精", "邪鬼", "天使", "邪龍", "妖精", "地霊", "龍王", "夜魔", "天使", "聖獣", "地母神", "妖鳥", "幽鬼", "魔獣", "幽鬼", "妖獣", "夜魔", "幽鬼", "幻魔", "魔王", "龍王", "邪鬼", "幽鬼", "天使", "邪鬼", "妖鳥", "幽鬼", "夜魔", "-", "夜魔", "幽鬼", "妖精", "堕天使", "妖精", "-", "妖鬼", "幻魔", "幽鬼"],
		["女神", "神樹", "神樹", "女神", "女神", "霊鳥", "妖精", "精霊", "外道", "堕天使", "神樹", "鬼女", "妖精", "天使", "女神", "女神", "神獣", "天使", "妖樹", "悪霊", "-", "妖魔", "-", "鬼女", "-", "地母神", "天使", "天使", "鬼女", "-", "鬼女", "邪鬼", "-", "夜魔", "鬼女", "悪霊", "鬼女", "死神", "女神", "鬼女", "鬼女", "-", "地母神", "女神", "-"],
		["-", "-", "-", "-", "凶鳥", "凶鳥", "邪鬼", "外道", "精霊", "邪龍", "邪鬼", "-", "-", "-", "-", "邪鬼", "妖獣", "邪鬼", "邪龍", "魔王", "凶鳥", "幽鬼", "凶鳥", "-", "-", "-", "-", "凶鳥", "邪鬼", "邪鬼", "邪鬼", "死神", "妖獣", "幽鬼", "魔王", "凶鳥", "妖獣", "魔王", "-", "-", "-", "女神", "破壊神", "国津神", "-"],
		["-", "-", "-", "-", "-", "霊鳥", "天使", "堕天使", "邪龍", "精霊", "邪神", "-", "-", "-", "-", "夜魔", "霊鳥", "外道", "妖虫", "悪霊", "龍神", "霊鳥", "悪霊", "-", "-", "-", "-", "邪龍", "幽鬼", "天女", "妖樹", "妖虫", "聖獣", "妖獣", "霊鳥", "妖獣", "妖虫", "邪龍", "-", "-", "-", "霊鳥", "邪龍", "霊鳥", "-"],
		["-", "-", "-", "-", "凶鳥", "凶鳥", "邪龍", "神樹", "邪鬼", "邪神", "精霊", "-", "-", "-", "-", "妖鬼", "妖獣", "妖虫", "邪龍", "悪霊", "妖虫", "-", "-", "-", "-", "-", "-", "外道", "外道", "妖虫", "妖精", "邪龍", "凶鳥", "幻魔", "神樹", "死神", "妖獣", "-", "-", "-", "-", "神樹", "鬼女", "神樹", "-"],
		["女神", "神獣", "聖獣", "妖魔", "大天使", "大天使", "妖精", "鬼女", "-", "-", "-", "精霊", "幻魔", "神獣", "死神", "幻魔", "神獣", "妖鬼", "魔獣", "-", "-", "-", "-", "国津神", "聖獣", "国津神", "破壊神", "破壊神", "地霊", "龍王", "妖魔", "-", "-", "-", "死神", "-", "妖精", "幻魔", "大天使", "破壊神", "-", "天使", "-", "-", "聖獣"],
		["霊鳥", "魔神", "大天使", "天女", "妖精", "妖虫", "地霊", "妖精", "-", "-", "-", "幻魔", "精霊", "魔獣", "魔神", "鬼神", "地霊", "神樹", "龍神", "-", "-", "-", "-", "龍神", "神樹", "破壊神", "龍神", "龍王", "国津神", "聖獣", "魔獣", "-", "-", "-", "妖獣", "-", "魔獣", "魔神", "魔神", "龍神", "幻魔", "天使", "-", "幻魔", "神樹"],
		["霊鳥", "霊鳥", "妖鳥", "地霊", "神獣", "神獣", "龍王", "天使", "-", "-", "-", "神獣", "魔獣", "精霊", "妖精", "魔獣", "霊鳥", "悪霊", "龍神", "-", "-", "-", "-", "龍王", "魔神", "神樹", "妖鬼", "魔獣", "邪鬼", "地霊", "地霊", "-", "-", "-", "妖虫", "-", "魔獣", "妖精", "龍王", "妖精", "神獣", "天使", "-", "神獣", "魔神"],
		["-", "神樹", "聖獣", "-", "天女", "神獣", "夜魔", "女神", "-", "-", "-", "死神", "魔神", "妖精", "精霊", "魔神", "聖獣", "死神", "神獣", "-", "-", "-", "-", "鬼神", "国津神", "夜魔", "妖鬼", "聖獣", "鬼神", "鬼神", "妖鬼", "-", "-", "-", "幽鬼", "-", "夜魔", "魔神", "天女", "地霊", "死神", "天使", "-", "魔神", "鬼神"],
		["天使", "幻魔", "女神", "幻魔", "天女", "天使", "天使", "女神", "邪鬼", "夜魔", "妖鬼", "幻魔", "鬼神", "魔獣", "魔神", "精霊", "妖鳥", "魔獣", "霊鳥", "悪霊", "聖獣", "地母神", "妖樹", "魔神", "幻魔", "夜魔", "神樹", "夜魔", "鬼女", "地母神", "天使", "幽鬼", "妖樹", "妖鳥", "地霊", "妖樹", "妖魔", "死神", "天使", "夜魔", "幻魔", "-", "魔神", "幻魔", "幻魔"],
		["聖獣", "堕天使", "妖鳥", "神獣", "妖鬼", "妖魔", "聖獣", "神獣", "妖獣", "霊鳥", "妖獣", "神獣", "地霊", "霊鳥", "聖獣", "妖鳥", "精霊", "妖魔", "妖獣", "悪霊", "龍王", "聖獣", "妖獣", "龍王", "龍王", "妖獣", "神獣", "龍王", "龍王", "夜魔", "-", "妖獣", "外道", "妖獣", "妖鳥", "妖獣", "妖獣", "妖獣", "聖獣", "堕天使", "聖獣", "-", "神獣", "聖獣", "龍王"],
		["魔神", "神樹", "妖魔", "妖精", "堕天使", "凶鳥", "地母神", "天使", "邪鬼", "外道", "妖虫", "妖鬼", "神樹", "悪霊", "死神", "魔獣", "妖魔", "精霊", "堕天使", "悪霊", "妖樹", "妖鬼", "外道", "妖鬼", "鬼神", "地母神", "神樹", "龍神", "妖精", "妖鬼", "妖精", "邪鬼", "龍王", "妖虫", "妖精", "邪鬼", "妖獣", "悪霊", "国津神", "地母神", "妖鬼", "-", "国津神", "神樹", "破壊神"],
		["妖鳥", "妖樹", "-", "妖鳥", "妖虫", "魔獣", "妖鳥", "妖樹", "邪龍", "妖虫", "邪龍", "魔獣", "龍神", "龍神", "神獣", "霊鳥", "妖獣", "堕天使", "精霊", "悪霊", "妖虫", "邪龍", "堕天使", "龍神", "鬼女", "堕天使", "龍神", "龍神", "龍神", "邪龍", "妖魔", "邪龍", "妖虫", "邪龍", "魔獣", "妖樹", "妖鬼", "邪龍", "天女", "龍神", "魔獣", "-", "龍神", "-", "鬼女"],
		["-", "-", "-", "-", "邪神", "悪霊", "幽鬼", "悪霊", "魔王", "悪霊", "悪霊", "-", "-", "-", "-", "悪霊", "悪霊", "悪霊", "悪霊", "精霊", "悪霊", "幽鬼", "悪霊", "-", "-", "-", "-", "魔王", "悪霊", "悪霊", "幽鬼", "邪神", "悪霊", "妖樹", "邪神", "悪霊", "悪霊", "邪神", "-", "-", "-", "魔神", "魔王", "魔神", "-"],
		["-", "-", "-", "-", "凶鳥", "外道", "魔獣", "-", "凶鳥", "龍神", "妖虫", "-", "-", "-", "-", "聖獣", "龍王", "妖樹", "妖虫", "悪霊", "精霊", "邪龍", "悪霊", "-", "-", "-", "-", "凶鳥", "魔獣", "-", "妖虫", "邪龍", "霊鳥", "邪龍", "聖獣", "妖樹", "妖虫", "外道", "-", "-", "-", "神獣", "神獣", "神獣", "-"],
		["-", "-", "-", "-", "妖精", "邪龍", "幽鬼", "妖魔", "幽鬼", "霊鳥", "-", "-", "-", "-", "-", "地母神", "聖獣", "妖鬼", "邪龍", "幽鬼", "邪龍", "精霊", "妖獣", "-", "-", "-", "-", "邪龍", "外道", "幽鬼", "地霊", "邪龍", "魔王", "幽鬼", "鬼神", "女神", "幽鬼", "幽鬼", "-", "-", "-", "幻魔", "妖鬼", "幻魔", "-"],
		["-", "-", "-", "-", "凶鳥", "堕天使", "妖獣", "-", "凶鳥", "悪霊", "-", "-", "-", "-", "-", "妖樹", "妖獣", "外道", "堕天使", "悪霊", "悪霊", "妖獣", "精霊", "-", "-", "-", "-", "地霊", "妖獣", "-", "凶鳥", "凶鳥", "悪霊", "神樹", "神獣", "妖樹", "妖樹", "悪霊", "-", "-", "-", "聖獣", "妖鳥", "聖獣", "-"],
		["死神", "地母神", "大天使", "国津神", "堕天使", "堕天使", "夜魔", "鬼女", "-", "-", "-", "国津神", "龍神", "龍王", "鬼神", "魔神", "龍王", "妖鬼", "龍神", "-", "-", "-", "-", "精霊", "鬼神", "堕天使", "堕天使", "魔王", "鬼神", "地母神", "地霊", "-", "-", "-", "魔王", "-", "妖魔", "鬼神", "死神", "魔神", "-", "天使", "-", "大天使", "鬼神"],
		["女神", "魔神", "破壊神", "龍神", "外道", "夜魔", "幽鬼", "-", "-", "-", "-", "聖獣", "神樹", "魔神", "国津神", "幻魔", "龍王", "鬼神", "鬼女", "-", "-", "-", "-", "鬼神", "精霊", "破壊神", "鬼女", "鬼女", "鬼神", "妖鬼", "鬼女", "-", "-", "-", "女神", "-", "地霊", "-", "女神", "地霊", "聖獣", "天女", "-", "女神", "-"],
		["破壊神", "大天使", "神獣", "龍王", "邪龍", "魔獣", "幻魔", "地母神", "-", "-", "-", "国津神", "破壊神", "神樹", "夜魔", "夜魔", "妖獣", "地母神", "堕天使", "-", "-", "-", "-", "堕天使", "破壊神", "精霊", "鬼女", "妖鬼", "国津神", "堕天使", "外道", "-", "-", "-", "邪龍", "-", "龍王", "夜魔", "霊鳥", "魔獣", "地母神", "天使", "-", "神獣", "鬼女"],
		["-", "幻魔", "夜魔", "国津神", "龍王", "霊鳥", "魔王", "天使", "-", "-", "-", "破壊神", "龍神", "妖鬼", "妖鬼", "神樹", "神獣", "神樹", "龍神", "-", "-", "-", "-", "堕天使", "鬼女", "鬼女", "精霊", "龍神", "破壊神", "地霊", "魔獣", "-", "-", "-", "邪鬼", "-", "妖鬼", "妖鬼", "妖魔", "破壊神", "破壊神", "天使", "-", "破壊神", "-"],
		["-", "外道", "凶鳥", "邪神", "-", "天使", "龍王", "天使", "凶鳥", "邪龍", "外道", "破壊神", "龍王", "魔獣", "聖獣", "夜魔", "龍王", "龍神", "龍神", "魔王", "凶鳥", "邪龍", "地霊", "魔王", "鬼女", "妖鬼", "龍神", "精霊", "夜魔", "地母神", "妖鬼", "邪龍", "凶鳥", "魔獣", "天使", "妖魔", "外道", "魔王", "邪神", "妖精", "国津神", "-", "天使", "魔神", "鬼女"],
		["妖鳥", "天女", "幻魔", "国津神", "地霊", "魔獣", "邪鬼", "鬼女", "邪鬼", "幽鬼", "外道", "地霊", "国津神", "邪鬼", "鬼神", "鬼女", "龍王", "妖精", "龍神", "悪霊", "魔獣", "外道", "妖獣", "鬼神", "鬼神", "国津神", "破壊神", "夜魔", "精霊", "邪鬼", "悪霊", "邪鬼", "龍神", "邪鬼", "妖精", "外道", "邪鬼", "幽鬼", "国津神", "鬼神", "地霊", "-", "妖魔", "-", "鬼神"],
		["天女", "-", "女神", "地母神", "天女", "魔獣", "幽鬼", "-", "邪鬼", "天女", "妖虫", "龍王", "聖獣", "地霊", "鬼神", "地母神", "夜魔", "妖鬼", "邪龍", "悪霊", "-", "幽鬼", "-", "地母神", "妖鬼", "堕天使", "地霊", "地母神", "邪鬼", "精霊", "地母神", "邪鬼", "外道", "地母神", "天女", "悪霊", "魔獣", "悪霊", "天女", "地母神", "龍王", "-", "女神", "地母神", "妖鬼"],
		["妖魔", "天女", "凶鳥", "妖魔", "女神", "堕天使", "天使", "鬼女", "邪鬼", "妖樹", "妖精", "妖魔", "魔獣", "地霊", "妖鬼", "天使", "-", "妖精", "妖魔", "幽鬼", "妖虫", "地霊", "凶鳥", "地霊", "鬼女", "外道", "魔獣", "妖鬼", "悪霊", "地母神", "精霊", "邪鬼", "天女", "外道", "妖魔", "邪鬼", "地霊", "幽鬼", "堕天使", "魔獣", "妖魔", "-", "妖鳥", "国津神", "鬼女"],
		["-", "-", "-", "-", "凶鳥", "邪龍", "邪鬼", "邪鬼", "死神", "妖虫", "邪龍", "-", "-", "-", "-", "幽鬼", "妖獣", "邪鬼", "邪龍", "邪神", "邪龍", "邪龍", "凶鳥", "-", "-", "-", "-", "邪龍", "邪鬼", "邪鬼", "邪鬼", "精霊", "妖獣", "邪鬼", "死神", "邪鬼", "妖獣", "邪神", "-", "-", "-", "破壊神", "邪神", "魔神", "-"],
		["-", "-", "-", "-", "凶鳥", "外道", "妖鳥", "-", "妖獣", "聖獣", "凶鳥", "-", "-", "-", "-", "妖樹", "外道", "龍王", "妖虫", "悪霊", "霊鳥", "魔王", "悪霊", "-", "-", "-", "-", "凶鳥", "龍神", "外道", "天女", "妖獣", "精霊", "妖樹", "龍神", "妖樹", "妖虫", "邪鬼", "-", "-", "-", "-", "霊鳥", "-", "-"],
		["-", "-", "-", "-", "妖魔", "凶鳥", "幽鬼", "夜魔", "幽鬼", "妖獣", "幻魔", "-", "-", "-", "-", "妖鳥", "妖獣", "妖虫", "邪龍", "妖樹", "邪龍", "幽鬼", "神樹", "-", "-", "-", "-", "魔獣", "邪鬼", "地母神", "外道", "邪鬼", "妖樹", "精霊", "神樹", "妖樹", "妖獣", "死神", "-", "-", "-", "-", "天使", "聖獣", "-"],
		["邪神", "地母神", "凶鳥", "妖樹", "堕天使", "龍王", "夜魔", "鬼女", "魔王", "霊鳥", "神樹", "死神", "妖獣", "妖虫", "幽鬼", "地霊", "妖鳥", "妖精", "魔獣", "邪神", "聖獣", "鬼神", "神獣", "魔王", "女神", "邪龍", "邪鬼", "天使", "妖精", "天女", "妖魔", "死神", "龍神", "神樹", "-", "幻魔", "神獣", "邪神", "凶鳥", "妖獣", "死神", "鬼神", "魔王", "幻魔", "-"],
		["-", "-", "-", "-", "邪鬼", "夜魔", "-", "悪霊", "凶鳥", "妖獣", "死神", "-", "-", "-", "-", "妖樹", "妖獣", "邪鬼", "妖樹", "悪霊", "妖樹", "女神", "妖樹", "-", "-", "-", "-", "妖魔", "外道", "悪霊", "邪鬼", "邪鬼", "妖樹", "妖樹", "幻魔", "精霊", "妖虫", "邪鬼", "-", "-", "-", "鬼神", "妖魔", "-", "-"],
		["妖鳥", "鬼女", "妖鳥", "妖樹", "堕天使", "凶鳥", "夜魔", "鬼女", "妖獣", "妖虫", "妖獣", "妖精", "魔獣", "魔獣", "夜魔", "妖魔", "妖獣", "妖獣", "妖鬼", "悪霊", "妖虫", "幽鬼", "妖樹", "妖魔", "地霊", "龍王", "妖鬼", "外道", "邪鬼", "魔獣", "地霊", "妖獣", "妖虫", "妖獣", "神獣", "妖虫", "-", "妖獣", "天女", "妖鬼", "魔獣", "外道", "魔獣", "聖獣", "龍王"],
		["女神", "神樹", "聖獣", "妖精", "邪神", "邪龍", "幽鬼", "死神", "魔王", "邪龍", "天使", "幻魔", "魔神", "妖精", "魔神", "死神", "妖獣", "悪霊", "邪龍", "邪神", "外道", "幽鬼", "悪霊", "鬼神", "-", "夜魔", "妖鬼", "魔王", "幽鬼", "悪霊", "幽鬼", "邪神", "邪鬼", "死神", "邪神", "邪鬼", "妖獣", "-", "魔王", "破壊神", "-", "幻魔", "魔王", "破壊神", "鬼神"],
		["魔神", "天女", "大天使", "地霊", "女神", "霊鳥", "妖精", "女神", "-", "-", "-", "大天使", "魔神", "龍王", "天女", "-", "聖獣", "国津神", "天女", "-", "-", "-", "-", "死神", "女神", "霊鳥", "妖魔", "邪神", "国津神", "天女", "堕天使", "-", "-", "-", "凶鳥", "-", "天女", "魔王", "-", "魔神", "-", "-", "-", "大天使", "神樹"],
		["魔王", "地母神", "天使", "地霊", "邪神", "龍王", "堕天使", "鬼女", "-", "-", "-", "破壊神", "龍神", "妖精", "地霊", "夜魔", "堕天使", "地母神", "龍神", "-", "-", "-", "-", "魔神", "地霊", "魔獣", "破壊神", "妖精", "鬼神", "地母神", "魔獣", "-", "-", "-", "妖獣", "-", "妖鬼", "破壊神", "魔神", "精霊", "破壊神", "-", "-", "破壊神", "地母神"],
		["女神", "神獣", "聖獣", "妖魔", "大天使", "大天使", "妖精", "鬼女", "-", "-", "-", "-", "幻魔", "神獣", "死神", "幻魔", "聖獣", "妖鬼", "魔獣", "-", "-", "-", "-", "-", "聖獣", "地母神", "破壊神", "国津神", "地霊", "龍王", "妖魔", "-", "-", "-", "死神", "-", "魔獣", "死神", "魔神", "破壊神", "-", "天使", "-", "魔神", "聖獣"],
		["天使", "天女", "天使", "天使", "-", "-", "-", "-", "女神", "霊鳥", "神樹", "天使", "天使", "天使", "天使", "-", "-", "-", "-", "魔神", "神獣", "幻魔", "聖獣", "天使", "天女", "天使", "天使", "-", "-", "-", "-", "破壊神", "龍神", "地母神", "鬼神", "鬼神", "外道", "幻魔", "-", "-", "天使", "-", "破壊神", "幻魔", "-"],
		["-", "-", "-", "-", "堕天使", "龍神", "妖鬼", "地母神", "破壊神", "邪龍", "鬼女", "-", "-", "-", "-", "魔神", "神獣", "国津神", "龍神", "魔王", "神獣", "妖鬼", "妖鳥", "-", "-", "-", "-", "天使", "妖魔", "女神", "妖鳥", "邪神", "霊鳥", "天使", "魔王", "妖魔", "魔獣", "魔王", "-", "-", "-", "破壊神", "-", "魔神", "-"],
		["女神", "-", "大天使", "魔神", "大天使", "霊鳥", "幻魔", "女神", "国津神", "霊鳥", "神樹", "-", "幻魔", "神獣", "魔神", "幻魔", "聖獣", "神樹", "-", "魔神", "神獣", "幻魔", "聖獣", "大天使", "女神", "神獣", "破壊神", "魔神", "-", "地母神", "国津神", "魔神", "-", "聖獣", "幻魔", "-", "聖獣", "破壊神", "大天使", "破壊神", "魔神", "幻魔", "魔神", "-", "-"],
		["女神", "魔神", "破壊神", "龍神", "外道", "夜魔", "幽鬼", "-", "-", "-", "-", "聖獣", "神樹", "魔神", "鬼神", "幻魔", "龍王", "鬼神", "鬼女", "-", "-", "-", "-", "鬼神", "-", "鬼女", "-", "鬼女", "鬼神", "妖鬼", "鬼女", "-", "-", "-", "-", "-", "龍王", "鬼神", "神樹", "地母神", "聖獣", "-", "-", "-", "-"]];

	// Mapping of reverse fusions.
	this.mReverseChart = {"精霊":[["大天使","大天使"],["女神","女神"],["霊鳥","霊鳥"],["神樹","神樹"],["天使","天使"],["妖鳥","妖鳥"],["妖魔","妖魔"],["天女","天女"],["邪神","邪神"],["凶鳥","凶鳥"],["妖樹","妖樹"],["魔神","魔神"],["神獣","神獣"],["聖獣","聖獣"],["幻魔","幻魔"],["妖精","妖精"],["魔獣","魔獣"],["地霊","地霊"],["龍王","龍王"],["死神","死神"],["妖獣","妖獣"],["邪鬼","邪鬼"],["妖虫","妖虫"],["破壊神","破壊神"],["地母神","地母神"],["龍神","龍神"],["鬼神","鬼神"],["堕天使","堕天使"],["妖鬼","妖鬼"],["鬼女","鬼女"],["夜魔","夜魔"],["魔王","魔王"],["邪龍","邪龍"],["悪霊","悪霊"],["幽鬼","幽鬼"],["国津神","国津神"]],"幻魔":[["大天使","女神"],["女神","妖精"],["女神","鬼神"],["妖鬼","霊鳥"],["妖魔","神樹"],["妖精","神樹"],["妖魔","龍神"],["妖魔","英傑"],["妖樹","悪霊"],["神獣","魔神"],["妖精","魔神"],["魔人","魔神"],["神獣","秘神"],["神獣","英傑"],["地母神","妖精"],["妖精","秘神"],["妖精","英傑"],["妖精","威霊"],["屍鬼","邪鬼"],["英傑","邪鬼"],["外道","幽鬼"],["外道","英傑"],["屍鬼","魔人"],["屍鬼","英傑"]],"天使":[["大天使","霊鳥"],["大天使","神樹"],["大天使","妖精"],["大天使","屍鬼"],["女神","妖鳥"],["妖鳥","霊鳥"],["国津神","霊鳥"],["屍鬼","霊鳥"],["屍鬼","神樹"],["妖精","妖鳥"],["堕天使","妖鳥"],["凶鳥","妖魔"],["妖精","妖魔"],["夜魔","妖魔"],["天女","聖獣"],["地霊","天女"],["天女","鬼神"],["堕天使","天女"],["屍鬼","魔神"],["屍鬼","神獣"],["屍鬼","聖獣"],["屍鬼","幻魔"],["夜魔","妖精"],["天津神","妖精"],["屍鬼","破壊神"],["屍鬼","龍神"],["屍鬼","鬼神"],["堕天使","外道"],["堕天使","狂神"],["悪霊","狂神"],["妖樹","魔人"],["屍鬼","秘神"]],"邪神":[["大天使","天使"],["外道","大天使"],["堕天使","神樹"],["天使","死神"],["天使","魔人"],["国津神","天使"],["凶鳥","妖樹"],["死神","魔王"],["外道","死神"],["死神","魔人"],["堕天使","天津神"],["魔人","魔王"],["狂神","魔王"],["外道","魔人"]],"霊鳥":[["大天使","妖鳥"],["大天使","神獣"],["大天使","聖獣"],["女神","聖獣"],["妖鳥","神樹"],["天使","妖鳥"],["天女","妖鳥"],["凶鳥","妖鳥"],["地霊","妖鳥"],["妖鳥","鬼神"],["天津神","妖鳥"],["妖鳥","英傑"],["凶鳥","魔獣"],["凶鳥","邪鬼"],["凶鳥","外道"],["凶鳥","屍鬼"],["凶鳥","英傑"],["聖獣","魔獣"],["妖精","龍王"],["妖獣","邪龍"],["天津神","龍神"],["狂神","邪龍"]],"神樹":[["大天使","妖魔"],["天女","女神"],["女神","幻魔"],["地霊","女神"],["女神","魔人"],["天女","霊鳥"],["天女","妖樹"],["外道","妖樹"],["妖樹","屍鬼"],["妖樹","英傑"],["地霊","神獣"],["地母神","神獣"],["威霊","神獣"],["聖獣","龍神"],["妖精","鬼神"],["地霊","鬼神"],["地霊","英傑"],["妖虫","悪霊"],["外道","悪霊"],["天津神","威霊"]],"女神":[["大天使","天女"],["大天使","魔神"],["地母神","大天使"],["大天使","魔人"],["大天使","秘神"],["大天使","英傑"],["大天使","威霊"],["妖精","霊鳥"],["霊鳥","鬼女"],["天女","神樹"],["天使","天女"],["夜魔","天使"],["天使","天津神"],["天女","幻魔"],["天女","妖精"],["天女","天津神"],["天女","英傑"],["屍鬼","邪神"],["幽鬼","邪鬼"],["地母神","外道"],["地母神","天津神"],["地母神","英傑"],["狂神","鬼女"]],"聖獣":[["大天使","魔獣"],["霊鳥","魔神"],["幻魔","霊鳥"],["霊鳥","魔人"],["秘神","霊鳥"],["妖魔","魔獣"],["凶鳥","邪龍"],["地母神","魔神"],["威霊","魔神"],["神獣","鬼女"],["幻魔","魔獣"],["堕天使","幻魔"],["妖獣","妖精"],["邪鬼","魔獣"],["天津神","魔獣"],["秘神","魔獣"],["英傑","魔獣"],["外道","妖獣"],["妖虫","屍鬼"],["妖虫","英傑"],["地母神","秘神"],["悪霊","英傑"],["フード","英傑"],["威霊","秘神"]],"魔神":[["地霊","大天使"],["大天使","天津神"],["女神","神獣"],["地母神","女神"],["女神","威霊"],["神樹","英傑"],["幻魔","神獣"],["神獣","魔人"],["天津神","神獣"],["地母神","聖獣"],["威霊","聖獣"],["妖精","幻魔"],["幻魔","魔人"],["幻魔","英傑"],["妖精","破壊神"],["妖精","狂神"],["屍鬼","死神"],["死神","英傑"],["国津神","破壊神"],["堕天使","英傑"],["英傑","魔王"],["国津神","天津神"],["天津神","秘神"],["秘神","英傑"],["狂神","英傑"]],"妖鳥":[["大天使","龍王"],["大天使","妖鬼"],["フード","大天使"],["神樹","霊鳥"],["天使","霊鳥"],["聖獣","霊鳥"],["霊鳥","魔獣"],["フード","霊鳥"],["神樹","龍王"],["天使","妖魔"],["妖魔","龍王"],["妖魔","邪龍"],["妖精","魔獣"],["妖精","悪霊"],["外道","魔獣"],["妖虫","狂神"],["夜魔","狂神"]],"死神":[["大天使","破壊神"],["天女","魔人"],["邪神","魔王"],["妖樹","幽鬼"],["幻魔","魔神"],["外道","魔神"],["地霊","幻魔"],["幻魔","秘神"],["妖精","魔人"],["天津神","破壊神"],["外道","魔王"],["悪霊","魔人"],["外道","秘神"],["秘神","魔人"]],"破壊神":[["大天使","龍神"],["地母神","霊鳥"],["威霊","霊鳥"],["狂神","邪神"],["鬼神","魔神"],["堕天使","魔神"],["国津神","魔神"],["神獣","龍神"],["地霊","威霊"],["地母神","龍神"],["妖鬼","鬼神"],["国津神","鬼神"],["秘神","鬼神"],["英傑","鬼神"],["屍鬼","魔王"],["国津神","魔人"],["英傑","魔人"],["国津神","秘神"],["国津神","英傑"],["屍鬼","狂神"]],"天女":[["大天使","鬼女"],["女神","霊鳥"],["女神","妖魔"],["女神","妖鬼"],["夜魔","女神"],["天津神","女神"],["女神","屍鬼"],["神樹","神獣"],["天使","幻魔"],["天使","妖精"],["天使","鬼女"],["妖魔","妖鳥"],["凶鳥","鬼女"],["天津神","幻魔"],["天津神","龍王"],["地母神","屍鬼"],["外道","鬼女"],["天津神","鬼女"],["夜魔","邪龍"],["フード","天津神"]],"妖魔":[["夜魔","大天使"],["天使","女神"],["地霊","霊鳥"],["神樹","魔神"],["夜魔","神樹"],["神樹","秘神"],["天使","悪霊"],["妖鳥","魔獣"],["天女","邪鬼"],["夜魔","魔神"],["フード","妖精"],["地霊","魔獣"],["夜魔","龍王"],["フード","破壊神"],["天津神","鬼神"],["堕天使","幽鬼"],["妖鬼","狂神"],["外道","夜魔"],["夜魔","秘神"],["幽鬼","狂神"]],"魔王":[["国津神","大天使"],["妖魔","鬼神"],["死神","邪神"],["外道","邪神"],["邪神","魔人"],["堕天使","死神"],["死神","狂神"],["邪鬼","邪龍"],["堕天使","破壊神"],["外道","破壊神"],["堕天使","魔人"],["外道","狂神"],["天津神","魔人"],["狂神","魔人"]],"大天使":[["女神","神樹"],["女神","龍神"],["神獣","霊鳥"],["破壊神","霊鳥"],["天津神","霊鳥"],["英傑","霊鳥"],["天使","神樹"],["天使","魔神"],["天使","秘神"],["天使","英傑"],["妖鳥","魔神"],["妖鳥","秘神"],["天津神","魔神"],["破壊神","英傑"],["天津神","英傑"]],"神獣":[["女神","魔神"],["女神","秘神"],["霊鳥","龍神"],["神樹","魔獣"],["天使","聖獣"],["妖鳥","聖獣"],["妖鳥","幻魔"],["天女","魔獣"],["聖獣","魔神"],["魔獣","魔神"],["秘神","聖獣"],["聖獣","英傑"],["幻魔","龍王"],["鬼神","魔獣"],["狂神","魔獣"],["妖獣","屍鬼"],["妖獣","狂神"],["妖獣","英傑"],["外道","妖虫"],["英傑","龍神"],["フード","外道"]],"堕天使":[["女神","魔獣"],["地霊","天使"],["天使","破壊神"],["外道","天使"],["フード","天使"],["天使","狂神"],["妖虫","妖鳥"],["妖鳥","破壊神"],["夜魔","妖鳥"],["国津神","妖魔"],["凶鳥","天女"],["国津神","魔獣"],["地霊","龍王"],["妖虫","龍王"],["龍王","龍神"],["破壊神","龍神"],["破壊神","鬼神"],["鬼女","龍神"],["夜魔","天津神"]],"妖樹":[["女神","龍王"],["外道","神樹"],["フード","神樹"],["天女","龍王"],["凶鳥","夜魔"],["妖精","妖虫"],["妖精","邪龍"],["妖精","幽鬼"],["地霊","妖獣"],["幽鬼","龍王"],["悪霊","死神"],["妖獣","幽鬼"],["妖虫","幽鬼"],["フード","妖虫"],["悪霊","邪龍"],["幽鬼","邪龍"],["幽鬼","悪霊"]],"地母神":[["女神","破壊神"],["外道","女神"],["国津神","女神"],["神樹","鬼女"],["地霊","妖魔"],["天女","龍神"],["天女","狂神"],["妖精","邪鬼"],["妖精","鬼女"],["地霊","龍神"],["国津神","地霊"],["破壊神","鬼女"],["秘神","龍神"],["堕天使","鬼女"],["夜魔","鬼女"],["悪霊","鬼女"],["国津神","鬼女"],["英傑","鬼女"],["国津神","威霊"],["屍鬼","悪霊"]],"外道":[["堕天使","女神"],["妖魔","霊鳥"],["地母神","天使"],["天使","威霊"],["妖獣","妖鳥"],["妖鳥","邪龍"],["天女","邪神"],["凶鳥","地霊"],["堕天使","妖樹"],["妖樹","妖鬼"],["邪龍","魔獣"],["地霊","妖虫"],["妖獣","魔人"],["妖鬼","邪鬼"],["夜魔","龍神"],["フード","堕天使"],["妖鬼","幽鬼"],["邪龍","鬼女"],["夜魔","悪霊"],["フード","屍鬼"]],"鬼女":[["フード","女神"],["天女","魔神"],["天女","破壊神"],["天女","妖鬼"],["夜魔","天女"],["外道","天女"],["フード","天女"],["国津神","天女"],["天女","秘神"],["妖樹","狂神"],["妖精","妖鬼"],["地母神","龍王"],["威霊","龍王"],["地母神","鬼神"],["地母神","堕天使"],["地母神","夜魔"],["鬼神","龍神"],["威霊","龍神"],["堕天使","威霊"],["夜魔","威霊"]],"夜魔":[["霊鳥","鬼神"],["地母神","妖鳥"],["妖鳥","幽鬼"],["妖鳥","威霊"],["妖魔","幻魔"],["妖魔","破壊神"],["外道","妖魔"],["フード","妖魔"],["天女","悪霊"],["凶鳥","妖精"],["幻魔","龍神"],["フード","幻魔"],["妖精","龍神"],["堕天使","妖精"],["国津神","妖精"],["鬼女","魔獣"],["魔人","龍神"],["堕天使","妖鬼"]],"凶鳥":[["堕天使","霊鳥"],["夜魔","霊鳥"],["外道","霊鳥"],["天使","邪神"],["天使","妖獣"],["天使","妖虫"],["天使","魔王"],["天使","邪龍"],["妖鳥","邪神"],["妖樹","妖鳥"],["妖鳥","悪霊"],["フード","妖鳥"],["妖獣","邪神"],["妖虫","邪神"],["堕天使","邪神"],["幽鬼","邪神"],["天使","妖樹"],["妖樹","邪龍"],["地霊","妖鳥"],["堕天使","妖獣"],["夜魔","妖虫"],["妖虫","魔王"],["堕天使","邪龍"],["外道","天津神"]],"地霊":[["神樹","聖獣"],["天津神","神樹"],["国津神","神樹"],["天使","妖樹"],["天使","妖鬼"],["妖魔","神獣"],["妖鬼","魔神"],["神獣","魔獣"],["聖獣","鬼女"],["夜魔","聖獣"],["国津神","幻魔"],["外道","妖精"],["夜魔","邪鬼"],["堕天使","妖虫"],["夜魔","破壊神"],["フード","地母神"],["国津神","地母神"],["鬼女","鬼神"],["妖鬼","秘神"],["フード","夜魔"]],"妖精":[["地霊","神樹"],["神樹","魔人"],["天使","神獣"],["天使","邪鬼"],["天女","妖魔"],["妖魔","魔神"],["天津神","妖魔"],["妖魔","秘神"],["天女","神獣"],["夜魔","妖樹"],["フード","魔神"],["幻魔","聖獣"],["聖獣","魔人"],["国津神","聖獣"],["地霊","妖鬼"],["地霊","夜魔"],["地霊","外道"],["国津神","堕天使"],["外道","妖鬼"]],"国津神":[["破壊神","神樹"],["神樹","鬼神"],["妖鬼","神樹"],["英傑","邪神"],["破壊神","魔神"],["魔神","龍神"],["妖鬼","神獣"],["地母神","幻魔"],["地霊","天津神"],["地霊","狂神"],["妖鬼","龍神"],["堕天使","秘神"],["天津神","妖鬼"],["夜魔","英傑"]],"龍神":[["地母神","神樹"],["威霊","神樹"],["妖鳥","狂神"],["凶鳥","妖獣"],["神獣","龍王"],["破壊神","神獣"],["神獣","鬼神"],["国津神","神獣"],["聖獣","龍王"],["地霊","堕天使"],["破壊神","龍王"],["鬼神","龍王"],["堕天使","龍王"],["妖鬼","龍王"],["国津神","龍王"],["狂神","龍王"],["堕天使","鬼神"],["妖鬼","邪龍"],["外道","邪龍"],["屍鬼","邪龍"]],"龍王":[["神樹","龍神"],["天使","鬼神"],["外道","妖鳥"],["国津神","妖鳥"],["妖魔","聖獣"],["堕天使","妖魔"],["鬼女","魔神"],["堕天使","神獣"],["破壊神","聖獣"],["天津神","聖獣"],["妖獣","魔獣"],["破壊神","魔獣"],["地母神","魔獣"],["堕天使","魔獣"],["妖鬼","魔獣"],["威霊","魔獣"],["地霊","邪龍"],["フード","龍神"],["秘神","鬼女"],["フード","威霊"]],"妖鬼":[["天使","魔獣"],["妖魔","狂神"],["妖樹","妖精"],["地霊","魔神"],["聖獣","鬼神"],["幻魔","鬼神"],["夜魔","幻魔"],["地霊","邪鬼"],["地霊","破壊神"],["地霊","鬼女"],["地霊","秘神"],["フード","龍王"],["狂神","邪鬼"],["地母神","鬼女"],["堕天使","龍神"],["フード","鬼神"],["鬼神","魔人"],["堕天使","夜魔"],["威霊","鬼女"],["フード","国津神"]],"妖虫":[["天使","龍王"],["妖鳥","神獣"],["凶鳥","龍王"],["凶鳥","魔王"],["フード","凶鳥"],["地霊","妖樹"],["妖樹","妖獣"],["妖樹","鬼女"],["外道","聖獣"],["地霊","悪霊"],["妖獣","龍王"],["邪龍","龍王"],["夜魔","妖獣"],["フード","妖獣"],["フード","邪龍"],["フード","幽鬼"]],"邪龍":[["天使","龍神"],["妖鳥","邪鬼"],["妖鳥","魔王"],["妖鳥","魔人"],["妖樹","妖魔"],["凶鳥","邪神"],["邪神","龍王"],["凶鳥","堕天使"],["凶鳥","魔人"],["凶鳥","狂神"],["妖樹","龍王"],["妖樹","魔王"],["邪鬼","龍王"],["鬼女","龍王"],["魔王","龍王"],["悪霊","龍王"],["魔人","龍王"],["妖獣","邪鬼"],["妖獣","魔王"],["妖獣","悪霊"],["堕天使","邪鬼"],["邪鬼","魔王"],["外道","龍神"],["堕天使","魔王"]],"邪鬼":[["天使","幽鬼"],["妖魔","邪神"],["妖鬼","妖魔"],["妖魔","魔王"],["天女","魔王"],["妖樹","邪神"],["妖精","邪神"],["地霊","邪神"],["妖鬼","邪神"],["邪神","鬼女"],["夜魔","邪神"],["妖鬼","聖獣"],["地霊","魔王"],["地霊","幽鬼"],["外道","鬼神"],["妖鬼","鬼女"],["妖鬼","魔王"],["妖鬼","悪霊"],["フード","妖鬼"],["鬼女","魔王"],["夜魔","魔王"],["夜魔","幽鬼"],["悪霊","魔王"],["幽鬼","魔王"],["邪龍","魔人"],["幽鬼","魔人"]],"魔獣":[["妖鳥","龍王"],["妖鳥","龍神"],["妖鬼","妖鳥"],["妖鳥","鬼女"],["妖獣","妖魔"],["魔神","龍王"],["神獣","聖獣"],["夜魔","神獣"],["フード","神獣"],["妖精","聖獣"],["堕天使","聖獣"],["フード","聖獣"],["地霊","妖精"],["外道","龍王"],["秘神","龍王"],["妖獣","妖鬼"],["国津神","龍神"],["夜魔","鬼神"],["堕天使","悪霊"],["フード","鬼女"],["国津神","夜魔"],["フード","秘神"],["フード","狂神"]],"悪霊":[["妖鳥","死神"],["天女","死神"],["天女","幽鬼"],["凶鳥","死神"],["凶鳥","妖虫"],["妖樹","死神"],["地霊","聖獣"],["妖精","死神"],["死神","魔獣"],["地霊","死神"],["地霊","魔人"],["死神","龍王"],["妖獣","死神"],["妖虫","死神"],["妖鬼","死神"],["死神","鬼女"],["死神","邪龍"],["幽鬼","死神"],["フード","死神"],["妖獣","妖虫"],["妖虫","邪龍"],["妖虫","魔人"],["夜魔","妖鬼"],["幽鬼","鬼女"],["鬼女","魔人"]],"幽鬼":[["妖魔","死神"],["妖魔","邪鬼"],["地母神","妖魔"],["妖魔","鬼女"],["妖魔","悪霊"],["妖魔","魔人"],["妖魔","威霊"],["邪神","邪鬼"],["悪霊","邪神"],["凶鳥","妖鬼"],["外道","幻魔"],["妖精","魔王"],["死神","邪鬼"],["夜魔","死神"],["邪鬼","鬼女"],["悪霊","邪鬼"],["フード","邪鬼"],["邪鬼","魔人"],["妖鬼","魔人"],["夜魔","魔人"]],"妖獣":[["妖虫","妖魔"],["邪神","魔獣"],["邪神","邪龍"],["フード","邪神"],["凶鳥","悪霊"],["凶鳥","幽鬼"],["妖樹","魔獣"],["フード","妖樹"],["外道","神獣"],["魔獣","龍王"],["妖虫","魔獣"],["魔獣","龍神"],["魔獣","魔王"],["悪霊","魔獣"],["幽鬼","魔獣"],["フード","魔獣"],["魔人","魔獣"],["フード","地霊"],["妖虫","邪鬼"],["妖虫","妖鬼"],["邪龍","魔王"],["フード","魔王"],["フード","悪霊"],["国津神","外道"],["フード","魔人"]],"鬼神":[["妖精","神獣"],["幻魔","破壊神"],["妖鬼","幻魔"],["幻魔","鬼女"],["威霊","幻魔"],["地母神","地霊"],["外道","邪鬼"],["地母神","破壊神"],["妖鬼","破壊神"],["破壊神","魔人"],["威霊","破壊神"],["地母神","妖鬼"],["国津神","妖鬼"],["妖鬼","威霊"],["外道","屍鬼"],["屍鬼","幽鬼"],["威霊","魔人"],["地霊","威霊"]]};
}

//
// Public Methods
//

/**
 * Restore the COMP list from a cookie.
 */
COMPImpl.prototype.loadCookie = function() {
	// Load the COMP data from a cookie (expires in 5 years).
	var compData = $.cookie("comp");
this.fusionChartCheck();
	// Set the COMP data if it's valid.
	if(compData && compData.length)
		this.mCompList = compData;

	// Try to refresh the COMP.
	try {
		COMP.refresh();
	} catch(e) {
		// It didn't work, wipe the data.
		this.mCompList = [ ];

		COMP.refresh();
	}
}

/**
 * Add a demon to the COMP.
 * @arg name English name of the demon to add to the comp.
 */
COMPImpl.prototype.addDemon = function(name) {
	// Fetch the data for the demon.
	var demon = Database.demonByNameEN(name);

	// If the demon was not found in the database, bail.
	if(demon == undefined)
		return;

	// Array of skills the demon knows.
	var skills = [ ];

	// Add all the base level skills to the array.
	$.each(demon.skills, function(skill, obtainLvl) {
		if(obtainLvl <= 0)
			skills.push(Database.translateSkillJP(skill));
	});

	// Add the demon to the COMP.
	this.mCompList.push({
		"nameEN": demon.nameEN,
		"level": demon.level,
		"skills": skills
	});

	// Show the COMP tab.
	Application.showTab("comp");

	// Refresh the COMP.
	this.refresh();
}

/**
 * Refresh the COMP list.
 */
COMPImpl.prototype.refresh = function() {
	// Empty the COMP list first.
	var compList = $("#compList").empty();

	// If the COMP is empty, bitch.
	if(this.mCompList.length < 1) {
		compList.append($.create("p").text("Your COMP is empty. Add demons " +
			"from their respective details page."));
	}

	$.each(this.mCompList, function(index, demon) {
		// Separate the entries.
		if(compList.children().length)
			compList.append($.create("br"));

		// Create and append the HTML for each demon.
		compList.append(Renderer.handleCOMPEntry(index, demon));
	});

	// Save the COMP as a cookie (expires in 5 years).
	$.cookie("comp", this.mCompList, { expires: 365 * 5 });

	//$("#compResults").html(computeFusions());
}

/**
 * Determine if the demon can be reverse fused.
 * @arg demon The demon data of the demon to reverse fuse.
 * @returns true if you can reverse fuse; false otherwise.
 */
COMPImpl.prototype.canReverse = function(demon) {
	//baseDemon.fusions || (reverseChart[baseDemon.tribe] && reverseChart[baseDemon.tribe].length
}

/**
 * Validate the fusion chart. This is for debug and not normal use.
 */
COMPImpl.prototype.fusionChartCheck = function() {
	// Make sure there is the right number of tribes.
	if(this.mFusionChart.length != 45)
		alert('Wrong number of rows!');

	// Clear the reverse fusion chart before we add to it.
	this.mReverseChart = { };

	// Copy the fusion chart reference.
	var fusionChart = this.mFusionChart;

	// Copy the reverse chart reference.
	var reverseChart = this.mReverseChart;

	// Process each row of data.
	$.each(this.mFusionChart, function(row, columns){
		// There should be as many columns in each row as there are rows.
		if(columns.length != fusionChart.length)
			alert('Wrong number of columns!');

		// Validate each element.
		$.each(columns, function(column, result) {
			var a = Database.tribeFromIndex(row);
			var b = Database.tribeFromIndex(column);

			// Sanity check same tribe fusions.
			if(column == row && result != "-" && result != "精霊")
				alert("Invalid combination: " + a + "x" + b + "=" + result);

			// Sanity check that the result is a tribe or nothing.
			if(result != "-" && Database.tribeByNameJP(result) == undefined)
				alert("Invalid combination: " + a + "x" + b + "=" + result);

			// Sanity check that the result is the same for both A x B as
			// well as B x A.
			if(fusionChart[column][row] != fusionChart[row][column]) {
				alert("Chart not symmetric: " + a.nameJP + " x " + b.nameJP +
					"\n" + a.nameEN + " x " + b.nameEN);
			}

			// If there is a result tribe, add the combination to the reverse
			// fusion chat.
			if(result != "-") {
				// The combination.
				var combo = [b, a];

				// Order the combination so the strings are always in the same
				// order.
				if(a < b)
					combo = [a, b];

				// If the reverse chart for this result is empty, add a new
				// entry with the combo; otherwise, add the combo to the array
				// if it has not already been added.
				if(!reverseChart[result] || !reverseChart[result].length) {
					reverseChart[result] = [combo];
				} else {
					// If the combo was found or not.
					var hasCombo = false;

					// Compare all the combos in the array with the new combo.
					$.each(reverseChart[result], function(index, thisCombo) {
						if(thisCombo[0] == combo[0] &&
							thisCombo[1] == combo[1]) {
								hasCombo = true;
						}
					});

					// If the combo is new, add it.
					if(!hasCombo)
						reverseChart[result].push(combo);
				}
			}
		});
	});
}

// Singleton for the COMP.
var COMP = new COMPImpl();

// http://stackoverflow.com/questions/3959211/fast-factorial-function-in-javascript
var f = [ ];
function factorial(n) {
	if(n == 0 || n == 1)
		return 1;
	else if(f[n] > 0)
		return f[n];
	else
		return f[n] = factorial(n - 1) * n;
}

function componentToCOMP(nameEN, close) {
	if(close === undefined || close)
		$("#compSplitDialog").dialog("close");

	currentDemon = demonByNameEN[nameEN.replace("$", "'").toLowerCase()];

	addToCOMP();
}

function renderFusion(a, b, idxA, idxB) {
	var result = calculateFusion(a, b);

	if(result !== undefined) {
		var html = "<div class=\"compCombo\" onClick=\"compFuse(" +
			idxA + ", " + idxB + ");\">";

		html += "<a class=\"section\">" + a.nameEN + " (" + a.level + ")</a>";
		html += "&nbsp;+&nbsp;";
		html += "<a class=\"section\">" + b.nameEN + " (" + b.level + ")</a>";
		html += "&nbsp;=&nbsp;";
		html += "<a class=\"section\">" + result.nameEN + " (" +
			result.level + ")</a>";
		html += "</div>";

		// We have to be careful not to modify the base object (which is the
		// demon data from the database!) and add the HTML to it. We must COPY
		// the data we need from the demon data and add the HTML data to a new
		// object instead.
		return {
			"nameEN": result.nameEN,
			"level": result.level,
			"html": html
		}
	}

	return undefined;
}

function renderReverseFusion(result, a, b, resultIndex) {
	var html = "";
	if(resultIndex !== undefined) {
		html = "<div class=\"compCombo\" onClick=\"compDismiss(" +
			resultIndex + "); componentToCOMP('" +
			a.nameEN.replace("'", "$") + "'); componentToCOMP('" +
			b.nameEN.replace("'", "$") + "');\">";
	} else {
		html = "<div class=\"compCombo\" onClick=\"componentToCOMP('" +
			a.nameEN.replace("'", "$") + "', false); componentToCOMP('" +
			b.nameEN.replace("'", "$") + "', false);\">";
	}

	var activeSkills = [ ];
	var learnedSkills = [ ];
	var skillList = "";

	$.each(a.skills, function(nameJP, obtainLvl) {
		if(obtainLvl > a.level) {
			/*if(skillByNameJP[nameJP] == undefined) {
				alert("Please ask the developer to add the skill " +
					nameJP + " on the demon " + a.nameEN);
			} else {*/
				learnedSkills.push(skillByNameJP[nameJP].nameEN +
					" (" + a.nameEN + " - " + obtainLvl + ")");
			//}
		} else {
			/*if(skillByNameJP[nameJP] == undefined) {
				alert("Please ask the developer to add the skill " +
					nameJP + " on the demon " + a.nameEN);
			} else {*/
				activeSkills.push(skillByNameJP[nameJP].nameEN);
			//}
		}
	});

	$.each(b.skills, function(nameJP, obtainLvl) {
		if(obtainLvl > b.level) {
			/*if(skillByNameJP[nameJP] == undefined) {
				alert("Please ask the developer to add the skill " +
					nameJP + " on the demon " + b.nameEN);
			} else {*/
				learnedSkills.push(skillByNameJP[nameJP].nameEN +
					" (" + b.nameEN + " - " + obtainLvl + ")");
			//}
		} else if(a.skills["nameJP"] === undefined) {
			/*if(skillByNameJP[nameJP] == undefined) {
				alert("Please ask the developer to add the skill " +
					nameJP + " on the demon " + b.nameEN);
			} else {*/
				activeSkills.push(skillByNameJP[nameJP].nameEN);
			//}
		}
	});

	$.each(activeSkills, function(index, code) {
		if(skillList.length)
			skillList += " / " + code;
		else
			skillList += code;
	});

	var total = activeSkills.length + learnedSkills.length;
	var isFirst = true;

	if(learnedSkills.length && total > 4)
		skillList += "<br/>";
	else
		isFirst = false;

	$.each(learnedSkills, function(index, code) {
		if(!isFirst)
			skillList += " / " + code;
		else
			skillList += code;

		isFirst = false;
	});

	html += "<a class=\"section\">" + a.nameEN + " (" + a.level + ")</a>";
	html += "&nbsp;+&nbsp;";
	html += "<a class=\"section\">" + b.nameEN + " (" + b.level + ")</a>";
	html += "<br/>Skills this combination can produce:<br/>" + skillList;
	html += "</div>";

	return html;
}

function compFindDemon(searchTerm) {
	var idx = -1;

	$.each(compList, function(index, data) {
		if(data.nameEN == searchTerm) {
			idx = index;

			return false;
		}
	});

	return idx;
}

function compFuseSpecial(nameEN) {
	var data = demonByNameEN[nameEN.toLowerCase()];

	var result = {
		// Keep track of the fusion history.
		"parents": [ ],
		"nameEN": data.nameEN,
		"level": data.level,
		"skills": [ ]
	};

	// Copy the initial skills
	$.each(data.skills, function(skill, obtainLvl) {
		if(obtainLvl <= result.level)
			result.skills.push(skillByNameJP[skill].nameEN);
	});

	$.each(data["fusions"][0], function(index, component) {
		// Remove the original demon.
		var parent = compList.splice(compFindDemon(nameEN), 1)[0];

		// Add the demon as a parent.
		result.parents.push(parent);

		// Add the skills to the result.
		$.each(parent.skills, function(index, skill) {
			if(result.skills.indexOf(skill) < 0)
				result.skills.push(skill);
		});
	});

	// Add the new demon.
	compList.push(result);

	// Select the 8 skills (if we have over 8).
	if(result.skills.length > 8) {
		compSelectSkills(compList.length - 1);
	} else {
		refleshCOMP();
	}
}

function computeFusions() {
	if(compList.length < 2)
		return "";

	var fuseList = [ ];

	// Handle all special fusions.
	if(compList.length >= 3) {
		$.each(demonByNameEN, function(nameEN, data) {
			if(data["fusions"] && data["fusions"].length) {
				var haveFusion = true;

				$.each(data["fusions"][0], function(index, component) {
					var idx = compFindDemon(demonByNameJP[component].nameEN);

					if(idx < 0)
						haveFusion = false;
				});

				if(haveFusion) {
					var html = "<div class=\"compCombo\" onClick=\"" +
						"compFuseSpecial('" + data.nameEN + "');\">";

					$.each(data["fusions"][0], function(index, component) {
						var a = demonByNameJP[component];

						html += "<a class=\"section\">" + a.nameEN +
							" (" + a.level + ")</a>";
						html += "&nbsp;+&nbsp;";
					});

					html = html.substring(0, html.length - 7) + "=&nbsp;";
					html += "<a class=\"section\">" + data.nameEN + " (" +
						data.level + ")</a>";
					html += "</div>";

					fuseList.push({"html": html});
				}
			}
		});
	}

	/*
	 * The chart would look like this:
	 *   0 1 2 3 4
	 * 0 - A B C D
	 * 1 A - E F G
	 * 2 B E - H I
	 * 3 C F H - J
	 * 4 D G I J -
	 * And we don't want repeats so after they are gone:
	 *   0 1 2 3 4
	 * 0 - A B C D
	 * 1 - - E F G
	 * 2 - - - H I
	 * 3 - - - - J
	 * 4 - - - - -
	 * Thus we start each row at it's column index + 1.
	 */

	// Calculate the fusion combinations.
	for(var a = 0; a < compList.length; a++) {
		for(var b = a + 1; b < compList.length; b++) {
			var result = renderFusion(compList[a], compList[b], a, b);

			if(result !== undefined)
				fuseList.push(result);
		}
	}

	// Sort the fusions results (level then name).
	fuseList.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	var html = "";

	// Create HTML for the results.
	$.each(fuseList, function(index, result) {
		var code = result["html"];

		if(code.length && html.length)
			html += "<br/>" + code;
		else
			html += code;
	});

	if(html.length) {
		html = "<p><a class=\"button_up\">Possible Fusions</a></p>" + html;
	}

	return html;
}

function computeReverseFusions(targetName, components, resultIndex) {
	if(components.length < 2)
		return [ ];

	var fuseList = [ ];

	// Calculate the fusion combinations.
	for(var a = 0; a < components.length; a++) {
		for(var b = a + 1; b < components.length; b++) {
			var result = calculateFusion(components[a], components[b]);

			if(result !== undefined && result.nameEN == targetName) {
				fuseList.push(renderReverseFusion(result,
					components[a], components[b], resultIndex));
			}
		}
	}

	return fuseList;
}

function calculateFusion(a, b) {
	if(a >= elementalRanks.length || b >= elementalRanks.length)
		return undefined;

	//alert(a.nameEN + " x " + b.nameEN);

	var baseDemonA = demonByNameEN[a.nameEN.toLowerCase()];
	var baseDemonB = demonByNameEN[b.nameEN.toLowerCase()];

	var idxA = tribeListJP.indexOf(baseDemonA.tribe);
	var idxB = tribeListJP.indexOf(baseDemonB.tribe);

	var result = undefined;

	// Make sure we are not fusing the same demon.
	if(baseDemonA.nameEN == baseDemonB.nameEN)
		return undefined;

	if(baseDemonA.tribe == baseDemonB.tribe) {
		// Elemental fusion.
		//alert("Elemental fusion.");
		result = demonByNameJP[elementals[idxA]];
	} else if(baseDemonA.tribe == "精霊" || baseDemonB.tribe == "精霊") {
		// Rank up/down fusion.
		//alert("Rank up/down fusion.");
		var mainDemon = baseDemonB;
		var elementalDemon = baseDemonA;
		var elementalTribe = idxA;
		var mainTribe = idxB;

		if(baseDemonB.tribe == "精霊") {
			mainDemon = baseDemonA;
			elementalDemon = baseDemonB;
			elementalTribe = idxB;
			mainTribe = idxA;
		}

		var mainLevel = mainDemon.level;
		var rank = elementalRanks[mainTribe][elementalRankers.indexOf(
			elementalDemon.nameJP)];

		//var elementalTribe = tribeListJP[elementalTribe];
		var targetTribe = tribeListJP[mainTribe];

		if(rank == "u") {
			var currentLevel = 100;
			var lowest = undefined;

			// Up
			$.each(demonByNameJP, function(name, demon) {
				// Find the lowest level demon in the tribe.
				if(demon.tribe == targetTribe && (lowest === undefined ||
					demon.level < lowest.level)) {
					lowest = demon;
				}

				if(demon.tribe == targetTribe && demon.level < currentLevel &&
					demon.level > mainDemon.level &&
					demon.fusions === undefined) {
						currentLevel = demon.level;
						result = demon;
				}
			});

			// If this is the highest level demon in the tribe, result is the
			// lowest level demon in the tribe.
			if(result === undefined)
				result = lowest;
		} else if(rank == "d") {
			var currentLevel = 0;

			// Down
			$.each(demonByNameJP, function(name, demon) {
				if(demon.tribe == targetTribe && demon.level > currentLevel &&
					demon.level < mainDemon.level &&
					demon.fusions === undefined) {
						currentLevel = demon.level;
						result = demon;
				}
			});

			// If this is the lowest level demon in the tribe, no fusion.
		} else {
			// No fusion!
		}
	} else {
		// Normal fusion.
		//alert("Normal fusion.");
		var resultTribe = "-";

		if(idxA < fusionChart.length && idxB < fusionChart.length)
			resultTribe = fusionChart[idxA][idxB];

		if(resultTribe != "-") {
			// var targetLevel = Math.round((baseDemonA.level + baseDemonB.level) / 2);
			var targetLevel = (baseDemonA.level + baseDemonB.level + 1) >> 1;
			var currentLevel = 100;
			var highest = { "level": 0 };

			$.each(demonByNameJP, function(name, demon) {
				if(demon.tribe == resultTribe && demon.level > highest.level)
					highest = demon;
			});

			$.each(demonByNameJP, function(name, demon) {
				if(demon.tribe == resultTribe && demon.level < currentLevel &&
					targetLevel < demon.level && demon.fusions === undefined) {
						currentLevel = demon.level;
						result = demon;
				}
			});

			if(result == undefined)
				result = highest;
		}
	}

	return result;
}

function compFuse(a, b) {
	// Calculate the fusion.
	var baseResult = calculateFusion(compList[a], compList[b]);

	var result = {
		// Keep track of the fusion history.
		"parents": [compList[a], compList[b]],
		"nameEN": baseResult.nameEN,
		"level": baseResult.level,
		"skills": [ ]
	};

	// Copy the initial skills
	$.each(baseResult.skills, function(skill, obtainLvl) {
		if(obtainLvl <= result.level)
			result.skills.push(skillByNameJP[skill].nameEN);
	});

	// Add the skills to the result.
	$.each(compList[a].skills, function(index, skill) {
		if(result.skills.indexOf(skill) < 0)
			result.skills.push(skill);
	});
	$.each(compList[b].skills, function(index, skill) {
		if(result.skills.indexOf(skill) < 0)
			result.skills.push(skill);
	});

	// Remove the original demons.
	compList.splice(a, 1); if(a < b) b--;
	compList.splice(b, 1);

	// Add the new demon.
	compList.push(result);

	// Select the 8 skills (if we have over 8).
	if(result.skills.length > 8) {
		compSelectSkills(compList.length - 1);
	} else {
		refleshCOMP();
	}
}

function compDismiss(index) {
	compList.splice(index, 1);

	refleshCOMP();
}

function compSelectSkills(index) {
	var skillCount = compList[index].skills.length;
	var html = "";

	$.each(compList[index].skills, function(index, skill) {
		html = "<span><input type=\"checkbox\" name=\"skill\" value=\"" +
			index + "\">" + skill + "<br/></span>" + html;
	});

	$("#compSelectBoxes").html(html);

	$("#compSelectDialog").dialog({
		dialogClass: "no-close",
		closeOnEscape: true,
		resizable: false,
		height: 300,
		modal: true,
		buttons: {
			"Finish Demon": function() {
				var count = 0

				$("#compSelectForm :input").each(function() {
					if($(this).is(":checked"))
						count++;
				});

				if(count > 8) {
					alert("You selected too many skills. Try again.");
				} else {
					$("#compSelectForm :input").each(function() {
						if(!$(this).is(":checked"))
							compList[index].skills.splice($(this).val(), 1);
					});

					refleshCOMP();
		      		$(this).dialog("close");
	      		}
			}
		}
	});
}

function renderHistory(child, depth) {
	if(depth == undefined)
		depth = "";

	if(child["parents"] === undefined || child["parents"].length < 1)
		return "";

	var html = "";

	$.each(child["parents"], function(index, parent) {
		if(html.length)
			html += "<br/>";

		html += depth + parent.nameEN;

		var superParent = renderHistory(parent, "&nbsp;&nbsp" + depth);
		if(superParent.length)
			html += "<br/>" + superParent;
	});

	return html;
}

function compHistory(index) {
	var html = compList[index].nameEN + "<br/>" +
		renderHistory(compList[index], "+-> ");

	$("#compHistory").html(html);

	$("#compHistoryDialog").dialog({
		dialogClass: "no-close",
		closeOnEscape: true,
		resizable: false,
		width: 700,
		height: 380,
		modal: true,
		buttons: {
			"Cancel": function() {
	      		$(this).dialog("close");
			}
		}
	});
}

function compSplit(index) {
	var baseDemon = demonByNameEN[compList[index].nameEN.toLowerCase()];
	var resultIndex = index;
	var limit = parseInt($("#compLevelLimit").val());

	if(isNaN(limit))
		limit = 99;

	if(compList[index]["parents"] && compList[index]["parents"].length) {
		var child = compList.splice(index, 1)[0];

		$.each(child["parents"], function(index, parent) {
			compList.push(parent);
		});

		refleshCOMP();
	} else if(baseDemon.fusions && baseDemon.fusions.length) {
		compList.splice(index, 1);

		$.each(baseDemon.fusions[0], function(index, component) {
			var componentData = demonByNameJP[component];
			var skills = [ ];

			$.each(componentData.skills, function(skill, obtainLvl) {
				if(obtainLvl <= 0)
					skills.push(skillByNameJP[skill].nameEN);
			});

			compList.push({
				"nameEN": componentData.nameEN,
				"level": componentData.level,
				"skills": skills
			});
		});

		refleshCOMP();
	} else {
		var results = [ ];

		$.each(reverseChart[baseDemon.tribe], function(index, combo) {
			var components = [ ];

			$.each(demonByNameEN, function(nameEN, data) {
				if(data.level <= limit) {
					if(data.tribe == combo[0] || data.tribe == combo[1])
						components.push(data);
				}
			});

			results = results.concat(computeReverseFusions(baseDemon.nameEN,
				components, resultIndex));
		});

		$.each(demonByNameEN, function(nameEN, data) {
			var components = [ ];

			if(data.level <= limit) {
				if(data.tribe == "精霊" || data.tribe == baseDemon.tribe)
					components.push(data);
			}

			results = results.concat(computeReverseFusions(baseDemon.nameEN,
				components, resultIndex));
		});

		var html = "";

		$.each(results, function(index, code) {
			if(html.length)
				html += "<br/>" + code;
			else
				html += code;
		});

		$("#compSplitList").html(html);

		$("#compSplitDialog").dialog({
			dialogClass: "no-close",
			closeOnEscape: true,
			resizable: false,
			width: 700,
			height: 380,
			modal: true,
			buttons: {
				"Cancel": function() {
		      		$(this).dialog("close");
				}
			}
		});
	}
}

function compMutate(index) {
	// Mutate data.
	var mutateData = demonByNameEN[compList[
		index].nameEN.toLowerCase()].mutate;
	var target = mutateData.target;
	var targetLevel = mutateData.level;

	// Calculate the fusion.
	var baseResult = demonByNameJP[target];

	// If the demon is too low of a level, fix that first.
	if(compList[index].level < targetLevel) {
		var baseDemon = demonByNameEN[compList[
			index].nameEN.toLowerCase()];
		var baseLevel = compList[index].level;

		$.each(baseDemon.skills, function(skill, obtainLvl) {
			if(obtainLvl > baseLevel && obtainLvl <= targetLevel) {
				compList[index].skills.push(
					skillByNameJP[skill].nameEN);
			}
		});

		compList[index].level = targetLevel;
	}

	// Create the result demon.
	var result = {
		// Keep track of the fusion history.
		"parents": [compList[index]],
		"nameEN": baseResult.nameEN,
		"level": baseResult.level,
		"skills": [ ]
	};

	// Copy the initial skills
	$.each(baseResult.skills, function(skill, obtainLvl) {
		if(obtainLvl <= result.level)
			result.skills.push(skillByNameJP[skill].nameEN);
	});

	// Add the skills to the result.
	$.each(compList[index].skills, function(index, skill) {
		if(result.skills.indexOf(skill) < 0)
			result.skills.push(skill);
	});

	// Replace the original demon with the mutated one.
	compList[index] = result;

	// Select the 8 skills (if we have over 8).
	if(result.skills.length > 8) {
		compSelectSkills(index);
	} else {
		refleshCOMP();
	}
}

function compLevel(index) {
	$("#compLevelDialog").dialog({
		dialogClass: "no-close",
		closeOnEscape: true,
		resizable: false,
		height: 200,
		modal: true,
		buttons: {
			"Update Level": function() {
				var baseLevel = compList[index].level;
				var targetLevel = parseInt($("#compLevelInput").val());

				if(targetLevel < baseLevel || targetLevel > 99 ||
					isNaN(targetLevel)) {
						alert("Demon level must be between " +
							baseLevel + "and 99.");
				} else {
					var baseDemon = demonByNameEN[compList[
						index].nameEN.toLowerCase()];

					$.each(baseDemon.skills, function(skill, obtainLvl) {
						if(obtainLvl > baseLevel && obtainLvl <= targetLevel) {
							compList[index].skills.push(
								skillByNameJP[skill].nameEN);
						}
					});

					compList[index].level = targetLevel;

					$(this).dialog("close");

					if(compList[index].skills.length > 8) {
						compSelectSkills(index);
					} else {
						refleshCOMP();
					}
				}
	    	},
			"Cancel": function() {
	      		$(this).dialog("close");
			}
		}
	});

	$("#compLevelInput").val(compList[index].level);
}