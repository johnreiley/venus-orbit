export class DragHandler {
  _xPrev = 0;
  _xDiff = 0;
  _yPrev = 0;
  _yDiff = 0;
  _dragEl = undefined;
  _dragElContainer = undefined;
  handleX = false;
  handleY = false
  mousedown = false;
  isDragEl = false;

  constructor(dragEl, dragElContainer, settings) {
    this._dragEl = dragEl;
    this._dragElContainer = dragElContainer;
    this.handleX = settings?.handleX;
    this.handleY = settings?.handleY;
    this._addWindowEventListeners();
  }

  /**
   * @param e {TouchEvent}
   */
  updateX( /*Event*/ e) {
    const screenX = e.screenX || e.touches[0].screenX;
    console.log(e.touches[0].screenX);
    consoleToPage(e.touches[0].screenX);
    this._xDiff = screenX - this._xPrev;
    this._xPrev = screenX;
    let value = this._xDiff + this._stripPxValue(this._dragEl.style.left);
    if (value >= 0 && value <= this._dragElContainer.clientWidth - this._dragEl.clientWidth) {
      this._dragEl.style.left = `${value}px`;
    }
  }

  updateY( /*Event*/ e) {
    this._yDiff = e.screenY - this._yPrev;
    this._yPrev = e.screenY;
    let value = this._yDiff + this._stripPxValue(this._dragEl.style.top);
    this._dragEl.style.top = `${value}px`;
  }

  _stripPxValue(value) {
    if (value) {
      return parseInt(value.slice(0, value.length - 2));
    } else {
      return 0;
    }
  }

  _addWindowEventListeners() {
    window.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._mouseDownEvent(e);
      consoleToPage('touchstart');
    }, {passive: false});

    window.addEventListener('touchend', (e) => {
      e.preventDefault();
      this._mouseUpEvent(e);
      console.log('touchend');
    }, {passive: false});

    window.addEventListener('touchmove', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._mouseMoveEvent(e);
      console.log('touchmove');
    }, {passive: false});

    window.addEventListener('mousedown', (e) => {
      this._mouseDownEvent(e);
      console.log('mousedown');
    });

    window.addEventListener('mouseup', (e) => {
      this._mouseUpEvent(e);
      console.log('mouseup');
    });

    window.addEventListener('mousemove', (e) => {
      this._mouseMoveEvent(e);
      console.log('mousemove');
    });
  }

  _mouseDownEvent(e) {
    if (e.target === this._dragEl) {
      this.isDragEl = true;
    }
    this.mousedown = true;
    this._xPrev = e.screenX;
    this._yPrev = e.screenY;
  }

  _mouseUpEvent(e) {
    this.mousedown = false;
    this.isDragEl = false;
  }

  _mouseMoveEvent(e) {
    if (this.mousedown && this.isDragEl) {
      if (this.handleX) {
        this.updateX(e);
      }
      if (this.handleY) {
        this.updateY(e);
      }
    }
  }

}



function consoleToPage(info) {
  document.querySelector('#console').innerHTML += "<br>" + info;
}