/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiView = __webpack_require__(1);
	const HanoiGame = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class HanoiView {
	  constructor(game, $el) {
	    this.game = game;
	    this.el = $el;
	    this.setupTowers();
	    this.bindEvents();
	  }

	  bindEvents() {
	    let that = this;
	    $('body').on('click', 'ul', function(e) {
	      e.preventDefault();
	      if(that.fromSelected()) {
	        let fromTower = $($('.select-from')[0]).data('tower-num');
	        let toTower = $(this).data('tower-num');
	        $('.select-from').removeClass('select-from');

	        if(that.game.move(fromTower, toTower)) {
	          that.setupTowers();
	        } else {
	          alert('Invalid move!');
	        }
	      } else {
	        $(this).addClass('select-from');
	      }
	    })
	  }

	  fromSelected() {
	    return $('.select-from').length > 0;
	  }

	  setupTowers() {
	    this.el.html('');
	    for (let i = 0; i < this.game.towers.length; i++) {
	      let ul = $('<ul>').addClass(`tower-${i}`).data('tower-num', i);
	      for (let j = 2; j >= 0 ; j-- ){
	        ul.append($('<li>').addClass(`level-${j}`));
	      }
	      this.el.append(ul);
	    }
	    this.render();
	  }

	  render() {
	    let towers = this.game.towers
	    for (let i = 0 ; i < towers.length; i ++) {
	      for (let j = 0; j < towers[i].length; j++) {
	        let tower = $(this.el.find(`.tower-${i}`)[0]);
	        if (tower) {
	          tower.find(`.level-${j}`).addClass(`disc-${towers[i][j]}`);
	        }
	      }
	    }
	  }
	}

	module.exports = HanoiView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class HanoiGame {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	}

	module.exports = HanoiGame;


/***/ }
/******/ ]);