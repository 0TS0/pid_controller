class Follower {
    get _originX() {
        return this.rect.width * this.origin.x;
    }

    get _originY() {
        return this.rect.height * this.origin.y;
    }

    get rect() {
        return this.target.getBoundingClientRect();
    }

    constructor(options) {
        this.target = options.target;
        this.origin = {
            x: options?.origin?.x ?? 0,
            y: options?.origin?.y ?? 0,
        };
        this.x = this.target.offsetLeft;
        this.y = this.target.offsetTop;
        
        this.xController = new Controller({...options.k});
        this.yController = new Controller({...options.k});

        this.time = 0;
    }

    to(x, y) {
        this.xController.setTarget(x - this._originX);
        this.yController.setTarget(y - this._originY);
    }

    follow() {
        if(this.requestAnimationId == null) {
            this.requestAnimationId = requestAnimationFrame(this._update.bind(this));
        }
    }

    unfollow() {
        if(this.requestAnimationId) {
            cancelAnimationFrame(this.requestAnimationId);
            this.requestAnimationId = null;
        }
    }

    _update(time) {
        const dt = this._getDt(time);    
        this._updatePosition(dt);
        this._setPosition();    
        this.requestAnimationId = requestAnimationFrame(this._update.bind(this));
    }
    
    _updatePosition(dt) {
        this.x += this.xController.update(this.x, dt);
        this.y += this.yController.update(this.y, dt);
    }

    _getDt(time) {
        if(this.time == null) {
            this.time = time;
        }
        const dt = (time - this.time) / 1000;
    
        this.time = time;
        return dt;
    }
    
    _setPosition() {
        this.target.style['transform'] = `translate(${this.x}px, ${this.y}px)`;
    }
}