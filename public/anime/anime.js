anime({
    targets: 'div.box',
    translateY: -50,
    direction: 'alternate',
    loop: true,
    delay: function(el, i, l) {
      return i * 80;
    },
    endDelay: function(el, i, l) {
      return (l - i) * 80;
    }
  });



