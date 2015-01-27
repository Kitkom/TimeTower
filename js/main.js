Data = {
	blockSize : 40,
	levels : 7,
	level : []

}

Graphics = {
	update : function()
	{
		$("#character").css("left", "" + ((Game.character.position + 2) * 40) + "px");
		$("img#red").css("transform", "rotate(" + (Game.time[1] * 45) + "deg)");
		$("img#blue").css("transform", "rotate(" + (Game.time[2] * 45) + "deg)");
		for (i = 0; i < Cache.cursorTotal; ++i)
		{
			k = Cache.cursorType[i];
			t = Game.time[k];
			d = 45 * (Cache.cursorDefault[i] + t);
			$("#cursor" + i).css("transform", "rotate(" + d + "deg)");
		}
		for (i = 0; i < Cache.blockTotal; ++i)
		{
			k = Cache.blockType[i];
			t = Game.time[k];
			d = 45 * (Cache.blockDefault[i] + t);
			$("#block" + i).css("transform", "rotate(" + d + "deg)");
		}
	}
}

Cache = {
	cursorDefault : [],
	cursorPosition : [],
	cursorType : [],
	blockDefault : [],
	blockPosition : [],
	blockType : [],
	load : function(levelIndex)
	{
		loader = Data.level[levelIndex];
		Cache.cursorTotal = loader.cursorTotal;
		Cache.blockTotal = loader.blockTotal;
		for (i = 0; i < Cache.cursorTotal; ++i)
		{
			Cache.cursorDefault[i] = loader.cursorDefault[i];
			Cache.cursorPosition[i] = loader.cursorPosition[i];
			Cache.cursorType[i] = loader.cursorType[i];
		}
		for (i = 0; i < Cache.blockTotal; ++i)
		{
			Cache.blockDefault[i] = loader.blockDefault[i];
			Cache.blockPosition[i] = loader.blockPosition[i];
			Cache.blockType[i] = loader.blockType[i];
		}
	},
	killed : function(position)
	{
		for (i = 0; i < Cache.cursorTotal; ++i)
		{
			k = Cache.cursorType[i];
			t = Game.time[k];
			d = (Cache.cursorDefault[i] + t);
			while (d > 9)
				d -= 8;
			while (d < 2)
				d += 8;
			if ((Cache.cursorPosition[i] > 0) && (d >= 3) && (d <= 5))
			{
				t = Cache.cursorPosition[i] + 4 - d;
				if (position == t)
					return 1;
				if (position == t + 1)
					return 1;

			}
			if ((Cache.cursorPosition[i] < 0) && (d >= 7) && (d <= 9))
			{
				t = - Cache.cursorPosition[i] + d - 8;
				if (position == t)
					return 1;

			}
		}
		return 0;
	},

	blocked : function(position)
	{
		p = 0;
		for (i = 0; i < Cache.blockTotal; ++i)
		{
			k = Cache.blockType[i];
			t = Game.time[k];
			d = (Cache.blockDefault[i] + t);
			while (d > 9)
				d -= 8;
			while (d < 2)
				d += 8;
			if ((Cache.blockPosition[i] > 0) && (d >= 3) && (d <= 5))
			{
				t = Cache.blockPosition[i] + 4 - d;
				if (position - p == t)
					p += 1;
				if (position - p == t + 1)
					p += 2;
			}
			if ((Cache.blockPosition[i] < 0) && (d >= 7) && (d <= 9))
			{
				t = - Cache.blockPosition[i] + d - 8;
				if (position - p == t)
					p += 1;
			}
		}
		for (i = 0; i < Cache.blockTotal; ++i)
		{
			k = Cache.blockType[i];
			t = Game.time[k];
			d = (Cache.blockDefault[i] + t);
			while (d > 9)
				d -= 8;
			while (d < 2)
				d += 8;
			if ((Cache.blockPosition[i] > 0) && (d >= 3) && (d <= 5))
			{
				t = Cache.blockPosition[i] + 4 - d;
				if (position - p == t)
					p += 1;
				if (position - p == t + 1)
					p += 2;
			}
			if ((Cache.blockPosition[i] < 0) && (d >= 7) && (d <= 9))
			{
				t = - Cache.blockPosition[i] + d - 8;
				if (position - p == t)
					p += 1;
			}
		}
		for (i = 0; i < Cache.blockTotal; ++i)
		{
			k = Cache.blockType[i];
			t = Game.time[k];
			d = (Cache.blockDefault[i] + t);
			while (d > 9)
				d -= 8;
			while (d < 2)
				d += 8;
			if ((Cache.blockPosition[i] > 0) && (d >= 3) && (d <= 5))
			{
				t = Cache.blockPosition[i] + 4 - d;
				if (position - p == t)
					p += 1;
				if (position - p == t + 1)
					p += 2;
			}
			if ((Cache.blockPosition[i] < 0) && (d >= 7) && (d <= 9))
			{
				t = - Cache.blockPosition[i] + d - 8;
				if (position - p == t)
					p += 1;
			}
		}
		console.log(p);
		return p;
	}
			
			
}


