const icon = document.querySelector(".icon");
icon.onmousedown = function(event) {

    let shiftX = event.clientX - icon.getBoundingClientRect().left;
    let shiftY = event.clientY - icon.getBoundingClientRect().top;
  
    icon.style.position = 'absolute';
    icon.style.zIndex = 1000;
    document.body.append(icon);
  
    moveAt(event.pageX, event.pageY);
  
    // 초기 이동을 고려한 좌표 (pageX, pageY)에서
    // 공을 이동합니다.
    function moveAt(pageX, pageY) {
      icon.style.left = pageX - shiftX + 'px';
      icon.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // mousemove로 공을 움직입니다.
    document.addEventListener('mousemove', onMouseMove);
  
    // 공을 드롭하고, 불필요한 핸들러를 제거합니다.
    icon.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      icon.onmouseup = null;
    };
  
  };
  
  icon.ondragstart = function() {
    return false;
  };