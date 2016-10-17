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
