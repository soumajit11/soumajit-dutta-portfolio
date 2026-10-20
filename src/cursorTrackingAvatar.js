const TAU = Math.PI * 2;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeAngle = (angle) => {
  const normalized = (angle + Math.PI) % TAU;
  return normalized < 0 ? normalized + TAU - Math.PI : normalized - Math.PI;
};

/** Interpolate two angles along the shortest circular path. */
export function lerpAngle(current, target, amount) {
  const difference = normalizeAngle(target - current);
  return current + difference * clamp(amount, 0, 1);
}

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load avatar frame: ${src}`));
    image.src = src;
  });

export class CursorTrackingAvatar {
  constructor(container, options = {}) {
    this.container = container;
    this.canvas = options.canvas ?? container.querySelector('.portrait-canvas');
    this.fallback = options.fallback ?? container.querySelector('.avatar-fallback');
    this.context = this.canvas?.getContext('2d', { alpha: true });
    this.frameCount = options.frameCount ?? 64;
    this.framePath = options.framePath ?? ((index) => `/frames/frame-${String(index).padStart(3, '0')}.webp`);
    this.centerPath = options.centerPath ?? '/frames/center.webp';
    this.facePoint = options.facePoint ?? { x: 0.5, y: 0.34 };
    this.deadZoneRatio = options.deadZoneRatio ?? 0.12;
    this.smoothing = options.smoothing ?? 0.26;
    this.frameAngleOffset = options.frameAngleOffset ?? 0;
    this.frames = [];
    this.centerFrame = null;
    this.currentFrame = -1;
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.pointer = { x: 0, y: 0, active: false };
    this.rafId = 0;
    this.isReady = false;
    this.destroyed = false;
    this.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    this.finePointer = window.matchMedia?.('(pointer: fine)').matches ?? false;

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.tick = this.tick.bind(this);
  }

  async mount() {
    if (!this.canvas || !this.context) return;
    this.container.dataset.avatarState = 'loading';
    this.resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(this.handleResize);
    this.resizeObserver?.observe(this.container);
    window.addEventListener('resize', this.handleResize, { passive: true });

    try {
      const centerFrame = await loadImage(this.centerPath);
      const directionalFrames = this.reducedMotion
        ? []
        : await Promise.all(
            Array.from({ length: this.frameCount }, (_, index) => loadImage(this.framePath(index)))
          );

      if (this.destroyed) return;
      this.centerFrame = centerFrame;
      this.frames = directionalFrames;
      this.isReady = true;
      this.container.dataset.avatarState = 'ready';
      this.handleResize();
      this.renderFrame(this.centerFrame);
      if (this.fallback) this.fallback.setAttribute('aria-hidden', 'true');

      if (this.finePointer && !this.reducedMotion) {
        window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
      }
    } catch (error) {
      this.container.dataset.avatarState = 'fallback';
      console.warn('Avatar frame loading failed; keeping the static profile fallback.', error);
    }
  }

  handleResize() {
    if (!this.canvas || !this.context) return;
    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));

    if (this.canvas.width !== Math.round(width * dpr) || this.canvas.height !== Math.round(height * dpr)) {
      this.canvas.width = Math.round(width * dpr);
      this.canvas.height = Math.round(height * dpr);
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    if (this.isReady) {
      this.renderFrame(this.currentFrame < 0 ? this.centerFrame : this.frames[this.currentFrame]);
    }
  }

  handlePointerMove(event) {
    this.pointer.x = event.clientX;
    this.pointer.y = event.clientY;
    this.pointer.active = true;
    this.startLoop();
  }

  getDrawMetrics(image) {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;
    return { width, height, drawWidth, drawHeight, offsetX, offsetY };
  }

  getFaceCenter(image) {
    const metrics = this.getDrawMetrics(image);
    return {
      x: metrics.offsetX + metrics.drawWidth * this.facePoint.x,
      y: metrics.offsetY + metrics.drawHeight * this.facePoint.y,
      metrics
    };
  }

  getTargetAngle() {
    const referenceImage = this.centerFrame ?? this.frames[0];
    if (!referenceImage) return this.targetAngle;
    const canvasRect = this.canvas.getBoundingClientRect();
    const face = this.getFaceCenter(referenceImage);
    const faceX = canvasRect.left + face.x;
    const faceY = canvasRect.top + face.y;
    const dx = this.pointer.x - faceX;
    const dy = this.pointer.y - faceY;
    return Math.atan2(dy, dx) + this.frameAngleOffset;
  }

  isInDeadZone() {
    const referenceImage = this.centerFrame ?? this.frames[0];
    if (!referenceImage) return true;
    const canvasRect = this.canvas.getBoundingClientRect();
    const face = this.getFaceCenter(referenceImage);
    const distance = Math.hypot(this.pointer.x - (canvasRect.left + face.x), this.pointer.y - (canvasRect.top + face.y));
    return distance <= canvasRect.width * this.deadZoneRatio;
  }

  selectFrame() {
    if (this.isInDeadZone()) return -1;
    const normalized = (normalizeAngle(this.currentAngle) + Math.PI) / TAU;
    return Math.min(this.frames.length - 1, Math.round(normalized * (this.frames.length - 1)));
  }

  renderFrame(image) {
    if (!image || !this.context) return;
    const metrics = this.getDrawMetrics(image);
    this.context.clearRect(0, 0, metrics.width, metrics.height);
    this.context.drawImage(image, metrics.offsetX, metrics.offsetY, metrics.drawWidth, metrics.drawHeight);
    this.canvas.classList.add('avatar-canvas-visible');
  }

  startLoop() {
    if (!this.rafId && !this.destroyed) this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.rafId = 0;
    if (this.destroyed || !this.isReady) return;

    this.targetAngle = this.getTargetAngle();
    const nextAngle = lerpAngle(this.currentAngle, this.targetAngle, this.smoothing);
    const angleStillMoving = Math.abs(normalizeAngle(nextAngle - this.currentAngle)) > 0.001;
    this.currentAngle = nextAngle;
    const nextFrame = this.pointer.active && !this.reducedMotion ? this.selectFrame() : -1;

    const frameChanged = nextFrame !== this.currentFrame;
    if (frameChanged) {
      this.currentFrame = nextFrame;
      this.renderFrame(nextFrame === -1 ? this.centerFrame : this.frames[nextFrame]);
    }

    if (angleStillMoving || frameChanged) this.startLoop();
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pointermove', this.handlePointerMove);
  }
}
