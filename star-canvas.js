function Controller($scope) {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      levelCount = 25,
      sectionCount = 8,
      sideLength = 50,
      eighthPi = Math.PI / sectionCount,
      x = sideLength * Math.cos(3 * eighthPi),
      y = sideLength * Math.sin(3 * eighthPi),
      isChanging = false,
      red,
      green,
      blue,
      color,
      rDelta,
      gDelta,
      bDelta,
      color1,
      color2;

  $scope.sections = [];

  $scope.addSection = function () {
    $scope.sections.unshift({
      colors: [],
      addColor: addColor
    });

    $scope.sections[0].addColor();
    $scope.sections[0].addColor();
  };

  function addColor() {
    this.colors.unshift({
      value: '#ffffff',
      change: function () {
        isChanging = true;
      }
    });
  }

  function draw() {
    if (!$scope.sections.length)
      return;

    color1 = {
      r: parseInt($scope.sections[0].colors[0].value.slice(1, 3), 16),
      g: parseInt($scope.sections[0].colors[0].value.slice(3, 5), 16),
      b: parseInt($scope.sections[0].colors[0].value.slice(5, 7), 16)
    },
    color2 = {
      r: parseInt($scope.sections[0].colors[1].value.slice(1, 3), 16),
      g: parseInt($scope.sections[0].colors[1].value.slice(3, 5), 16),
      b: parseInt($scope.sections[0].colors[1].value.slice(5, 7), 16)
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.translate(canvas.width / 2, canvas.height / 2);

    rDelta = ((color1.r - color2.r) / 10),
    gDelta = ((color1.g - color2.g) / 10),
    bDelta = ((color1.b - color2.b) / 10);

    for (var level = 0; level <= levelCount; level++) {
      red = parseInt(color1.r - level * rDelta);
      green = parseInt(color1.g - level * gDelta);
      blue = parseInt(color1.b - level * bDelta);
      color = 'rgb(' + red + ',' + green + ',' + blue + ')';

      for (var section = 1; section <= sectionCount; section++) {
        for (var column = -level; column <= level; column+=2) {
          // Save current rotation and translation.
          context.save();
          
          // Position diamond.
          context.rotate(section * 2 * eighthPi);
          context.translate(column * x, level * y);
          
          // Draw single diamond.
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(x, y);
          context.lineTo(0, 2 * y);
          context.lineTo(-x, y);
          context.closePath();

          // Outline and color diamond.
          context.strokeStyle = color;
          context.stroke();
          context.fillStyle = color;
          context.fill();

          // Restore previous rotation and translation.
          context.restore();
        }
      }
    }
  }

  // Using animation loop to passiving respond to change.
  // Using draw() as the onChange function calls draw too frequently and transition isn't as smooth.
  (function animationloop() {
    window.requestAnimationFrame(animationloop);

    if (isChanging) {
      draw();
      isChanging = false;
    }
  })();
}