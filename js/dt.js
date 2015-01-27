CONST = {
	MAPWIDTH : 10,
	MAPHEIGHT : 20,
	COLOR : ['transparent', 'red', 'blue', 'green', 'yellow', 'purple', 'white']

}

Data = {
	initialization : function(screens){
		for (var h = 0; h < screens; ++h)     //handles
		{
			for (var i = 0; i < CONST.MAPHEIGHT; ++i)
				for (var j = 0; j < CONST.MAPWIDTH; ++j)
				{
					this.map[h][i][j] = 0;
				}

		}
	},
	
	newGame : function(){
		//clear map
		for (var i = 0; i < this.gameTotal; ++i)
		{
			this.setNew(i);
		}
	},

	setNew : function(handle){
		for (var i = 0; i < CONST.MAPHEIGHT; ++i)
			for (var j = 0; j < CONST.MAPWIDTH; ++j)
			{
				this.map[handle][i][j] = 0;
			};
		this.score[handle] = 0;
	}
}

Input = {
	total : 0,
	buttonNames : [],
	buttonPressed : [],
	initialization : function()
	{
	},
	register : function(name){
		++this.total;
		this.buttonNames[this.total] = name;
	},
	update : function(){
		for (var i = 1; i <= this.total; ++i)
		{
			this.buttonPressed[i] = 0;
			$(this.buttonNames[i]).click(function(){
				this.buttonPressed[i] = 1;
			});
		};
	},
}

Graphics = {
	currentIndex : '',
	initialization : function(handle)
	{
		this.currentIndex = '#area' + handle;
		this.setNextWindow(handle);
		this.setGameWindow(handle);
		this.setScoreBoard(handle);
	},
	
	update : function(handle)
	{
		this.updateNextWindow(handle);
		this.updateGameWindow(handle);
		this.updateScoreBoard(handle);
	},
	
	setNextWindow : function(handle)
	{
		$(this.currentIndex).append('<div class=\'NextWindow\'' + handle + 'class=\'NextWindow\'></div>');
		// set style
	},
	setGameWindow : function(handle)
	{
		$(this.currentIndex).append('<div id=\'GameWindow\'' + handle + 'class=\'GameWindow\'></div>');
		// set style
		
	},
	setScoreBoard : function(handle)
	{
		$(this.currentIndex).append('<div id=\'ScoreBoard\'' + handle + 'class=\'ScoreBoard\'></div>');
		// set style
		
	},
	
	updateNextWindow : function(handle)
	{
		$(this.currentIndex + ".ScoreBoard).empty();
		$(this.currentIndex).append(Graphics.getTilePre(Data.getNextTile(handle)));
	},
	updateGameWindow : function(handle)
	{
		$(this.currentIndex).empty();
		for (var i = 0; i < CONST.MAPHEIGHT; ++i)
			for (var j = 0; j < CONST.MAPWIDTH; ++j)
			{
				this.drawblock(handle, i, j);
			}
		this.drawActiveBlock(handle);
	},
	updateScoreBoard : function(handle)
	{
		$(this.
	},
}
DTetris = {
	frame : 0,	
	initialization : function()
	{

	},
	gameStart : function()
	{
		Data.newGame();
		Graphics.newGame();
		setInterval(DTetris.loop, 50); 
	},

	loop : function() //main loop
	{
		++this.frame;
		this.update();
		if (!Data.Gameover)
			this.timer = setTimeout("DTetris.loop()", 50);
		else
			//game over
			gameOver;
	},

	update : function()
	{
		Input.update();
		if (Input.exist)
		{
			if (Input.left)
				data.left();
			if (Input.right)
				data.right();
			if (Input.rotate)
				data.rotate();
		};
		if (this.nextCount == data.speed)
		{
			this.nextCount = 0;
			this.fall();
		};
		Graphics.update();
	},

	fall : function()
	{
		for (var i = 0; i < data.gameTotal; ++i)
		{
			if (this.blocked(i))
				this.setBlock(i);
			else
				--data.activeBlock[i].y;
		}
	},

	blocked : function(handle)
	{
		var shape = data.activeBlock[handle].shape;
		var x = data.activeBlock[handle].x;
		var y = data.activeBlock[handle].y;
		for (var i = 0; i < 4; ++i)
			for (var j = 0; j < 4; ++j)
			{
				if (shape[i][j] && this.map[handle][x - 1 - i][y - 1 + j])
					return 1;
				if (shape[i][j] && (j === 0))
					return 1;
			}
		return 0;
	},

	setBlock : function(handle)
	{
		var shape = data.activeBlock[handle].shape;
		var x = data.activeBlock[handle].x;
		var y = data.activeBlock[handle].y;


	gameOver : function()
	{
	}
		
}

$(document).ready(function(){
	Data.initialization();
	Input.initialization();
	Graphics.initialization();
	DTetris.initialization();

	$('gamestart').click(DTetris.gameStart());


});

