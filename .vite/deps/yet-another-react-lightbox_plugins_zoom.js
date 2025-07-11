import {
  CLASS_FLEX_CENTER,
  CLASS_FULLSIZE,
  CLASS_SLIDE_WRAPPER,
  CLASS_SLIDE_WRAPPER_INTERACTIVE,
  EVENT_ON_KEY_DOWN,
  EVENT_ON_WHEEL,
  IconButton,
  ImageSlide,
  PLUGIN_ZOOM,
  UNKNOWN_ACTION_TYPE,
  addToolbarButton,
  cleanup,
  clsx,
  createIcon,
  createModule,
  cssClass,
  devicePixelRatio,
  isImageFitCover,
  isImageSlide,
  makeUseContext,
  round,
  useController,
  useDocumentContext,
  useEventCallback,
  useLayoutEffect,
  useLightboxProps,
  useLightboxState,
  useMotionPreference,
  usePointerEvents
} from "./chunk-DZIM3AB3.js";
import "./chunk-UYZMRQBA.js";
import {
  require_react
} from "./chunk-YW5IJWHK.js";
import {
  __toESM
} from "./chunk-OL46QLBJ.js";

// node_modules/yet-another-react-lightbox/dist/plugins/zoom/index.js
var React = __toESM(require_react());
var defaultZoomProps = {
  maxZoomPixelRatio: 1,
  zoomInMultiplier: 2,
  doubleTapDelay: 300,
  doubleClickDelay: 500,
  doubleClickMaxStops: 2,
  keyboardMoveDistance: 50,
  wheelZoomDistanceFactor: 100,
  pinchZoomDistanceFactor: 100,
  scrollToZoom: false
};
var resolveZoomProps = (zoom) => ({
  ...defaultZoomProps,
  ...zoom
});
function useZoomAnimation(zoom, offsetX, offsetY, zoomWrapperRef) {
  const zoomAnimation = React.useRef();
  const zoomAnimationStart = React.useRef();
  const { zoom: zoomAnimationDuration } = useLightboxProps().animation;
  const reduceMotion = useMotionPreference();
  const playZoomAnimation = useEventCallback(() => {
    var _a, _b, _c;
    (_a = zoomAnimation.current) === null || _a === void 0 ? void 0 : _a.cancel();
    zoomAnimation.current = void 0;
    if (zoomAnimationStart.current && (zoomWrapperRef === null || zoomWrapperRef === void 0 ? void 0 : zoomWrapperRef.current)) {
      try {
        zoomAnimation.current = (_c = (_b = zoomWrapperRef.current).animate) === null || _c === void 0 ? void 0 : _c.call(_b, [
          { transform: zoomAnimationStart.current },
          { transform: `scale(${zoom}) translateX(${offsetX}px) translateY(${offsetY}px)` }
        ], {
          duration: !reduceMotion ? zoomAnimationDuration !== null && zoomAnimationDuration !== void 0 ? zoomAnimationDuration : 500 : 0,
          easing: zoomAnimation.current ? "ease-out" : "ease-in-out"
        });
      } catch (err) {
        console.error(err);
      }
      zoomAnimationStart.current = void 0;
      if (zoomAnimation.current) {
        zoomAnimation.current.onfinish = () => {
          zoomAnimation.current = void 0;
        };
      }
    }
  });
  useLayoutEffect(playZoomAnimation, [zoom, offsetX, offsetY, playZoomAnimation]);
  return React.useCallback(() => {
    zoomAnimationStart.current = (zoomWrapperRef === null || zoomWrapperRef === void 0 ? void 0 : zoomWrapperRef.current) ? window.getComputedStyle(zoomWrapperRef.current).transform : void 0;
  }, [zoomWrapperRef]);
}
function useZoomCallback(zoom, disabled) {
  const { on } = useLightboxProps();
  const onZoomCallback = useEventCallback(() => {
    var _a;
    if (!disabled) {
      (_a = on.zoom) === null || _a === void 0 ? void 0 : _a.call(on, { zoom });
    }
  });
  React.useEffect(onZoomCallback, [zoom, onZoomCallback]);
}
function useZoomProps() {
  const { zoom } = useLightboxProps();
  return resolveZoomProps(zoom);
}
function useZoomImageRect(slideRect, imageDimensions) {
  var _a, _b;
  let imageRect = { width: 0, height: 0 };
  let maxImageRect = { width: 0, height: 0 };
  const { currentSlide } = useLightboxState();
  const { imageFit } = useLightboxProps().carousel;
  const { maxZoomPixelRatio } = useZoomProps();
  if (slideRect && currentSlide) {
    const slide = { ...currentSlide, ...imageDimensions };
    if (isImageSlide(slide)) {
      const cover = isImageFitCover(slide, imageFit);
      const width = Math.max(...(((_a = slide.srcSet) === null || _a === void 0 ? void 0 : _a.map((x) => x.width)) || []).concat(slide.width ? [slide.width] : []));
      const height = Math.max(...(((_b = slide.srcSet) === null || _b === void 0 ? void 0 : _b.map((x) => x.height)) || []).concat(slide.height ? [slide.height] : []));
      if (width > 0 && height > 0 && slideRect.width > 0 && slideRect.height > 0) {
        maxImageRect = cover ? {
          width: Math.round(Math.min(width, slideRect.width / slideRect.height * height)),
          height: Math.round(Math.min(height, slideRect.height / slideRect.width * width))
        } : { width, height };
        maxImageRect = {
          width: maxImageRect.width * maxZoomPixelRatio,
          height: maxImageRect.height * maxZoomPixelRatio
        };
        imageRect = cover ? {
          width: Math.min(slideRect.width, maxImageRect.width, width),
          height: Math.min(slideRect.height, maxImageRect.height, height)
        } : {
          width: Math.round(Math.min(slideRect.width, slideRect.height / height * width, width)),
          height: Math.round(Math.min(slideRect.height, slideRect.width / width * height, height))
        };
      }
    }
  }
  const maxZoom = imageRect.width ? Math.max(round(maxImageRect.width / imageRect.width, 5), 1) : 1;
  return { imageRect, maxZoom };
}
function distance(pointerA, pointerB) {
  return ((pointerA.clientX - pointerB.clientX) ** 2 + (pointerA.clientY - pointerB.clientY) ** 2) ** 0.5;
}
function scaleZoom(value, delta, factor = 100, clamp = 2) {
  return value * Math.min(1 + Math.abs(delta / factor), clamp) ** Math.sign(delta);
}
function useZoomSensors(zoom, maxZoom, disabled, changeZoom, changeOffsets, zoomWrapperRef) {
  const activePointers = React.useRef([]);
  const lastPointerDown = React.useRef(0);
  const pinchZoomDistance = React.useRef();
  const { globalIndex } = useLightboxState();
  const { getOwnerWindow } = useDocumentContext();
  const { containerRef, subscribeSensors } = useController();
  const { keyboardMoveDistance, zoomInMultiplier, wheelZoomDistanceFactor, scrollToZoom, doubleTapDelay, doubleClickDelay, doubleClickMaxStops, pinchZoomDistanceFactor } = useZoomProps();
  const translateCoordinates = React.useCallback((event) => {
    if (containerRef.current) {
      const { pageX, pageY } = event;
      const { scrollX, scrollY } = getOwnerWindow();
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      return [pageX - left - scrollX - width / 2, pageY - top - scrollY - height / 2];
    }
    return [];
  }, [containerRef, getOwnerWindow]);
  const onKeyDown = useEventCallback((event) => {
    const preventDefault = () => {
      event.preventDefault();
      event.stopPropagation();
    };
    if (zoom > 1) {
      const move = (deltaX, deltaY) => {
        preventDefault();
        changeOffsets(deltaX, deltaY);
      };
      if (event.key === "ArrowDown") {
        move(0, keyboardMoveDistance);
      } else if (event.key === "ArrowUp") {
        move(0, -keyboardMoveDistance);
      } else if (event.key === "ArrowLeft") {
        move(-keyboardMoveDistance, 0);
      } else if (event.key === "ArrowRight") {
        move(keyboardMoveDistance, 0);
      }
    }
    const handleChangeZoom = (zoomValue) => {
      preventDefault();
      changeZoom(zoomValue);
    };
    const hasMeta = () => event.getModifierState("Meta");
    if (event.key === "+" || event.key === "=" && hasMeta()) {
      handleChangeZoom(zoom * zoomInMultiplier);
    } else if (event.key === "-" || event.key === "_" && hasMeta()) {
      handleChangeZoom(zoom / zoomInMultiplier);
    } else if (event.key === "0" && hasMeta()) {
      handleChangeZoom(1);
    }
  });
  const onWheel = useEventCallback((event) => {
    if (event.ctrlKey || scrollToZoom) {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.stopPropagation();
        changeZoom(scaleZoom(zoom, -event.deltaY, wheelZoomDistanceFactor), true, ...translateCoordinates(event));
        return;
      }
    }
    if (zoom > 1) {
      event.stopPropagation();
      if (!scrollToZoom) {
        changeOffsets(event.deltaX, event.deltaY);
      }
    }
  });
  const clearPointer = React.useCallback((event) => {
    const pointers = activePointers.current;
    pointers.splice(0, pointers.length, ...pointers.filter((p) => p.pointerId !== event.pointerId));
  }, []);
  const replacePointer = React.useCallback((event) => {
    clearPointer(event);
    event.persist();
    activePointers.current.push(event);
  }, [clearPointer]);
  const onPointerDown = useEventCallback((event) => {
    var _a;
    const pointers = activePointers.current;
    if (event.pointerType === "mouse" && event.buttons > 1 || !((_a = zoomWrapperRef === null || zoomWrapperRef === void 0 ? void 0 : zoomWrapperRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
      return;
    }
    if (zoom > 1) {
      event.stopPropagation();
    }
    const { timeStamp } = event;
    if (pointers.length === 0 && timeStamp - lastPointerDown.current < (event.pointerType === "touch" ? doubleTapDelay : doubleClickDelay)) {
      lastPointerDown.current = 0;
      changeZoom(zoom !== maxZoom ? zoom * Math.max(maxZoom ** (1 / doubleClickMaxStops), zoomInMultiplier) : 1, false, ...translateCoordinates(event));
    } else {
      lastPointerDown.current = timeStamp;
    }
    replacePointer(event);
    if (pointers.length === 2) {
      pinchZoomDistance.current = distance(pointers[0], pointers[1]);
    }
  });
  const onPointerMove = useEventCallback((event) => {
    const pointers = activePointers.current;
    const activePointer = pointers.find((p) => p.pointerId === event.pointerId);
    if (pointers.length === 2 && pinchZoomDistance.current) {
      event.stopPropagation();
      replacePointer(event);
      const currentDistance = distance(pointers[0], pointers[1]);
      const delta = currentDistance - pinchZoomDistance.current;
      if (Math.abs(delta) > 0) {
        changeZoom(scaleZoom(zoom, delta, pinchZoomDistanceFactor), true, ...pointers.map((x) => translateCoordinates(x)).reduce((acc, coordinate) => coordinate.map((x, i) => acc[i] + x / 2)));
        pinchZoomDistance.current = currentDistance;
      }
      return;
    }
    if (zoom > 1) {
      event.stopPropagation();
      if (activePointer) {
        if (pointers.length === 1) {
          changeOffsets((activePointer.clientX - event.clientX) / zoom, (activePointer.clientY - event.clientY) / zoom);
        }
        replacePointer(event);
      }
    }
  });
  const onPointerUp = React.useCallback((event) => {
    const pointers = activePointers.current;
    if (pointers.length === 2 && pointers.find((p) => p.pointerId === event.pointerId)) {
      pinchZoomDistance.current = void 0;
    }
    clearPointer(event);
  }, [clearPointer]);
  const cleanupSensors = React.useCallback(() => {
    const pointers = activePointers.current;
    pointers.splice(0, pointers.length);
    lastPointerDown.current = 0;
    pinchZoomDistance.current = void 0;
  }, []);
  usePointerEvents(subscribeSensors, onPointerDown, onPointerMove, onPointerUp, disabled);
  React.useEffect(cleanupSensors, [globalIndex, cleanupSensors]);
  React.useEffect(() => {
    if (!disabled) {
      return cleanup(cleanupSensors, subscribeSensors(EVENT_ON_KEY_DOWN, onKeyDown), subscribeSensors(EVENT_ON_WHEEL, onWheel));
    }
    return () => {
    };
  }, [disabled, subscribeSensors, cleanupSensors, onKeyDown, onWheel]);
}
function useZoomState(imageRect, maxZoom, zoomWrapperRef) {
  const [zoom, setZoom] = React.useState(1);
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);
  const animate = useZoomAnimation(zoom, offsetX, offsetY, zoomWrapperRef);
  const { currentSlide, globalIndex } = useLightboxState();
  const { containerRect, slideRect } = useController();
  const { zoomInMultiplier } = useZoomProps();
  const currentSource = currentSlide && isImageSlide(currentSlide) ? currentSlide.src : void 0;
  const disabled = !currentSource || !(zoomWrapperRef === null || zoomWrapperRef === void 0 ? void 0 : zoomWrapperRef.current);
  useLayoutEffect(() => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  }, [globalIndex, currentSource]);
  const changeOffsets = React.useCallback((dx, dy, targetZoom) => {
    const newZoom = targetZoom || zoom;
    const newOffsetX = offsetX - (dx || 0);
    const newOffsetY = offsetY - (dy || 0);
    const maxOffsetX = (imageRect.width * newZoom - slideRect.width) / 2 / newZoom;
    const maxOffsetY = (imageRect.height * newZoom - slideRect.height) / 2 / newZoom;
    setOffsetX(Math.min(Math.abs(newOffsetX), Math.max(maxOffsetX, 0)) * Math.sign(newOffsetX));
    setOffsetY(Math.min(Math.abs(newOffsetY), Math.max(maxOffsetY, 0)) * Math.sign(newOffsetY));
  }, [zoom, offsetX, offsetY, slideRect, imageRect.width, imageRect.height]);
  const changeZoom = React.useCallback((targetZoom, rapid, dx, dy) => {
    const newZoom = round(Math.min(Math.max(targetZoom + 1e-3 < maxZoom ? targetZoom : maxZoom, 1), maxZoom), 5);
    if (newZoom === zoom)
      return;
    if (!rapid) {
      animate();
    }
    changeOffsets(dx ? dx * (1 / zoom - 1 / newZoom) : 0, dy ? dy * (1 / zoom - 1 / newZoom) : 0, newZoom);
    setZoom(newZoom);
  }, [zoom, maxZoom, changeOffsets, animate]);
  const handleControllerRectChange = useEventCallback(() => {
    if (zoom > 1) {
      if (zoom > maxZoom) {
        changeZoom(maxZoom, true);
      }
      changeOffsets();
    }
  });
  useLayoutEffect(handleControllerRectChange, [containerRect.width, containerRect.height, handleControllerRectChange]);
  const zoomIn = React.useCallback(() => changeZoom(zoom * zoomInMultiplier), [zoom, zoomInMultiplier, changeZoom]);
  const zoomOut = React.useCallback(() => changeZoom(zoom / zoomInMultiplier), [zoom, zoomInMultiplier, changeZoom]);
  return { zoom, offsetX, offsetY, disabled, changeOffsets, changeZoom, zoomIn, zoomOut };
}
var ZoomControllerContext = React.createContext(null);
var useZoom = makeUseContext("useZoom", "ZoomControllerContext", ZoomControllerContext);
function ZoomContextProvider({ children }) {
  const [zoomWrapper, setZoomWrapper] = React.useState();
  const { slideRect } = useController();
  const { imageRect, maxZoom } = useZoomImageRect(slideRect, zoomWrapper === null || zoomWrapper === void 0 ? void 0 : zoomWrapper.imageDimensions);
  const { zoom, offsetX, offsetY, disabled, changeZoom, changeOffsets, zoomIn, zoomOut } = useZoomState(imageRect, maxZoom, zoomWrapper === null || zoomWrapper === void 0 ? void 0 : zoomWrapper.zoomWrapperRef);
  useZoomCallback(zoom, disabled);
  useZoomSensors(zoom, maxZoom, disabled, changeZoom, changeOffsets, zoomWrapper === null || zoomWrapper === void 0 ? void 0 : zoomWrapper.zoomWrapperRef);
  const zoomRef = React.useMemo(() => ({ zoom, maxZoom, offsetX, offsetY, disabled, zoomIn, zoomOut, changeZoom }), [zoom, maxZoom, offsetX, offsetY, disabled, zoomIn, zoomOut, changeZoom]);
  React.useImperativeHandle(useZoomProps().ref, () => zoomRef, [zoomRef]);
  const context = React.useMemo(() => ({ ...zoomRef, setZoomWrapper }), [zoomRef, setZoomWrapper]);
  return React.createElement(ZoomControllerContext.Provider, { value: context }, children);
}
var ZoomInIcon = createIcon("ZoomIn", React.createElement(
  React.Fragment,
  null,
  React.createElement("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
  React.createElement("path", { d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" })
));
var ZoomOutIcon = createIcon("ZoomOut", React.createElement("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" }));
var ZoomButton = React.forwardRef(function ZoomButton2({ zoomIn, onLoseFocus }, ref) {
  const wasEnabled = React.useRef(false);
  const wasFocused = React.useRef(false);
  const { zoom, maxZoom, zoomIn: zoomInCallback, zoomOut: zoomOutCallback, disabled: zoomDisabled } = useZoom();
  const { render } = useLightboxProps();
  const disabled = zoomDisabled || (zoomIn ? zoom >= maxZoom : zoom <= 1);
  React.useEffect(() => {
    if (disabled && wasEnabled.current && wasFocused.current) {
      onLoseFocus();
    }
    if (!disabled) {
      wasEnabled.current = true;
    }
  }, [disabled, onLoseFocus]);
  return React.createElement(IconButton, { ref, disabled, label: zoomIn ? "Zoom in" : "Zoom out", icon: zoomIn ? ZoomInIcon : ZoomOutIcon, renderIcon: zoomIn ? render.iconZoomIn : render.iconZoomOut, onClick: zoomIn ? zoomInCallback : zoomOutCallback, onFocus: () => {
    wasFocused.current = true;
  }, onBlur: () => {
    wasFocused.current = false;
  } });
});
function ZoomButtonsGroup() {
  const zoomInRef = React.useRef(null);
  const zoomOutRef = React.useRef(null);
  const { focus } = useController();
  const focusSibling = React.useCallback((sibling) => {
    var _a, _b;
    if (!((_a = sibling.current) === null || _a === void 0 ? void 0 : _a.disabled)) {
      (_b = sibling.current) === null || _b === void 0 ? void 0 : _b.focus();
    } else {
      focus();
    }
  }, [focus]);
  const focusZoomIn = React.useCallback(() => focusSibling(zoomInRef), [focusSibling]);
  const focusZoomOut = React.useCallback(() => focusSibling(zoomOutRef), [focusSibling]);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(ZoomButton, { zoomIn: true, ref: zoomInRef, onLoseFocus: focusZoomOut }),
    React.createElement(ZoomButton, { ref: zoomOutRef, onLoseFocus: focusZoomIn })
  );
}
function ZoomToolbarControl() {
  const { render } = useLightboxProps();
  const zoomRef = useZoom();
  if (render.buttonZoom) {
    return React.createElement(React.Fragment, null, render.buttonZoom(zoomRef));
  }
  return React.createElement(ZoomButtonsGroup, null);
}
function isResponsiveImageSlide(slide) {
  var _a;
  return (((_a = slide.srcSet) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0;
}
function reducer({ current, preload }, { type, source }) {
  switch (type) {
    case "fetch":
      if (!current) {
        return { current: source };
      }
      return { current, preload: source };
    case "done":
      if (source === preload) {
        return { current: source };
      }
      return { current, preload };
    default:
      throw new Error(UNKNOWN_ACTION_TYPE);
  }
}
function ResponsiveImage(props) {
  var _a, _b;
  const [{ current, preload }, dispatch] = React.useReducer(reducer, {});
  const { slide: image, rect, imageFit, render, interactive } = props;
  const srcSet = image.srcSet.sort((a, b) => a.width - b.width);
  const width = (_a = image.width) !== null && _a !== void 0 ? _a : srcSet[srcSet.length - 1].width;
  const height = (_b = image.height) !== null && _b !== void 0 ? _b : srcSet[srcSet.length - 1].height;
  const cover = isImageFitCover(image, imageFit);
  const maxWidth = Math.max(...srcSet.map((x) => x.width));
  const targetWidth = Math.min((cover ? Math.max : Math.min)(rect.width, width * (rect.height / height)), maxWidth);
  const pixelDensity = devicePixelRatio();
  const handleResize = useEventCallback(() => {
    var _a2;
    const targetSource = (_a2 = srcSet.find((x) => x.width >= targetWidth * pixelDensity)) !== null && _a2 !== void 0 ? _a2 : srcSet[srcSet.length - 1];
    if (!current || srcSet.findIndex((x) => x.src === current) < srcSet.findIndex((x) => x === targetSource)) {
      dispatch({ type: "fetch", source: targetSource.src });
    }
  });
  useLayoutEffect(handleResize, [rect.width, rect.height, pixelDensity, handleResize]);
  const handlePreload = useEventCallback((currentPreload) => dispatch({ type: "done", source: currentPreload }));
  const style = {
    WebkitTransform: !interactive ? "translateZ(0)" : "initial"
  };
  if (!cover) {
    Object.assign(style, rect.width / rect.height < width / height ? { width: "100%", height: "auto" } : { width: "auto", height: "100%" });
  }
  return React.createElement(
    React.Fragment,
    null,
    preload && preload !== current && React.createElement(ImageSlide, { key: "preload", ...props, slide: { ...image, src: preload, srcSet: void 0 }, style: { position: "absolute", visibility: "hidden", ...style }, onLoad: () => handlePreload(preload), render: {
      ...render,
      iconLoading: () => null,
      iconError: () => null
    } }),
    current && React.createElement(ImageSlide, { key: "current", ...props, slide: { ...image, src: current, srcSet: void 0 }, style })
  );
}
function ZoomWrapper({ render, slide, offset, rect }) {
  var _a;
  const [imageDimensions, setImageDimensions] = React.useState();
  const zoomWrapperRef = React.useRef(null);
  const { zoom, maxZoom, offsetX, offsetY, setZoomWrapper } = useZoom();
  const interactive = zoom > 1;
  const { carousel, on } = useLightboxProps();
  const { currentIndex } = useLightboxState();
  useLayoutEffect(() => {
    if (offset === 0) {
      setZoomWrapper({ zoomWrapperRef, imageDimensions });
      return () => setZoomWrapper(void 0);
    }
    return () => {
    };
  }, [offset, imageDimensions, setZoomWrapper]);
  let rendered = (_a = render.slide) === null || _a === void 0 ? void 0 : _a.call(render, { slide, offset, rect, zoom, maxZoom });
  if (!rendered && isImageSlide(slide)) {
    const slideProps = {
      slide,
      offset,
      rect,
      render,
      imageFit: carousel.imageFit,
      imageProps: carousel.imageProps,
      onClick: offset === 0 ? () => {
        var _a2;
        return (_a2 = on.click) === null || _a2 === void 0 ? void 0 : _a2.call(on, { index: currentIndex });
      } : void 0
    };
    rendered = isResponsiveImageSlide(slide) ? React.createElement(ResponsiveImage, { ...slideProps, slide, interactive, rect: offset === 0 ? { width: rect.width * zoom, height: rect.height * zoom } : rect }) : React.createElement(ImageSlide, { onLoad: (img) => setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight }), ...slideProps });
  }
  if (!rendered)
    return null;
  return React.createElement("div", { ref: zoomWrapperRef, className: clsx(cssClass(CLASS_FULLSIZE), cssClass(CLASS_FLEX_CENTER), cssClass(CLASS_SLIDE_WRAPPER), interactive && cssClass(CLASS_SLIDE_WRAPPER_INTERACTIVE)), style: offset === 0 ? { transform: `scale(${zoom}) translateX(${offsetX}px) translateY(${offsetY}px)` } : void 0 }, rendered);
}
var Zoom = ({ augment, addModule }) => {
  augment(({ zoom: zoomProps, toolbar, render, controller, ...restProps }) => {
    const zoom = resolveZoomProps(zoomProps);
    return {
      zoom,
      toolbar: addToolbarButton(toolbar, PLUGIN_ZOOM, React.createElement(ZoomToolbarControl, null)),
      render: {
        ...render,
        slide: (props) => {
          var _a;
          return isImageSlide(props.slide) ? React.createElement(ZoomWrapper, { render, ...props }) : (_a = render.slide) === null || _a === void 0 ? void 0 : _a.call(render, props);
        }
      },
      controller: { ...controller, preventDefaultWheelY: zoom.scrollToZoom },
      ...restProps
    };
  });
  addModule(createModule(PLUGIN_ZOOM, ZoomContextProvider));
};
export {
  Zoom as default
};
//# sourceMappingURL=yet-another-react-lightbox_plugins_zoom.js.map