Game = {
	playing : 0,
	time : [],
	character : {
		position : []
	},
	rotation : 0,
	moveForward : function(k)
	{
		//common
		Game.character.position += Game.playing;
		Game.time[0] += 1;
		Game.time[k] += 1;
		Game.character.position -= Cache.blocked(Game.character.position);
		if (Cache.killed(Game.character.position) == 1)
		{
			Game.fail();
		}
		if (Game.character.position == 15)
		{
			Game.success();
		}
		Graphics.update();
	},
	moveLeft : function()
	{
		Game.playsound("mred");
		Game.moveForward(1);
	},

	moveRight : function()
	{
		Game.playsound("mblue");
		Game.moveForward(2);
	},
	reset : function()
	{
		Game.playsound("reset");
		Game.playing = 1;
		$("#character").css("opacity", "1");
		$("#character").css("transform", "scale(1.0)");
		$("#levelscene").css("top", "-450px");
		$("#gamearea").css("top", "0");
		$("#titlescene").css("top", "-450px");		
		Cache.load(Game.currentlevel);
		for (i = 0; i < Cache.cursorTotal; ++i)
		{
			$("#cursor" + i).css("opacity", "1");
			if (Cache.cursorPosition[i] > 0)
			{
				$("#cursor" + i).css("left", "" + (40 * (Cache.cursorPosition[i] + 1)) + "px");
				$("#cursor" + i).css("bottom", "" + 160 + "px");
			}
			else
			{
				$("#cursor" + i).css("left", "" + (40 * (- Cache.cursorPosition[i] + 1)) + "px");
				$("#cursor" + i).css("bottom", "" + 40 + "px");
			}
			$("#cursor" + i + " img").attr("src", "./res/images/cursor" + Cache.cursorType[i] + ".png");
		}
		for (i = Cache.cursorTotal; i < 10; ++i)
		{
			$("#cursor" + i).css("opacity", "0");
		}
		for (i = 0; i < Cache.blockTotal; ++i)
		{
			$("#block" + i).css("opacity", "1");
			if (Cache.blockPosition[i] > 0)
			{
				$("#block" + i).css("left", "" + (40 * (Cache.blockPosition[i] + 1)) + "px");
				$("#block" + i).css("bottom", "" + 160 + "px");
			}
			else
			{
				$("#block" + i).css("left", "" + (40 * (- Cache.blockPosition[i] + 1)) + "px");
				$("#block" + i).css("bottom", "" + 40 + "px");
			}
			$("#block" + i + " img").attr("src", "./res/images/block" + Cache.blockType[i] + ".png");
		}
		for (i = Cache.blockTotal; i < 10; ++i)
		{
			$("#block" + i).css("opacity", "0");
		}
		Game.character.position = 0;
		Game.time[1] = 0;
		Game.time[2] = 0;
		Game.time[0] = 0;
		Graphics.update();
	},
	success : function()
	{
		$("#character").css("opacity", "0");
		setTimeout(Game.selectLevel, 500);
	},
	death : function()
	{
		if (Game.playing == 1)
		{
			Game.playsound("dead");
		}
		Game.playing = 0;
		$("#character").css("transform", "scale(3.0)");
		$("#character").css("opacity", "0");
	},
	fail : function()
	{
		setTimeout(Game.death, 200);
	},
	selectLevel : function()
	{
		$("#character").css("left", "" + (3 * 40) + "px");
		$("#levelscene").css("top", "0");
		$("#gamearea").css("top", "-450px");
		$("#titlescene").css("top", "-450px");		
	},
	startLevel1 : function()
	{
		Game.currentlevel = 1;
		Game.reset();
	},
	startLevel2 : function()
	{
		Game.currentlevel = 2;
		Game.reset();
	},
	startLevel3 : function()
	{
		Game.currentlevel = 3;
		Game.reset();
	},
	startLevel4 : function()
	{
		Game.currentlevel = 4;
		Game.reset();
	},
	startLevel5 : function()
	{
		Game.currentlevel = 5;
		Game.reset();
	},
	startLevel6 : function()
	{
		Game.currentlevel = 6;
		Game.reset();
	},
	startLevel7 : function()
	{
		Game.currentlevel = 7;
		Game.reset();
	},
	startLevel8 : function()
	{
		Game.currentlevel = 8;
		Game.reset();
	},
	playsound : function(name)
	{
		var node=document.getElementById(name);  
		if(node!=null)  
		{  
			node.Stop();
 	    	node.Play();  
	  	}  
	}
}

