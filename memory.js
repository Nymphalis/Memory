const memoryGame = {
    tileCount : 20,
    tileOnRow : 5, 
    divBoard : null,
    divScore : null, 
    tiles : [], 
    tilesChecked : [], 
    moveCount : 0, 
    tilesImg : [ 
        'image/1.png',
        'image/2.png',
        'image/3.png',
        'image/4.png',
        'image/5.png',
        'image/6.png',
        'image/7.png',
        'image/8.png',
        'image/9.png',
        'image/10.png'
    ],
    canGet : true, 
    tilePairs : 0, 

    tileClick : function(e) {
        if (this.canGet) {
            
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesChecked.push(e.target);
                e.target.style.backgroundImage = 'url(' + this.tilesImg[e.target.dataset.cardType] + ')';
            }

            if (this.tilesChecked.length === 2) {
                this.canGet = false;

                if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 500);
                } else {
                    setTimeout(this.resetTiles.bind(this), 500);
                }

                this.moveCount++;
                this.divScore.innerHTML = this.moveCount;
            }
        }
    },

    deleteTiles : function() {
        this.tilesChecked[0].remove();
        this.tilesChecked[1].remove();

        this.canGet = true;
        this.tilesChecked = [];

        this.tilePairs++;
        if (this.tilePairs >= this.tileCount / 2) {
            alert('Win');
        }
    },

    resetTiles : function() {
        this.tilesChecked[0].style.backgroundImage = 'url(image/title.png)';
        this.tilesChecked[1].style.backgroundImage = 'url(image/title.png)';

        this.tilesChecked = [];
        this.canGet = true;
    },

    startGame : function() {
       
        this.divBoard = document.querySelector('.gboard');
        this.divBoard.innerHTML = '';

        this.divScore = document.querySelector('.gscore');
        this.divScore.innerHTML = '';

       
        this.tiles = [];
        this.tilesChecked = [];
        this.moveCount = 0;
        this.canGet = true;
        this.tilePairs = 0;

       
        for (let i=0; i<this.tileCount; i++) {
            this.tiles.push(Math.floor(i/2));
        }

        
        for (let i=this.tileCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        for (let i=0; i<this.tileCount; i++) {
            const tile = document.createElement('div');
            tile.classList.add("gtile");
            this.divBoard.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.style.left = 5 + (tile.offsetWidth+10) * (i%this.tileOnRow) + 'px'
            tile.style.top = 5 + (tile.offsetHeight+10) * (Math.floor(i/this.tileOnRow)) + 'px';

            tile.addEventListener('click', this.tileClick.bind(this));
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.gstart').addEventListener('click', function() {
        memoryGame.startGame();
    });



});