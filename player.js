Bullet = function(vel, rectangle)
{
	this.velocity = vel;
	this.rect = rectangle;
	
	this.Update = function()
	{
		this.rect.x += this.velocity.x;
		this.rect.y += this.velocity.y;
	};
	
	this.Draw = function(ctx)
	{
		this.rect.Draw(ctx);
	};
};

Player = function()
{
	this.rect = new Rectangle(0, 0, 40, 48);
	this.rect.color.r = 0;
	this.rect.color.g = 0;
	this.rect.color.b = 0;
	
	this.animation = new Animation(40, 48, 0, 0, 8, "link.png", 6, 8, 4);
	
	this.gravity = 0;
	
	this.moving = false;
	
	this.bullets = new Array();
	this.shotBullet = false;
	this.lookingRight = true;
	this.lookingLeft = false;
	this.lookingUp = false;
	this.lookingDown = false;
	
	this.jumpAvailable = false;
	this.jumping = false;
	this.JUMP_MAX = 2;
	this.jumpVelocity = 0;
	
	this.SetPosition = function(x, y, mod)
	{
		if (mod == null || !mod)
		{
			if (x != null)
				this.rect.x = x;
			if (y != null)
				this.rect.y = y;
		}
		else
		{
			if (x != null)
				this.rect.x += x;
			if (y != null)
				this.rect.y += y;
		}
	};
	
	this.Update = function()
	{
		this.moving = false;
		
		if (input.a)
		{
			this.animation.SetRow(0);
			this.rect.x -= 1;
			this.moving = true;
			this.lookingRight = false;
		}
		if (input.d)
		{
			this.animation.SetRow(1);
			this.rect.x += 1;
			this.moving = true;
			this.lookingRight = true;
		}
		if (input.w)
		{
			this.animation.SetRow(3);
			this.rect.y -= 1;
			this.moving = true;
			this.lookingRight = true;
			
		}
		if (input.s)
		{
			this.animation.SetRow(2);
			this.rect.y += 1;
			this.moving = true;
			this.lookingRight = false;
		}
		if (input.space)
		{
			this.moving = true;
			this.moving = this.Attack();
		}
		if (input.v)
			this.Shoot();
		else
			this.shotBullet = false;
		
		this.UpdateBullets();
			
		if (this.jumping)
		{
			this.rect.y -= this.jumpVelocity;
			this.jumpVelocity -= 0.02;
			
			if (this.jumpVelocity <= 0)
			{
				this.jumping = false;
				this.jumpAvailable = true;
			}
		}
		else
			this.rect.y += this.gravity;
		
		this.animation.position.Set(this.rect.x, this.rect.y);
		
		if (this.moving)
			this.animation.Update();
		else
			this.animation.SetColumn(0);
	};
	/*
	this.Attack = function ///////////////////////////////////////////////////////////// BROKEN
	{
		var oldWidth = 40
		var oldHeight = 48
			
		this.rect.width = 62;
		this.rect.height = 62;
			
		this.animation.width = 62
		this.animation.height = 62
		this.animation.SetRow(4);
		this.animation.rows = 1;
		this.animation.columns = 5;
			
		//this.SetPosition(this.rect.x - (this.rect.width - oldWidth), this.rect.y - (this.rect.height - oldHeight));
		
		setTimeout(function(){ stopAttack() }, 3000);
		
		function stopAttack(){
			this.rect.width = 40;
			this.rect.height = 48;
			
			this.animation.width = 40
			this.animation.height = 48
			this.animation.SetRow(0);
			this.animation.rows = 8;
			this.animation.columns = 4;
			return false;
		}
		return false;
	}
	*/
	this.Shoot = function()
	{
		if (!this.shotBullet)
		{
			var b = new Rectangle(this.rect.x + (this.rect.width / 2) - 4, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
			b.color.g = 0;
			b.color.b = 0;
			
			var vel = new Vector2(0, 0);
			if (this.lookingRight)
				vel.x = 3;
			else
				vel.x = -3;
			
			var bul = new Bullet(vel , b);
			
			this.bullets.push(bul);
			
			this.shotBullet = true;
		}
	};
	
	this.UpdateBullets = function()
	{
		for (var i = 0; i < this.bullets.length; i++)
		{
			this.bullets[i].Update();
			
			var b = this.bullets[i];
			
			var done = false;
			if (b.rect.x + b.rect.width < 0)
				done = true;
			else if (b.rect.x > canvas.width)
				done = true;
			if (b.rect.y + b.rect.height < 0)
				done = true;
			else if (b.rect.y > canvas.height)
				done = true;
			
			if (done)
			{
				this.bullets.RemoveAt(i);
				i--;
			}
		}
	};
	
	this.Jump = function()
	{
		if (this.jumpAvailable)
		{
			this.jumpVelocity = this.JUMP_MAX;
			this.jumping = true;
		}
	};
	
	this.Draw = function(ctx)
	{
		for (var i = 0; i < this.bullets.length; i++)
			this.bullets[i].Draw(ctx);
			
		//this.rect.Draw(ctx);
		this.animation.Draw(ctx);
	};
};