$(document).ready(function(){
	$("#buttonLeft").click(Game.moveLeft);
	$("#buttonRight").click(Game.moveRight);
	$("#gameStart").click(Game.selectLevel);
	$("#level1").click(Game.startLevel1);
	$("#level2").click(Game.startLevel2);
	$("#level3").click(Game.startLevel3);
	$("#level4").click(Game.startLevel4);
	$("#level5").click(Game.startLevel5);
	$("#level6").click(Game.startLevel6);
	$("#level7").click(Game.startLevel7);
	$("#level8").click(Game.startLevel8);
	$("img#reset").click(Game.reset);
	$("img#back").click(Game.selectLevel);
	Data.level[1] = {
		cursorTotal : 2,
		cursorDefault : [0, 4],
		cursorPosition : [-6, 8],
		cursorType : [1, 2],
		blockTotal : 0,
		blockDefault : [0],
 		blockPosition : [-3],
		blockType : [1]
	}
	Data.level[2] = {
		cursorTotal : 6,
		cursorDefault : [7, 3, 4, 6, 3, 3],
		cursorPosition : [4, -7, 10, -4, 7, -10],
		cursorType : [1, 1, 1, 2, 2, 2],
		blockTotal : 0,
		blockDefault : [0],
 		blockPosition : [-3],
		blockType : [1]
	}
	Data.level[3] = {
		cursorTotal : 1,
		cursorDefault : [1, 2, 4, 6, 8, 2, 4, 6, 8],
		cursorPosition : [8, -7, -7, -7, -7, -9, -9, -9, -9],
		cursorType : [0, 1, 1, 1, 1, 2, 2, 2, 2],
		blockTotal : 1,
		blockDefault : [0],
 		blockPosition : [-3],
		blockType : [1]
	}
	Data.level[5] = {
		cursorTotal : 1,
		cursorDefault : [5, 8, 10, 2, 8, 8, 6, 6],
		cursorPosition : [-7, -7, -9, -11, 6, 8, 10, 12],
		cursorType : [0, 0, 2, 0, 1, 2, 1, 2],
		blockTotal : 4,
		blockDefault : [0, 2, 4, 6, 8, 10],
 		blockPosition : [6, 8, 7, 9, 11, 13],
		blockType : [1, 1, 2, 2, 1, 1]
	}
	t = 1;
	Data.level[6] = {
		cursorTotal : 7,
		cursorDefault : [t, t + 1, t + 2, t + 3, t + 4, t - 1, t - 2, -2, 2],
		cursorPosition : [-9, -9, -9, -9, -9, -9, -9, 9, 9],
		cursorType : [0, 0, 0, 0, 0, 0, 0, 1, 1],
		blockTotal : 5,
		blockDefault : [0, 7, 4, 2, 6],
 		blockPosition : [3, 6, 3, 9, 9],
		blockType : [1, 2, 1, 1, 1]
	}
	Data.level[4] = {
		cursorTotal : 10,
		cursorDefault : [0, 2, 4, -2, -3, 0, 2, 4, -2, -3],
		cursorPosition : [-5, -5, -5, -5, 7, -8, -8, -8, -8, 7],
		cursorType : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
		blockTotal : 0,
		blockDefault : [0, 2, 4, 6, 8, 10],
 		blockPosition : [6, 8, 7, 9, 11, 13],
		blockType : [1, 1, 2, 2, 1, 1]
	}
	Data.level[7] = {
		cursorTotal : 8,
		cursorDefault : [0, 0, 4, 4, 0, 0, 4, 4, 6],
		cursorPosition : [-8, -8, 8, 8, -7, -7, 7, 7, -8],
		cursorType : [1, 2, 1, 2, 1, 2, 1, 2, 2],
		blockTotal : 2,
		blockDefault : [4, 4, 6,8,-2,-2,-2,-2],
 		blockPosition : [3, 3, 8, 10, -4, -6, -8, -10],
		blockType : [1, 2, 1, 1, 1, 2, 1, 2]
	}
})
