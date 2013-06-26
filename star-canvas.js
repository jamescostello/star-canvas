function StarCanvasCtrl($scope) {
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
      value: '#ffffff'
    });
  }
}


(function () {
  var colorPicker1 = document.getElementById('color-picker-1'),
      colorPicker2 = document.getElementById('color-picker-2');

  var color1,
      color2;

  colorPicker1.onchange = function () {
    color1 = {
      r: parseInt(colorPicker1.value.slice(1, 3), 16),
      g: parseInt(colorPicker1.value.slice(3, 5), 16),
      b: parseInt(colorPicker1.value.slice(5, 7), 16)
    };
  };

  colorPicker2.onchange = function () {
    color2 = {
      r: parseInt(colorPicker2.value.slice(1, 3), 16),
      g: parseInt(colorPicker2.value.slice(3, 5), 16),
      b: parseInt(colorPicker2.value.slice(5, 7), 16)
    };
  };

  colorPicker1.onchange();
  colorPicker2.onchange();



  function ColorSection() {
    
  }



  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      levelCount = 25,
      sectionCount = 8,
      sideLength = 50,
      eighthPi = Math.PI / sectionCount,
      x = sideLength * Math.cos(3 * eighthPi),
      y = sideLength * Math.sin(3 * eighthPi),
      red,
      green,
      blue,
      color,
      rDelta,
      gDelta,
      bDelta;

  function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.translate(canvas.width / 2, canvas.height / 2);

    rDelta = ((color2.r - color1.r) / 10),
    gDelta = ((color2.g - color1.g) / 10),
    bDelta = ((color2.b - color1.b) / 10);

    for (var level = 0; level <= levelCount; level++) {
      red = parseInt(color2.r - level * rDelta);
      green = parseInt(color2.g - level * gDelta);
      blue = parseInt(color2.b - level * bDelta);
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

  (function animationloop(){
    //window.requestAnimationFrame(animationloop);
    draw();
  })();
})