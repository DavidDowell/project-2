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

anime({
  targets: '.register',
  translateY: 0,
  scale: 1,
  rotate: '1turn',
  loop: true,
  easing: 'linear',
  delay: 4000,
  endDelay: 1000
});

