/*
jQWidgets v4.5.1 (2017-April)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function (a) {
    "use strict";

    function b(b, d) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f, g = b.parentNode,
                h = g.name;
            return !(!b.href || !h || "map" !== g.nodeName.toLowerCase()) && (f = a("img[usemap=#" + h + "]")[0], !!f && c(f))
        }
        return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || d : d) && c(b)
    }

    function c(b) {
        var c = a(b);
        return "none" !== c.css("display") && "hidden" !== c.css("visibility")
    }

    function d(a) {
        var c = a.getAttribute("tabindex"),
            d = null === c;
        return (d || c >= 0) && b(a, !d)
    }
    a.jqx.jqxWidget("jqxWindow", "", {}), a.extend(a.jqx._jqxWindow.prototype, {
        defineInstance: function () {
            var b = {
                height: "auto",
                width: 200,
                minHeight: 50,
                maxHeight: 600,
                minWidth: 50,
                maxWidth: 800,
                showCloseButton: !0,
                disabled: !1,
                autoOpen: !0,
                keyboardCloseKey: "esc",
                title: "",
                content: "",
                draggable: !0,
                resizable: !0,
                animationType: "fade",
                closeAnimationDuration: 250,
                showAnimationDuration: 250,
                isModal: !1,
                position: "center",
                closeButtonSize: 16,
                closeButtonAction: "hide",
                modalOpacity: .3,
                dragArea: null,
                okButton: null,
                cancelButton: null,
                dialogResult: {
                    OK: !1,
                    Cancel: !1,
                    None: !0
                },
                collapsed: !1,
                showCollapseButton: !1,
                collapseAnimationDuration: 150,
                collapseButtonSize: 16,
                rtl: !1,
                keyboardNavigation: !0,
                headerHeight: null,
                _events: ["created", "closed", "moving", "moved", "open", "collapse", "expand", "open", "close", "resize"],
                initContent: null,
                enableResize: !0,
                restricter: null,
                autoFocus: !0,
                closing: null,
                _invalidArgumentExceptions: {
                    invalidHeight: "Invalid height!",
                    invalidWidth: "Invalid width!",
                    invalidMinHeight: "Invalid minHeight!",
                    invalidMaxHeight: "Invalid maxHeight!",
                    invalidMinWidth: "Invalid minWidth!",
                    invalidMaxWidth: "Invalid maxWidth",
                    invalidKeyCode: "Invalid keyCode!",
                    invalidAnimationType: "Invalid animationType!",
                    invalidCloseAnimationDuration: "Invalid closeAnimationDuration!",
                    invalidShowAnimationDuration: "Invalid showAnimationDuration!",
                    invalidPosition: "Invalid position!",
                    invalidCloseButtonSize: "Invalid closeButtonSize!",
                    invalidCollapseButtonSize: "Invalid collapseButtonSize!",
                    invalidCloseButtonAction: "Invalid cluseButtonAction!",
                    invalidModalOpacity: "Invalid modalOpacity!",
                    invalidDragArea: "Invalid dragArea!",
                    invalidDialogResult: "Invalid dialogResult!",
                    invalidIsModal: "You can have just one modal window!"
                },
                _enableResizeCollapseBackup: null,
                _enableResizeBackup: void 0,
                _heightBeforeCollapse: null,
                _minHeightBeforeCollapse: null,
                _mouseDown: !1,
                _isDragging: !1,
                _rightContentWrapper: null,
                _leftContentWrapper: null,
                _headerContentWrapper: null,
                _closeButton: null,
                _collapseButton: null,
                _title: null,
                _content: null,
                _mousePosition: {},
                _windowPosition: {},
                _modalBackground: null,
                _SCROLL_WIDTH: 21,
                _visible: !0,
                modalBackgroundZIndex: 12990,
                modalZIndex: 18e3,
                zIndex: 9001,
                _touchEvents: {
                    mousedown: a.jqx.mobile.getTouchEventName("touchstart"),
                    mouseup: a.jqx.mobile.getTouchEventName("touchend"),
                    mousemove: a.jqx.mobile.getTouchEventName("touchmove"),
                    mouseenter: "mouseenter",
                    mouseleave: "mouseleave",
                    click: a.jqx.mobile.getTouchEventName("touchstart")
                }
            };
            return this === a.jqx._jqxWindow.prototype ? b : (a.extend(!0, this, b), b)
        },
        createInstance: function () {
            this.host.initAnimate && this.host.initAnimate(), this.host.attr("role", "dialog"), this.host.removeAttr("data-bind"), this.host.appendTo(document.body);
            var b = this,
                c = function (a) {
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c];
                        b[d] && b[d].toString().indexOf("px") >= 0 && (b[d] = parseInt(b[d], 10))
                    }
                };
            c(["minWidth", "minHeight", "maxWidth", "maxHeight", "width", "height"]);
            var d = function () {
                var c = parseInt(a(b.restricter).css("padding-top"), 10),
                    d = parseInt(a(b.restricter).css("padding-left"), 10),
                    e = parseInt(a(b.restricter).css("padding-bottom"), 10),
                    f = parseInt(a(b.restricter).css("padding-right"), 10),
                    g = a(b.restricter).coord();
                b.dragArea = {
                    left: d + g.left,
                    top: c + g.top,
                    width: 1 + f + a(b.restricter).width(),
                    height: 1 + e + a(b.restricter).height()
                }
            };
            if (this.restricter && d(), this.restricter && (this.addHandler(a(window), "resize." + this.element.id, function () {
                d()
            }), this.addHandler(a(window), "orientationchanged." + this.element.id, function () {
                d()
            }), this.addHandler(a(window), "orientationchange." + this.element.id, function () {
                d()
            })), this._isTouchDevice = a.jqx.mobile.isTouchDevice(), this._validateProperties(), this._createStructure(), this._refresh(), this.autoOpen || (this.element.style.display = "none"), a.jqx.browser.msie && this.host.addClass(this.toThemeProperty("jqx-noshadow")), this.isModal || this._fixWindowZIndex(), this._setStartupSettings(), this._positionWindow(), this._raiseEvent(0), this.autoOpen) {
                this._performLayout();
                var e = this;
                this.isModal && this._fixWindowZIndex("modal-show"), e.initContent && (e.initContent(), e._contentInitialized = !0), this._raiseEvent(7), this._raiseEvent(9)
            }
        },
        refresh: function () {
            this._performLayout()
        },
        _setStartupSettings: function () {
            this.disabled && this.disable(), this.collapsed && (this.collapsed = !1, this.collapse(0)), this.autoOpen || (this.hide(null, .001, !0), this._visible = !1), null !== this.title && "" !== this.title && this.setTitle(this.title), null !== this.content && "" !== this.content && this.setContent(this.content), this.title = this._headerContentWrapper.html(), this.content = this._content.html()
        },
        _fixWindowZIndex: function (b) {
            var c = a.data(document.body, "jqxwindows-list") || [],
                d = this.zIndex;
            if (this.isModal) {
                c && (c = this._removeFromArray(this.host, c), a.data(document.body, "jqxwindows-list", c));
                var e = a.data(document.body, "jqxwindows-modallist");
                if (e)
                    if ("modal-show" == b) e.push(this.host);
                    else {
                        var f = e.indexOf(this.host);
                        f != -1 && e.splice(f, 1)
                    }
                else if ("modal-show" == b) {
                    var g = [];
                    g.push(this.host), a.data(document.body, "jqxwindows-modallist", g), e = g
                } else a.data(document.body, "jqxwindows-modallist", []), e = [];
                return d = this.modalZIndex, a.each(e, function () {
                    if (this.data() && this.data().jqxWindow) {
                        var a = this.data().jqxWindow.instance;
                        a._modalBackground.style.zIndex = d, a.element.style.zIndex = d + 1, d += 2
                    }
                }), void a.data(document.body, "jqxwindow-modal", this.host)
            }
            if (this._indexOf(this.host, c) < 0 && c.push(this.host), a.data(document.body, "jqxwindows-list", c), c.length > 1) {
                var h = c[c.length - 2];
                if ("auto" == h.css("z-index")) d = this.zIndex + c.length + 1;
                else {
                    var i = this.zIndex;
                    d = parseInt(h.css("z-index"), 10) + 1, d < i && (d = i)
                }
            }
            this.element.style.zIndex = d, this._sortByStyle("z-index", c)
        },
        _validateProperties: function () {
            try {
                if (this._validateSize(), this._validateAnimationProperties(), this._validateInteractionProperties(), this._validateModalProperties(), !this.position) throw new Error(this._invalidArgumentExceptions.invalidPosition);
                if (isNaN(this.closeButtonSize) || parseInt(this.closeButtonSize, 10) < 0) throw new Error(this._invalidArgumentExceptions.invalidCloseButtonSize);
                if (isNaN(this.collapseButtonSize) || parseInt(this.collapseButtonSize, 10) < 0) throw new Error(this._invalidArgumentExceptions.invalidCollapseButtonSize)
            } catch (a) {
                throw new Error(a)
            }
        },
        _validateModalProperties: function () {
            if (this.modalOpacity < 0 || this.modalOpacity > 1) throw new Error(this._invalidArgumentExceptions.invalidModalOpacity);
            if (this.isModal && !this._singleModalCheck()) throw new Error(this._invalidArgumentExceptions.invalidIsModal)
        },
        _validateSize: function () {
            if (this._validateSizeLimits(), "auto" !== this.height && isNaN(parseInt(this.height, 10))) throw new Error(this._invalidArgumentExceptions.invalidHeight);
            if ("auto" !== this.width && isNaN(parseInt(this.width, 10))) throw new Error(this._invalidArgumentExceptions.invalidWidth);
            "auto" !== this.height && this.height < this.minHeight && (this.height = this.minHeight), this.width < this.minWidth && (this.width = this.minWidth), "auto" !== this.height && this.height > this.maxHeight && (this.height = this.maxHeight), this.width > this.maxWidth && (this.width = this.maxWidth), null !== this.dragArea && (this.dragArea && (null !== this.dragArea.height && this.host.height() > this.dragArea.height || parseInt(this.height, 10) > this.dragArea.height) || null !== this.dragArea.width && this.width > this.dragArea.width || this.maxHeight > this.dragArea.height || this.maxWidth > this.dragArea.width)
        },
        _validateSizeLimits: function () {
            if (null == this.maxHeight && (this.maxHeight = 9999), null == this.minWidth && (this.minWidth = 0), null == this.maxWidth && (this.maxWidth = 9999), null == this.minHeight && (this.minHeight = 0), isNaN(parseInt(this.minHeight, 10))) throw new Error(this._invalidArgumentExceptions.invalidMinHeight);
            if (isNaN(parseInt(this.maxHeight, 10))) throw new Error(this._invalidArgumentExceptions.invalidMaxHeight);
            if (isNaN(parseInt(this.minWidth, 10))) throw new Error(this._invalidArgumentExceptions.invalidMinWidth);
            if (isNaN(parseInt(this.maxWidth, 10))) throw new Error(this._invalidArgumentExceptions.invalidMaxWidth);
            if (this.minHeight && this.maxHeight && parseInt(this.minHeight, 10) > parseInt(this.maxHeight, 10) && this.maxHeight != Number.MAX_VALUE) throw new Error(this._invalidArgumentExceptions.invalidMinHeight);
            if (this.minWidth && this.maxWidth && parseInt(this.minWidth, 10) > parseInt(this.maxWidth, 10) && this.maxWidth != Number.MAX_VALUE) throw new Error(this._invalidArgumentExceptions.invalidMinWidth)
        },
        _validateAnimationProperties: function () {
            if ("fade" !== this.animationType && "slide" !== this.animationType && "combined" !== this.animationType && "none" !== this.animationType) throw new Error(this._invalidArgumentExceptions.invalidAnimationType);
            if (isNaN(parseInt(this.closeAnimationDuration, 10)) || this.closeAnimationDuration < 0) throw new Error(this._invalidArgumentExceptions.invalidCloseAnimationDuration);
            if (isNaN(parseInt(this.showAnimationDuration, 10)) || this.showAnimationDuration < 0) throw new Error(this._invalidArgumentExceptions.invalidShowAnimationDuration)
        },
        _validateInteractionProperties: function () {
            if (parseInt(this.keyCode, 10) < 0 || parseInt(this.keyCode, 10) > 130 && "esc" !== this.keyCode) throw new Error(this._invalidArgumentExceptions.invalidKeyCode);
            if (null !== this.dragArea && ("undefined" == typeof this.dragArea.width || "undefined" == typeof this.dragArea.height || "undefined" == typeof this.dragArea.left || "undefined" == typeof this.dragArea.top)) throw new Error(this._invalidArgumentExceptions.invalidDragArea);
            if (!this.dialogResult || !this.dialogResult.OK && !this.dialogResult.Cancel && !this.dialogResult.None) throw new Error(this._invalidArgumentExceptions.invalidDialogResult);
            if ("hide" !== this.closeButtonAction && "close" !== this.closeButtonAction) throw new Error(this._invalidArgumentExceptions.invalidCloseButtonAction)
        },
        _singleModalCheck: function () {
            for (var b = a.data(document.body, "jqxwindows-list") || [], c = b.length; c; )
                if (c -= 1, a(b[c].attr("id")).length > 0 && a(b[c].attr("id")).jqxWindow("isModal")) return !1;
            return !0
        },
        _createStructure: function () {
            var b = this.host.children();
            if (1 === b.length) this._content = b[0], this._header = document.createElement("div"), this._header.innerHTML = this.host.attr("caption"), this.element.insertBefore(this._header, this._content), this.host.attr("caption", ""), this._header = a(this._header), this._content = a(this._content);
            else {
                if (2 !== b.length) throw new Error("Invalid structure!");
                this._header = a(b[0]), this._content = a(b[1])
            }
        },
        _refresh: function () {
            this._render(), this._addStyles(), this._performLayout(), this._removeEventHandlers(), this._addEventHandlers(), this._initializeResize()
        },
        _render: function () {
            this._addHeaderWrapper(), this._addCloseButton(), this._addCollapseButton(), this._removeModal(), this._makeModal()
        },
        _addHeaderWrapper: function () {
            this._headerContentWrapper || (this._header[0].innerHTML = '<div style="float:left;">' + this._header[0].innerHTML + "</div>", this._headerContentWrapper = a(this._header.children()[0]), null !== this.headerHeight && this._header.height(this.headerHeight))
        },
        _addCloseButton: function () {
            this._closeButton || (this._closeButtonWrapper = document.createElement("div"), this._closeButtonWrapper.className = this.toThemeProperty("jqx-window-close-button-background"), this._closeButton = document.createElement("div"), this._closeButton.className = this.toThemeProperty("jqx-window-close-button jqx-icon-close"), this._closeButton.style.width = "100%", this._closeButton.style.height = "100%", this._closeButtonWrapper.appendChild(this._closeButton), this._header[0].appendChild(this._closeButtonWrapper), this._closeButtonWrapper = a(this._closeButtonWrapper), this._closeButton = a(this._closeButton))
        },
        _addCollapseButton: function () {
            this._collapseButton || (this._collapseButtonWrapper = document.createElement("div"), this._collapseButtonWrapper.className = this.toThemeProperty("jqx-window-collapse-button-background"), this._collapseButton = document.createElement("div"), this._collapseButton.className = this.toThemeProperty("jqx-window-collapse-button jqx-icon-arrow-up"), this._collapseButton.style.width = "100%", this._collapseButton.style.height = "100%", this._collapseButtonWrapper.appendChild(this._collapseButton), this._header[0].appendChild(this._collapseButtonWrapper), this._collapseButtonWrapper = a(this._collapseButtonWrapper), this._collapseButton = a(this._collapseButton))
        },
        _removeModal: function () {
            this.isModal || "object" != typeof this._modalBackground || null === this._modalBackground || (a("." + this.toThemeProperty("jqx-window-modal")).remove(), this._modalBackground = null)
        },
        focus: function () {
            try {
                this.host.focus();
                var a = this;
                setTimeout(function () {
                    a.host.focus()
                }, 10)
            } catch (a) { }
        },
        _makeModal: function () {
            if (this.isModal && !this._modalBackground) {
                var b = a.data(document.body, "jqxwindows-list");
                b && (this._removeFromArray(this.host, b), a.data(document.body, "jqxwindows-list", b)), this._modalBackground = document.createElement("div"), this._modalBackground.className = this.toThemeProperty("jqx-window-modal"), this._setModalBackgroundStyles(), document.body.appendChild(this._modalBackground), this.addHandler(this._modalBackground, this._getEvent("click"), function () {
                    return !1
                });
                var c = this,
                    d = function (a, b) {
                        return b.contains(a)
                    };
                this.addHandler(this._modalBackground, "mouseup", function (a) {
                    c._stopResizing(c), a.preventDefault()
                }), this.addHandler(this._modalBackground, "mousedown", function (a) {
                    var b = c._getTabbables();
                    return b.length > 0 && (b[0].focus(1), setTimeout(function () {
                        b[0].focus(1)
                    }, 100)), a.preventDefault(), !1
                }), this.addHandler(a(document), "keydown.window" + this.element.id, function (b) {
                    if (9 === b.keyCode) {
                        var e = a.data(document.body, "jqxwindows-modallist");
                        if (!(e.length > 1 && e[e.length - 1][0] != c.element)) {
                            var f = c._getTabbables(),
                                g = null,
                                h = null;
                            if (0 !== c.element.offsetWidth && 0 !== c.element.offsetHeight && (f.length > 0 && (g = f[0], h = f[f.length - 1]), b.target != c.element && null != g)) return d(b.target, c.element) && (b.target !== h || b.shiftKey) ? b.target === g && b.shiftKey ? (h.focus(1), !1) : void 0 : (g.focus(1), !1)
                        }
                    }
                })
            }
        },
        _addStyles: function () {
            this.host.addClass(this.toThemeProperty("jqx-rc-all")), this.host.addClass(this.toThemeProperty("jqx-window")), this.host.addClass(this.toThemeProperty("jqx-popup")), a.jqx.browser.msie && this.host.addClass(this.toThemeProperty("jqx-noshadow")), this.host.addClass(this.toThemeProperty("jqx-widget")), this.host.addClass(this.toThemeProperty("jqx-widget-content")), this._header.addClass(this.toThemeProperty("jqx-window-header")), this._content.addClass(this.toThemeProperty("jqx-window-content")), this._header.addClass(this.toThemeProperty("jqx-widget-header")), this._content.addClass(this.toThemeProperty("jqx-widget-content")), this._header.addClass(this.toThemeProperty("jqx-disableselect")), this._header.addClass(this.toThemeProperty("jqx-rc-t")), this._content.addClass(this.toThemeProperty("jqx-rc-b")), this.host.attr("tabindex") || (this.element.tabIndex = 0, this._header[0].tabIndex = 0, this._content[0].tabIndex = 0), this.element.setAttribute("hideFocus", "true"), this.element.style.outline = "none"
        },
        _performHeaderLayout: function () {
            this._handleHeaderButtons(), this._header[0].style.position = "relative", this.rtl ? (this._headerContentWrapper[0].style.direction = "rtl", this._headerContentWrapper[0].style.float = "right") : (this._headerContentWrapper[0].style.direction = "ltr", this._headerContentWrapper[0].style.float = "left"), this._performHeaderCloseButtonLayout(), this._performHeaderCollapseButtonLayout(), this._centerElement(this._headerContentWrapper, this._header, "y", "margin"), this.headerHeight && (this._centerElement(this._closeButtonWrapper, this._header, "y", "margin"), this._centerElement(this._collapseButtonWrapper, this._header, "y", "margin"))
        },
        _handleHeaderButtons: function () {
            if (this._closeButtonWrapper) {
                if (this.showCloseButton) {
                    this._closeButtonWrapper[0].style.visibility = "visible";
                    var a = this._toPx(this.closeButtonSize);
                    this._closeButtonWrapper[0].style.width = a, this._closeButtonWrapper[0].style.height = a
                } else this._closeButtonWrapper[0].style.visibility = "hidden";
                if (this.showCollapseButton) {
                    this._collapseButtonWrapper[0].style.visibility = "visible";
                    var b = this._toPx(this.collapseButtonSize);
                    this._collapseButtonWrapper[0].style.width = b, this._collapseButtonWrapper[0].style.height = b
                } else this._collapseButtonWrapper[0].style.visibility = "hidden"
            }
        },
        _performHeaderCloseButtonLayout: function () {
            if (this._closeButtonWrapper) {
                var a = parseInt(this._header.css("padding-right"), 10);
                isNaN(a) || (this._closeButtonWrapper.width(this._closeButton.width()), this.rtl ? (this._closeButtonWrapper[0].style.marginRight = "0px", this._closeButtonWrapper[0].style.marginLeft = this._toPx(a)) : (this._closeButtonWrapper[0].style.marginRight = this._toPx(a), this._closeButtonWrapper[0].style.marginLeft = "0px")), this._closeButtonWrapper[0].style.position = "absolute", this.rtl ? (this._closeButtonWrapper[0].style.right = "", this._closeButtonWrapper[0].style.left = "0px") : (this._closeButtonWrapper[0].style.right = "0px", this._closeButtonWrapper[0].style.left = "")
            }
        },
        _performHeaderCollapseButtonLayout: function () {
            if (this._closeButtonWrapper) {
                var b = parseInt(this._header.css("padding-right"), 10);
                if (!isNaN(b)) {
                    var c = this._toPx(this.collapseButtonSize);
                    this._collapseButtonWrapper[0].style.width = c, this._collapseButtonWrapper[0].style.height = c, this.rtl ? (this._collapseButtonWrapper[0].style.marginRight = "0px", this._collapseButtonWrapper[0].style.marginLeft = this._toPx(b)) : (this._collapseButtonWrapper[0].style.marginRight = this._toPx(b), this._collapseButtonWrapper[0].style.marginLeft = "0px")
                }
                this._collapseButtonWrapper[0].style.position = "absolute";
                var d = this._toPx(this.showCloseButton ? this._closeButton.outerWidth(!0) : 0);
                this.rtl ? (this._collapseButtonWrapper[0].style.right = "", this._collapseButtonWrapper[0].style.left = d) : (this._collapseButtonWrapper[0].style.right = d, this._collapseButtonWrapper[0].style.left = ""), this._centerElement(this._collapseButton, a(this._collapseButton[0].parentElement), "y")
            }
        },
        _performWidgetLayout: function () {
            var a;
            "auto" !== this.width && (this.element.style.width = this._toPx(this.width)), this.collapsed || ("auto" !== this.height ? this.element.style.height = this._toPx(this.height) : this.element.style.height = this.host.height() + "px", this.element.style.minHeight = this._toPx(this.minHeight)), this._setChildrenLayout(), a = this._validateMinSize(), this.element.style.maxHeight = this._toPx(this.maxHeight), this.element.style.minWidth = this._toPx(this.minWidth), this.element.style.maxWidth = this._toPx(this.maxWidth), a || this._setChildrenLayout()
        },
        _setChildrenLayout: function () {
            this._header.width(this.host.width() - (this._header.outerWidth(!0) - this._header.width())), this._content.width(this.host.width() - (this._content.outerWidth(!0) - this._content.width())), this._content.height(this.host.height() - this._header.outerHeight(!0) - (this._content.outerHeight(!0) - this._content.height()))
        },
        _validateMinSize: function () {
            var b = !0;
            this.minHeight < this._header.height() && (this.minHeight = this._header.height(), b = !1);
            var c = a(this._header.children()[0]).outerWidth(),
                d = this._header.children()[1] ? a(this._header.children()[1]).outerWidth() : 0,
                e = c + d;
            return this.minWidth < 100 && (this.minWidth = Math.min(e, 100), b = !1), b
        },
        _centerElement: function (a, b, c, d) {
            "number" == typeof b.left && "number" == typeof b.top && "number" == typeof b.height && "number" == typeof b.width ? this._centerElementInArea(a, b, c) : this._centerElementInParent(a, b, c, d)
        },
        _centerElementInParent: function (a, b, c, d) {
            var e, f, g = "none" === a.css("display");
            if (c = c.toLowerCase(), d ? (e = d + "Top", f = d + "Left") : (e = "top", f = "left"), c.indexOf("y") >= 0) {
                g && (a[0].style.display = "block");
                var h, i = a.outerHeight(!0);
                g && (a[0].style.display = "none"), h = b.height();
                var j = Math.max(0, h - i) / 2;
                a[0].style[e] = j + "px"
            }
            if (c.indexOf("x") >= 0) {
                g && (a[0].style.display = "block");
                var k, l = a.outerWidth(!0);
                g && (a[0].style.display = "none"), k = b.width();
                var m = Math.max(0, k - l) / 2;
                a[0].style[f] = m + "px"
            }
        },
        _centerElementInArea: function (a, b, c) {
            if (c = c.toLowerCase(), c.indexOf("y") >= 0) {
                var d = a.outerHeight(!0),
                    e = b.height,
                    f = (e - d) / 2;
                a[0].style.top = f + b.top + "px"
            }
            if (c.indexOf("x") >= 0) {
                var g = a.outerWidth(!0),
                    h = b.width,
                    i = (h - g) / 2;
                a[0].style.left = i + b.left + "px"
            }
        },
        _removeEventHandlers: function () {
            this.removeHandler(this._header, this._getEvent("mousedown")), this.removeHandler(this._header, this._getEvent("mousemove")), this.removeHandler(this._header, "focus"), this.removeHandler(a(document), this._getEvent("mousemove") + "." + this.host.attr("id")), this.removeHandler(a(document), this._getEvent("mouseup") + "." + this.host.attr("id")), this.removeHandler(this.host, "keydown"), this.removeHandler(this._closeButton, this._getEvent("click")), this.removeHandler(this._closeButton, this._getEvent("mouseenter")), this.removeHandler(this._closeButton, this._getEvent("mouseleave")), this.removeHandler(this._collapseButton, this._getEvent("click")), this.removeHandler(this._collapseButton, this._getEvent("mouseenter")), this.removeHandler(this._collapseButton, this._getEvent("mouseleave")), this.removeHandler(this.host, this._getEvent("mousedown")), this.okButton && this.removeHandler(a(this.okButton), this._getEvent("click"), this._setDialogResultHandler), this.cancelButton && this.removeHandler(a(this.cancelButton), this._getEvent("click"), this._setDialogResultHandler), this.removeHandler(this._header, this._getEvent("mouseenter")), this.removeHandler(this._header, this._getEvent("mouseleave")), this.removeHandler(this.host, "resizing", this._windowResizeHandler)
        },
        _removeFromArray: function (a, b) {
            var c = this._indexOf(a, b);
            return c >= 0 ? b.splice(this._indexOf(a, b), 1) : b
        },
        _sortByStyle: function (a, b) {
            for (var c = 0; c < b.length; c++)
                for (var d = b.length - 1; d > c; d--) {
                    var e, f = b[d],
                        g = b[d - 1];
                    parseInt(f.css(a), 10) < parseInt(g.css(a), 10) && (e = f, b[d] = g, b[d - 1] = e)
                }
        },
        _initializeResize: function () {
            if (this.resizable) {
                var a = this;
                this.initResize({
                    target: this.host,
                    alsoResize: a._content,
                    maxWidth: a.maxWidth,
                    minWidth: a.minWidth,
                    maxHeight: a.maxHeight,
                    minHeight: a.minHeight,
                    indicatorSize: 10,
                    resizeParent: a.dragArea
                })
            }
        },
        _removeResize: function () {
            this.removeResize()
        },
        _getEvent: function (a) {
            return this._isTouchDevice ? this._touchEvents[a] : a
        },
        _addEventHandlers: function () {
            this._addDragDropHandlers(), this._addCloseHandlers(), this._addCollapseHandlers(), this._addFocusHandlers(), this._documentResizeHandlers(), this._closeButtonHover(), this._collapseButtonHover(), this._addDialogButtonsHandlers(), this._addHeaderHoverEffect(), this._addResizeHandlers();
            var a = this;
            this.addHandler(this._header, this._getEvent("mousemove"), function () {
                a._addHeaderCursorHandlers(a)
            })
        },
        _addResizeHandlers: function () {
            var a = this;
            a.addHandler(a.host, "resizing", a._windowResizeHandler, {
                self: a
            })
        },
        _windowResizeHandler: function (a) {
            var b = a.data.self;
            b._header.width(b.host.width() - (b._header.outerWidth(!0) - b._header.width())), b.width = a.args.width, b.height = a.args.height
        },
        _addHeaderHoverEffect: function () {
            var b = this;
            this.addHandler(this._header, this._getEvent("mouseenter"), function () {
                a(this).addClass(b.toThemeProperty("jqx-window-header-hover"))
            }), this.addHandler(this._header, this._getEvent("mouseleave"), function () {
                a(this).removeClass(b.toThemeProperty("jqx-window-header-hover"))
            })
        },
        _addDialogButtonsHandlers: function () {
            this.okButton && this.addHandler(a(this.okButton), this._getEvent("click"), this._setDialogResultHandler, {
                self: this,
                result: "ok"
            }), this.cancelButton && this.addHandler(a(this.cancelButton), this._getEvent("click"), this._setDialogResultHandler, {
                self: this,
                result: "cancel"
            })
        },
        _documentResizeHandlers: function () {
            var b = this;
            this.isModal && this.addHandler(a(window), "resize.window" + this.element.id, function () {
                if ("object" == typeof b._modalBackground && null !== b._modalBackground) {
                    if (b.isOpen() && (b._modalBackground.style.display = "none"), b.restricter) b._modalBackground.style.left = b._toPx(b.dragArea.left), b._modalBackground.style.top = b._toPx(b.dragArea.top), b._modalBackground.style.width = b._toPx(b.dragArea.width), b._modalBackground.style.height = b._toPx(b.dragArea.height);
                    else {
                        var a = b._getDocumentSize();
                        b._modalBackground.style.width = a.width + "px", b._modalBackground.style.height = a.height + "px"
                    }
                    b.isOpen() && (b._modalBackground.style.display = "block")
                }
            })
        },
        _setDialogResultHandler: function (a) {
            var b = a.data.self;
            b._setDialogResult(a.data.result), b.closeWindow()
        },
        _setDialogResult: function (a) {
            switch (this.dialogResult.OK = !1, this.dialogResult.None = !1, this.dialogResult.Cancel = !1, a = a.toLowerCase()) {
                case "ok":
                    this.dialogResult.OK = !0;
                    break;
                case "cancel":
                    this.dialogResult.Cancel = !0;
                    break;
                default:
                    this.dialogResult.None = !0
            }
        },
        _getDocumentSize: function () {
            var b = a.jqx.browser.msie && a.jqx.browser.version < 9,
                c = b ? 4 : 0,
                d = c;
            return document.body.scrollHeight > document.body.clientHeight && b && (c = this._SCROLL_WIDTH), document.body.scrollWidth > document.body.clientWidth && b && (d = this._SCROLL_WIDTH), {
                width: a(document).width() - c,
                height: a(document).height() - d
            }
        },
        _closeButtonHover: function () {
            var a = this;
            this.addHandler(this._closeButton, this._getEvent("mouseenter"), function () {
                a._closeButton.addClass(a.toThemeProperty("jqx-window-close-button-hover"))
            }), this.addHandler(this._closeButton, this._getEvent("mouseleave"), function () {
                a._closeButton.removeClass(a.toThemeProperty("jqx-window-close-button-hover"))
            })
        },
        _collapseButtonHover: function () {
            var a = this;
            this.addHandler(this._collapseButton, this._getEvent("mouseenter"), function () {
                a._collapseButton.addClass(a.toThemeProperty("jqx-window-collapse-button-hover"))
            }), this.addHandler(this._collapseButton, this._getEvent("mouseleave"), function () {
                a._collapseButton.removeClass(a.toThemeProperty("jqx-window-collapse-button-hover"))
            })
        },
        _setModalBackgroundStyles: function () {
            if (this.isModal) {
                var b = this._getDocumentSize();
                a.jqx.browser.msie && a.jqx.browser.version < 9 ? this._modalBackground.style.filter = "alpha(opacity=" + 100 * this.modalOpacity + ")" : this._modalBackground.style.opacity = this.modalOpacity, this._modalBackground.style.position = "absolute", this._modalBackground.style.top = "0px", this._modalBackground.style.left = "0px", this._modalBackground.style.width = b.width, this._modalBackground.style.height = b.height, this._modalBackground.style.zIndex = this.modalBackgroundZIndex, this.autoOpen || (this._modalBackground.style.display = "none")
            }
        },
        _addFocusHandlers: function () {
            var a = this;
            this.addHandler(this.host, this._getEvent("mousedown"), function () {
                a.isModal || a.bringToFront()
            })
        },
        _indexOf: function (a, b) {
            for (var c = 0; c < b.length; c++)
                if (b[c][0] === a[0]) return c;
            return -1
        },
        _addCloseHandlers: function () {
            var a = this;
            this.addHandler(this._closeButton, this._getEvent("click"), function (b) {
                return a._closeWindow(b)
            }), "none" !== this.keyboardCloseKey && "number" != typeof this.keyboardCloseKey && "esc" === this.keyboardCloseKey.toLowerCase() && (this.keyboardCloseKey = 27), this.addHandler(this.host, "keydown", function (b) {
                b.keyCode === a.keyboardCloseKey && null != a.keyboardCloseKey && "none" != a.keyboardCloseKey ? a._closeWindow(b) : a._handleKeys(b)
            }, {
                self: this
            }), this.addHandler(this.host, "keyup", function () {
                if (a.keyboardNavigation && a._moved) {
                    var b = a.host.coord(),
                        c = b.left,
                        d = b.top;
                    a._raiseEvent(3, c, d, c, d), a._moved = !1
                }
            })
        },
        _handleKeys: function (b) {
            if (this.keyboardNavigation && this._headerFocused && !a(document.activeElement).ischildof(this._content)) {
                var c = b.ctrlKey,
                    d = b.keyCode,
                    e = this.host.coord(),
                    f = e.left,
                    g = e.top,
                    h = this._getDraggingArea(),
                    i = this.host.width(),
                    j = this.host.height(),
                    k = !0,
                    l = 10;
                switch (d) {
                    case 37:
                        c ? this.resizable && this.resize(i - l, j) : this.draggable && f - l >= 0 && this.move(f - l, g), k = !1;
                        break;
                    case 38:
                        c ? this.resizable && this.resize(i, j - l) : this.draggable && g - l >= 0 && this.move(f, g - l), k = !1;
                        break;
                    case 39:
                        c ? this.resizable && this.resize(i + l, j) : this.draggable && f + i + l <= h.width && this.move(f + l, g), k = !1;
                        break;
                    case 40:
                        c ? this.resizable && this.resize(i, j + l) : this.draggable && g + j + l <= h.height && this.move(f, g + l), k = !1
                }
                return k || (b.preventDefault && b.preventDefault(), b.stopPropagation && b.stopPropagation()), k
            }
        },
        _addCollapseHandlers: function () {
            var a = this;
            this.addHandler(this._collapseButton, this._getEvent("click"), function () {
                a.collapsed ? a.expand() : a.collapse()
            })
        },
        _closeWindow: function () {
            return this.closeWindow(), !1
        },
        _addHeaderCursorHandlers: function (a) {
            return a.resizeArea && a.resizable && !a.collapsed ? void (a._header[0].style.cursor = a._resizeWrapper.style.cursor) : a.draggable ? void (a._header[0].style.cursor = "move") : (a._header[0].style.cursor = "default", void (a._resizeWrapper && (a._resizeWrapper.style.cursor = "default")))
        },
        _addDragDropHandlers: function () {
            if (this.draggable) {
                var b = this;
                this.addHandler(this.host, "focus", function () {
                    b._headerFocused = !0
                }), this.addHandler(this.host, "blur", function () {
                    b._headerFocused = !1
                }), this.addHandler(this._header, "focus", function () {
                    return b._headerFocused = !0, !1
                }), this.addHandler(this._header, this._getEvent("mousedown"), function (a, c, d) {
                    return c && (a.pageX = c), d && (a.pageY = d), b._headerMouseDownHandler(b, a), !0
                }), this.addHandler(this._header, "dragstart", function (a) {
                    return a.preventDefault && a.preventDefault(), !1
                }), this.addHandler(this._header, this._getEvent("mousemove"), function (a) {
                    return b._headerMouseMoveHandler(b, a)
                }), this.addHandler(a(document), this._getEvent("mousemove") + "." + this.host.attr("id"), function (a) {
                    return b._dragHandler(b, a)
                }), this.addHandler(a(document), this._getEvent("mouseup") + "." + this.host.attr("id"), function (a) {
                    return b._dropHandler(b, a)
                });
                try {
                    if ("" !== document.referrer || window.frameElement) {
                        var c = null;
                        if (null != window.top && window.top != window.self && window.parent && document.referrer && (c = document.referrer), c && c.indexOf(document.location.host) != -1) {
                            var d = function (a) {
                                b._dropHandler(b, a)
                            };
                            window.top.document.addEventListener ? window.top.document.addEventListener("mouseup", d, !1) : window.top.document.attachEvent && window.top.document.attachEvent("onmouseup", d)
                        }
                    }
                } catch (a) { }
            }
        },
        _headerMouseDownHandler: function (b, c) {
            if (b.isModal || b.bringToFront(), null == b._resizeDirection) {
                var d = a.jqx.position(c);
                b._mousePosition.x = d.left, b._mousePosition.y = d.top, b._mouseDown = !0, b._isDragging = !1
            }
        },
        _headerMouseMoveHandler: function (b, c) {
            if (b._mouseDown && !b._isDragging) {
                var d = a.jqx.mobile.getTouches(c),
                    e = d[0],
                    f = e.pageX,
                    g = e.pageY,
                    h = a.jqx.position(c);
                return f = h.left, g = h.top, (f + 3 < b._mousePosition.x || f - 3 > b._mousePosition.x || g + 3 < b._mousePosition.y || g - 3 > b._mousePosition.y) && (b._isDragging = !0, b._mousePosition = {
                    x: f,
                    y: g
                }, b._windowPosition = {
                    x: b.host.coord().left,
                    y: b.host.coord().top
                }, a(document.body).addClass(b.toThemeProperty("jqx-disableselect"))), !!b._isTouchDevice && (c.preventDefault(), !0)
            }
            return !b._isDragging || !!b._isTouchDevice && (c.preventDefault(), !0)
        },
        _dropHandler: function (b, c) {
            var d = !0;
            if (b._isDragging && !b.isResizing && !b._resizeDirection) {
                var e = parseInt(b.host.css("left"), 10),
                    f = parseInt(b.host.css("top"), 10),
                    g = b._isTouchDevice ? 0 : c.pageX,
                    h = b._isTouchDevice ? 0 : c.pageY;
                b.enableResize = b._enableResizeBackup, b._enableResizeBackup = "undefined", b._raiseEvent(3, e, f, g, h), d = !1, "undefined" != c.preventDefault && c.preventDefault(), null != c.originalEvent && (c.originalEvent.mouseHandled = !0), "undefined" != c.stopPropagation && c.stopPropagation()
            }
            return b._isDragging = !1, b._mouseDown = !1, a(document.body).removeClass(b.toThemeProperty("jqx-disableselect")), d
        },
        _dragHandler: function (b, c) {
            if (b._isDragging && !b.isResizing && !b._resizeDirection) {
                var d = b._isTouchDevice ? c.originalEvent.which : c.which;
                if ("undefined" == typeof b._enableResizeBackup && (b._enableResizeBackup = b.enableResize), b.enableResize = !1, 0 === d && a.jqx.browser.msie && a.jqx.browser.version < 8) return b._dropHandler(b, c);
                var e = a.jqx.position(c),
                    f = e.left,
                    g = e.top,
                    h = f - b._mousePosition.x,
                    i = g - b._mousePosition.y,
                    j = b._windowPosition.x + h,
                    k = b._windowPosition.y + i;
                return b.move(j, k, c), c.preventDefault(), !1
            }
            return !0
        },
        _validateCoordinates: function (a, b, c, d) {
            var e = this._getDraggingArea();
            a = a < e.left ? e.left : a, b = b < e.top ? e.top : b;
            var f = this.host.outerWidth(!0),
                g = this.host.outerHeight(!0);
            return a + f >= e.width + e.left - 2 * d && (a = e.width + e.left - f - d), b + g >= e.height + e.top - c && (b = e.height + e.top - g - c), {
                x: a,
                y: b
            }
        },
        _performLayout: function () {
            this._performHeaderLayout(), this._performWidgetLayout()
        },
        _parseDragAreaAttributes: function () {
            null !== this.dragArea && (this.dragArea.height = parseInt(this.dragArea.height, 10), this.dragArea.width = parseInt(this.dragArea.width, 10), this.dragArea.top = parseInt(this.dragArea.top, 10), this.dragArea.left = parseInt(this.dragArea.left, 10))
        },
        _positionWindow: function () {
            if (this._parseDragAreaAttributes(), this.position instanceof Array && 2 === this.position.length && "number" == typeof this.position[0] && "number" == typeof this.position[1]) this.element.style.left = this._toPx(this.position[0]),
                this.element.style.top = this._toPx(this.position[1]);
            else if (this.position instanceof Object) {
                if (this.position.left) this.host.offset(this.position);
                else if (void 0 !== this.position.x && void 0 !== this.position.y) this.element.style.left = this._toPx(this.position.x), this.element.style.top = this._toPx(this.position.y);
                else if (this.position.center) {
                    this._centerElement(this.host, this.position.center, "xy");
                    var a = this.position.center.coord(),
                        b = parseInt(this.host.css("left"), 10),
                        c = parseInt(this.host.css("top"), 10);
                    this.element.style.left = this._toPx(b + a.left), this.element.style.top = this._toPx(c + a.top)
                }
            } else this._positionFromLiteral()
        },
        _getDraggingArea: function () {
            var a = {};
            return a.left = this.dragArea && this.dragArea.left ? this.dragArea.left : 0, a.top = this.dragArea && this.dragArea.top ? this.dragArea.top : 0, a.width = this.dragArea && this.dragArea.width ? this.dragArea.width : this._getDocumentSize().width, a.height = this.dragArea && this.dragArea.height ? this.dragArea.height : this._getDocumentSize().height, a
        },
        _positionFromLiteral: function () {
            this.position instanceof Array || (this.position = this.position.split(","));
            for (var b = this.position.length, c = this._getDraggingArea(); b; ) switch (b -= 1, this.position[b] = this.position[b].replace(/ /g, ""), this.position[b]) {
                case "top":
                    this.element.style.top = this._toPx(c.top);
                    break;
                case "left":
                    this.element.style.left = this._toPx(c.left);
                    break;
                case "bottom":
                    this.element.style.top = this._toPx(c.height - this.host.height() + c.top);
                    break;
                case "right":
                    this.element.style.left = this._toPx(c.left + c.width - this.host.width());
                    break;
                default:
                    this.dragArea || (c = a(window)), this._centerElement(this.host, c, "xy")
            }
        },
        _raiseEvent: function (b) {
            var c = this._events[b],
                d = a.Event(c),
                e = {};
            return 2 !== b && 3 !== b || (e.x = arguments[1], e.y = arguments[2], e.pageX = arguments[3], e.pageY = arguments[4]), "closed" !== c && "close" !== c || (e.dialogResult = this.dialogResult), d.args = e, this.host.trigger(d)
        },
        destroy: function () {
            this.removeHandler(a(window), "resize.window" + this.element.id), this._removeEventHandlers(), this._destroy()
        },
        _destroy: function () {
            this.isModal && (null !== this._modalBackground && a(this._modalBackground).remove(), this.host.jqxWindow({
                isModal: !1
            })), this.restricter && (this.removeHandler(a(window), "resize." + this.element.id), this.removeHandler(a(window), "orientationchanged." + this.element.id), this.removeHandler(a(window), "orientationchange." + this.element.id)), this.host.remove(), null !== this._modalBackground && a(this._modalBackground).remove()
        },
        _toClose: function (a, b) {
            return a && b[0] === this.element || b[0] !== this.element && "object" == typeof b[0]
        },
        propertyChangedHandler: function (b, c, d, e) {
            switch (this._validateProperties(), c) {
                case "rtl":
                    this._performLayout();
                    break;
                case "dragArea":
                    this._positionWindow();
                    break;
                case "collapseButtonSize":
                    this._performLayout();
                    break;
                case "closeButtonSize":
                    this._performLayout();
                    break;
                case "isModal":
                    if (this._refresh(), this._fixWindowZIndex(), e === !1)
                        for (var f = a.data(document.body, "jqxwindows-modallist"), g = [], h = 0; h < f.length; h++) {
                            var i = f[h][0];
                            i !== this.element && g.push(f[h])
                        }
                    a.data(document.body, "jqxwindows-modallist", g);
                    break;
                case "keyboardCloseKey":
                    this._removeEventHandlers(), this._addEventHandlers();
                    break;
                case "disabled":
                    e ? this.disable() : (this.disabled = !0, this.enable());
                    break;
                case "showCloseButton":
                case "showCollapseButton":
                    this._performLayout();
                    break;
                case "height":
                    this._performLayout();
                    break;
                case "width":
                    this._performLayout();
                    break;
                case "title":
                    this.setTitle(e), this.title = e;
                    break;
                case "content":
                    this.setContent(e);
                    break;
                case "draggable":
                    this._removeEventHandlers(), this._addEventHandlers(), this._removeResize(), this._initializeResize();
                    break;
                case "resizable":
                    this.enableResize = e, e ? this._initializeResize() : this._removeResize();
                    break;
                case "position":
                    this._positionWindow();
                    break;
                case "modalOpacity":
                    this._setModalBackgroundStyles();
                    break;
                case "okButton":
                    e ? this._addDialogButtonsHandlers() : this.removeHandler(this.okButton);
                    break;
                case "cancelButton":
                    e ? this._addDialogButtonsHandlers() : this.removeHandler(this.cancelButton);
                    break;
                case "collapsed":
                    e ? d || (this.collapsed = !1, this.collapse(0)) : d && (this.collapsed = !0, this.expand(0));
                    break;
                case "theme":
                    a.jqx.utilities.setTheme(d, e, this.host);
                    break;
                case "enableResize":
                    return;
                case "maxWidth":
                case "maxHeight":
                case "minWidth":
                case "minHeight":
                    return b._performLayout(), b._removeResize(), void b._initializeResize();
                default:
                    return
            }
        },
        collapse: function (b) {
            if (!this.collapsed && this._animationInProgress !== !0) {
                if ("none" == this.host.css("display")) return;
                var c = this,
                    d = this._header.outerHeight(!0),
                    e = parseInt(this._header.css("border-bottom-width"), 10),
                    f = parseInt(this._header.css("margin-bottom"), 10);
                b = isNaN(parseInt(b, 10)) ? this.collapseAnimationDuration : b, isNaN(e) || (d -= 2 * e), isNaN(f) || (d += f), this._heightBeforeCollapse = this.host.height(), this._minHeightBeforeCollapse = this.host.css("min-height"), this.element.style.minHeight = this._toPx(d), c._animationInProgress = !0, this.host.animate({
                    height: d
                }, {
                    duration: b,
                    complete: function () {
                        c._animationInProgress = !1, c.collapsed = !0, c._collapseButton.addClass(c.toThemeProperty("jqx-window-collapse-button-collapsed")), c._collapseButton.addClass(c.toThemeProperty("jqx-icon-arrow-down")), c._content[0].style.display = "none", c._raiseEvent(5), c._raiseEvent(9), a.jqx.aria(c, "aria-expanded", !1)
                    }
                })
            }
        },
        expand: function (b) {
            if (this.collapsed && this._animationInProgress !== !0) {
                var c = this;
                b = isNaN(parseInt(b, 10)) ? this.collapseAnimationDuration : b, c._animationInProgress = !0, this.host.animate({
                    height: this._heightBeforeCollapse
                }, {
                    duration: b,
                    complete: function () {
                        c._animationInProgress = !1, c.collapsed = !1, c.element.style.minHeight = c._toPx(c._minHeightBeforeCollapse), c._collapseButton.removeClass(c.toThemeProperty("jqx-window-collapse-button-collapsed")), c._collapseButton.removeClass(c.toThemeProperty("jqx-icon-arrow-down")), c._content[0].style.display = "block", c._raiseEvent(6), c._performWidgetLayout(), c._raiseEvent(9), a.jqx.aria(c, "aria-expanded", !0)
                    }
                })
            }
        },
        closeAll: function (b) {
            b = !0;
            for (var c = a.data(document.body, "jqxwindows-list"), d = c.length, e = a.data(document.body, "jqxwindow-modal") || []; d; ) d -= 1, this._toClose(b, c[d]) && (c[d].jqxWindow("closeWindow", "close"), c.splice(d, 1));
            this._toClose(b, e) && (e.jqxWindow("closeWindow", "close"), a.data(document.body, "jqxwindow-modal", [])), a.data(document.body, "jqxwindows-list", c)
        },
        setTitle: function (a) {
            if ("string" == typeof a) this._headerContentWrapper.html(a);
            else if ("object" == typeof a) try {
                this._headerContentWrapper[0].innerHTML = "", a instanceof HTMLElement ? this._headerContentWrapper[0].appendChild(a) : a.appendTo && a.appendTo(this._headerContentWrapper)
            } catch (a) {
                throw new Error(a)
            }
            this.title = a, this._performLayout()
        },
        setContent: function (b) {
            this._contentInitialized = !1;
            for (var c = this._content, d = !1; !d; ) c[0].style.width = "auto", c[0].style.height = "auto", c.hasClass("jqx-window") ? d = !0 : c = a(c[0].parentNode);
            if (a.isArray(b))
                for (var e = 0; e < b.length; e++) b[e].appendTo(this._content);
            else if ("string" == typeof b) a(this._content[0]).html(b);
            else if ("object" == typeof b) try {
                this._content[0].innerHTML = "", b instanceof HTMLElement ? this._content[0].appendChild(b) : b.appendTo && b.appendTo(this._content)
            } catch (a) {
                throw new Error(a)
            }
            this.content = b, this._performLayout()
        },
        disable: function () {
            this.disabled = !0, this._removeEventHandlers(), this._header.addClass(this.toThemeProperty("jqx-window-header-disabled")), this._closeButton.addClass(this.toThemeProperty("jqx-window-close-button-disabled")), this._collapseButton.addClass(this.toThemeProperty("jqx-window-collapse-button-disabled")), this._content.addClass(this.toThemeProperty("jqx-window-content-disabled")), this.host.addClass(this.toThemeProperty("jqx-window-disabled")), this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled")), this._removeResize()
        },
        enable: function () {
            this.disabled && (this._addEventHandlers(), this._header.removeClass(this.toThemeProperty("jqx-window-header-disabled")), this._content.removeClass(this.toThemeProperty("jqx-window-content-disabled")), this._closeButton.removeClass(this.toThemeProperty("jqx-window-close-button-disabled")), this._collapseButton.removeClass(this.toThemeProperty("jqx-window-collapse-button-disabled")), this.host.removeClass(this.toThemeProperty("jqx-window-disabled")), this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled")), this.disabled = !1, this._initializeResize())
        },
        isOpen: function () {
            return this._visible
        },
        closeWindow: function (a) {
            var b = this;
            a = "undefined" == typeof a ? this.closeButtonAction : a, this.hide(function () {
                "close" === a && b._destroy()
            })
        },
        bringToFront: function () {
            var b = a.data(document.body, "jqxwindows-list");
            if (this.isModal) return b = a.data(document.body, "jqxwindows-modallist"), this._fixWindowZIndex("modal-hide"), void this._fixWindowZIndex("modal-show");
            for (var c = b[b.length - 1], d = parseInt(c.css("z-index"), 10), e = this._indexOf(this.host, b), f = b.length - 1; f > e; f -= 1) {
                var g = parseInt(b[f].css("z-index"), 10) - 1;
                b[f][0].style.zIndex = g
            }
            this.element.style.zIndex = d, this._sortByStyle("z-index", b)
        },
        hide: function (b, c, d) {
            var e = this;
            if (this.closing) {
                var f = this.closing();
                if (f === !1) return
            }
            switch (c = c || this.closeAnimationDuration, this.animationType) {
                case "none":
                    this.element.style.display = "none";
                    break;
                case "fade":
                    e._animationInProgress = !0, this.host.fadeOut({
                        duration: c,
                        callback: function () {
                            e._animationInProgress = !1, b instanceof Function && b()
                        }
                    });
                    break;
                case "slide":
                    e._animationInProgress = !0, this.host.slideUp({
                        duration: c,
                        callback: function () {
                            e._animationInProgress = !1, b instanceof Function && b()
                        }
                    });
                    break;
                case "combined":
                    e._animationInProgress = !0, this.host.animate({
                        opacity: 0,
                        width: "0px",
                        height: "0px"
                    }, {
                        duration: c,
                        complete: function () {
                            e._animationInProgress = !1, e.element.style.display = "none", b instanceof Function && b()
                        }
                    })
            }
            this._visible = !1, this.isModal && (a(this._modalBackground).hide(), this._fixWindowZIndex("modal-hide")), d !== !0 && (this._raiseEvent(1), this._raiseEvent(8))
        },
        open: function (a, b) {
            this.show(a, b)
        },
        close: function (a, b, c) {
            this.hide(a, b, c)
        },
        show: function (b, c) {
            var d = this;
            switch (this._setDialogResult("none"), c = c || this.showAnimationDuration, this.animationType) {
                case "none":
                    this.element.style.display = "block";
                    break;
                case "fade":
                    d._animationInProgress = !0, this.host.fadeIn({
                        duration: c,
                        complete: function () {
                            d._animationInProgress = !1, b instanceof Function && b()
                        }
                    });
                    break;
                case "slide":
                    d._animationInProgress = !0, this.host.slideDown({
                        duration: c,
                        callback: function () {
                            d._animationInProgress = !1, b instanceof Function && b()
                        }
                    });
                    break;
                case "combined":
                    this.element.style.display = "block";
                    var e = d.host.width(),
                        f = d.host.height();
                    this.element.style.minWidth = "0px", this.element.style.minHeight = "0px", this.element.style.opacity = 0, this.element.style.width = "0px", this.element.style.height = "0px", d._animationInProgress = !0, this.host.animate({
                        opacity: 1,
                        width: e + "px",
                        height: f + "px"
                    }, {
                        duration: c,
                        complete: function () {
                            d._animationInProgress = !1, d._performLayout(), b instanceof Function && b()
                        }
                    })
            }
            this.isModal && (a(this._modalBackground).show(), this._fixWindowZIndex("modal-show"));
            var g = this;
            if (this._visible || (c > 150 && "none" != this.animationType ? setTimeout(function () {
                g._contentInitialized || g.initContent && (g.initContent(), g._contentInitialized = !0), g._raiseEvent(7), g._raiseEvent(9)
            }, c - 150) : (g._contentInitialized || g.initContent && (g.initContent(), g._contentInitialized = !0), this._raiseEvent(7), g._raiseEvent(9))), this._visible = !0, "combined" !== d.animationType && this._performLayout(), this.autoFocus) {
                var h = function () {
                    g._isTouchDevice || g._content[0].focus()
                };
                h(), setTimeout(function () {
                    h()
                }, 100)
            }
        },
        _getTabbables: function () {
            var b;
            b = a.jqx.browser.msie && a.jqx.browser.version < 9 ? this._content.find("*") : this._content[0].querySelectorAll("*");
            var c = [];
            return a.each(b, function () {
                d(this) && (c[c.length] = this)
            }), c
        },
        move: function (b, c, d, e) {
            var f, g, h, i = 0,
                j = 0;
            if (b = parseInt(b, 10), c = parseInt(c, 10), a.jqx.browser.msie && (a(window).width() > a(document).width() && !this.dragArea && (j = this._SCROLL_WIDTH), a(window).height() < a(document).height() && document.documentElement.clientWidth > document.documentElement.scrollWidth && !this.dragArea && (i = this._SCROLL_WIDTH)), f = this._validateCoordinates(b, c, j, i), parseInt(this.host.css("left"), 10) !== f.x || parseInt(this.host.css("top"), 10) !== f.y) {
                if (d) {
                    var k = a.jqx.position(d);
                    g = k.left, h = k.top
                }
                void 0 === g && (g = b), void 0 === h && (h = c), e !== !1 && this._raiseEvent(2, f.x, f.y, g, h)
            }
            this.element.style.left = f.x + "px", this.element.style.top = f.y + "px", this._moved = !0
        },
        _toPx: function (a) {
            return "number" == typeof a ? a + "px" : a
        }
    })
} (jqxBaseFramework),
function (a) {
    "use strict";
    var b = function (a) {
        return {
            resizeConfig: function () {
                this.resizeTarget = null, this.resizeIndicatorSize = 5, this.resizeTargetChildren = null, this.isResizing = !1, this.resizeArea = !1, this.minWidth = 1, this.maxWidth = 100, this.minHeight = 1, this.maxHeight = 100, this.resizeParent = null, this.enableResize = !0, this._resizeEvents = ["resizing", "resized", "resize"], this._resizeMouseDown = !1, this._resizeCurrentMode = null, this._mouseResizePosition = {}, this._resizeMethods = null, this._SCROLL_WIDTH = 21
            },
            _resizeExceptions: {
                invalidTarget: "Invalid target!",
                invalidMinHeight: "Invalid minimal height!",
                invalidMaxHeight: "Invalid maximum height!",
                invalidMinWidth: "Invalid minimum width!",
                invalidMaxWidth: "Invalid maximum width!",
                invalidIndicatorSize: "Invalid indicator size!",
                invalidSize: "Invalid size!"
            },
            removeResize: function () {
                if (this.resizeTarget) {
                    var b = a(this.resizeTarget.children(".jqx-resize"));
                    b.detach();
                    var c = b.children();
                    this._removeResizeEventListeners();
                    for (var d = 0; d < c.length; d += 1) a(c[d]).detach(), this.resizeTarget.append(c[d]);
                    b.remove()
                }
                this._resizeDirection = null
            },
            initResize: function (b) {
                this.resizeConfig(), this.resizeTarget = a(b.target), this.resizeIndicatorSize = b.indicatorSize || 10, this.maxWidth = b.maxWidth || 100, this.minWidth = b.minWidth || 1, this.maxHeight = b.maxHeight || 100, this.minHeight = b.minHeight || 1, this.resizeParent = b.resizeParent, this._parseResizeParentProperties(), this._validateResizeProperties(), this._validateResizeTargetDimensions(), this._getChildren(this.resizeTarget.maxWidth, this.resizeTarget.minWidth, this.resizeTarget.maxHeight, this.resizeTarget.minHeight, b.alsoResize), this._refreshResize(), this._cursorBackup = this.resizeTarget.css("cursor"), "auto" === this._cursorBackup && (this._cursorBackup = "default")
            },
            _validateResizeTargetDimensions: function () {
                this.resizeTarget.maxWidth = this.maxWidth, this.resizeTarget.minWidth = 3 * this.resizeIndicatorSize > this.minWidth ? 3 * this.resizeIndicatorSize : this.minWidth, this.resizeTarget.maxHeight = this.maxHeight, this.resizeTarget.minHeight = 3 * this.resizeIndicatorSize > this.minHeight ? 3 * this.resizeIndicatorSize : this.minHeight
            },
            _parseResizeParentProperties: function () {
                this.resizeParent && (this.resizeParent.left = parseInt(this.resizeParent.left, 10), this.resizeParent.top = parseInt(this.resizeParent.top, 10), this.resizeParent.width = parseInt(this.resizeParent.width, 10), this.resizeParent.height = parseInt(this.resizeParent.height, 10))
            },
            _getChildren: function (b, c, d, e, f) {
                this.resizeTargetChildren = a(f), this.resizeTargetChildren = this.resizeTargetChildren.toArray();
                for (var g = this.resizeTargetChildren.length; g; ) g -= 1, this.resizeTargetChildren[g] = a(this.resizeTargetChildren[g])
            },
            _refreshResize: function () {
                this._renderResize(), this._performResizeLayout(), this._removeResizeEventListeners(), this._addResizeEventHandlers()
            },
            _renderResize: function () {
                var b = this;
                if (!(void 0 !== b._resizeWrapper && a(b._resizeWrapper).parents().length > 0)) {
                    var c = document.createElement("div");
                    c.className = "jqx-resize jqx-rc-all", c.style.zIndex = 8e3, c.appendChild(b._header[0]), c.appendChild(b._content[0]), b.resizeTarget[0].appendChild(c), b._resizeWrapper = c
                }
            },
            _performResizeLayout: function () {
                this._resizeWrapper.style.height = this.resizeTarget.height() + "px", this._resizeWrapper.style.width = this.resizeTarget.width() + "px"
            },
            _removeResizeEventListeners: function () {
                var b = this.resizeTarget.attr("id");
                this.removeHandler(this._resizeWrapper, "mousemove.resize" + b), this.removeHandler(this._resizeWrapper, "mousedown.resize" + b), this.removeHandler(a(document), "mousemove.resize" + b), this.removeHandler(a(document), "mouseup.resize" + b)
            },
            _addResizeEventHandlers: function () {
                var b = this.resizeTarget.attr("id"),
                    c = this;
                this.addHandler(this._resizeWrapper, "mousemove.resize." + b, function (a) {
                    c._resizeCursorChangeHandler(c, a)
                }), this.addHandler(this._resizeWrapper, "mousedown.resize." + b, function (a) {
                    c._resizeMouseDownHandler(c, a)
                }), this.addHandler(a(document), "mousemove.resize." + b, function (a) {
                    return c._resizeHandler(c, a)
                }), this.addHandler(a(document), "mouseup.resize." + b, function (a) {
                    c._stopResizing(c, a)
                });
                try {
                    if ("" !== document.referrer || window.frameElement) {
                        var d = function (a) {
                            c._stopResizing(c, a)
                        };
                        window.top.document.addEventListener ? window.top.document.addEventListener("mouseup", d, !1) : window.top.document.attachEvent && window.top.document.attachEvent("onmouseup", d)
                    }
                } catch (a) { }
            },
            _stopResizing: function (a) {
                a.enableResize && (a.isResizing && a._raiseResizeEvent(1), a._resizeMouseDown = !1, a.isResizing = !1, a._resizeDirection = null, a.resizeTarget && a.resizeTarget.removeClass("jqx-disableselect")), "undefined" == a._cursorBackup && (a._cursorBackup = "default"), a._resizeWrapper && (a._resizeWrapper.style.cursor = a._cursorBackup)
            },
            _resizeHandler: function (b, c) {
                if (b.enableResize && !b.collapsed) return b.isResizing && b._resizeDirection ? (0 === c.which && a.jqx.browser.msie && a.jqx.browser.version < 9 && b._stopResizing(c), b._performResize(c.pageX, c.pageY), !1) : b._resizeCaptureCursor(c.pageX, c.pageY)
            },
            _resizeCaptureCursor: function (a, b) {
                if (this._resizeMouseDown && !this.isResizing && this._resizeDirection && (a + 3 < this._mouseResizePosition.x || a - 3 > this._mouseResizePosition.x || b + 3 < this._mouseResizePosition.y || b - 3 > this._mouseResizePosition.y)) return this._changeCursor(a - parseInt(this.resizeTarget.css("left"), 10), b - parseInt(this.resizeTarget.css("top"), 10)), this._mouseResizePosition = {
                    x: a,
                    y: b
                }, this._prepareResizeMethods(this._resizeDirection), this._resizeBackupData(), this.isResizing = !0, this.resizeTarget.addClass("jqx-disableselect"), !1
            },
            _resizeBackupData: function () {
                this.resizeTarget.lastWidth = this.resizeTarget.width(), this.resizeTarget.lastHeight = this.resizeTarget.height(), this.resizeTarget.x = parseInt(this.resizeTarget.css("left"), 10), this.resizeTarget.y = parseInt(this.resizeTarget.css("top"), 10), this._resizeBackupChildrenSize()
            },
            _resizeBackupChildrenSize: function () {
                for (var a, b = this.resizeTargetChildren.length; b; ) b -= 1, a = this.resizeTargetChildren[b], this.resizeTargetChildren[b].lastWidth = a.width(), this.resizeTargetChildren[b].lastHeight = a.height()
            },
            _performResize: function (a, b) {
                var c = a - this._mouseResizePosition.x,
                    d = b - this._mouseResizePosition.y;
                this._resizeDirection && this._resize(this.resizeTarget, c, d)
            },
            _resizeCursorChangeHandler: function (a, b) {
                a.enableResize && !a.collapsed && (a.isResizing || a._changeCursor(b.pageX - parseInt(a.resizeTarget.css("left"), 10), b.pageY - parseInt(a.resizeTarget.css("top"), 10)))
            },
            _resizeMouseDownHandler: function (a, b) {
                a.enableResize && null !== a._resizeDirection && (a._resizeMouseDown = !0, a._mouseResizePosition.x = b.pageX, a._mouseResizePosition.y = b.pageY, b.preventDefault())
            },
            _validateResizeProperties: function () {
                try {
                    if (!this.resizeTarget || 1 !== this.resizeTarget.length) throw new Error(this._resizeExceptions.invalidTarget);
                    if (this.minHeight < 0 || isNaN(parseInt(this.minHeight, 10))) throw new Error(this._resizeExceptions.invalidMinHeight);
                    if (this.maxHeight <= 0 || isNaN(parseInt(this.maxHeight, 10))) throw new Error(this._resizeExceptions.invalidMaxHeight);
                    if (this.minWidth < 0 || isNaN(parseInt(this.minWidth, 10))) throw new Error(this._resizeExceptions.invalidMinWidth);
                    if (this.maxWidth < 0 || isNaN(parseInt(this.maxWidth, 10))) throw new Error(this._resizeExceptions.invalidMaxWidth);
                    if (this.resizeIndicatorSize < 0 || isNaN(parseInt(this.resizeIndicatorSize, 10))) throw new Error(this._resizeExceptions.invalidIndicatorSize);
                    if (this.minHeight > this.maxHeight || this.minWidth > this.maxWidth) throw new Error(this._resizeExceptions.invalidSize)
                } catch (a) {
                    throw new Error(a)
                }
            },
            _changeCursor: function (a, b) {
                this.isResizing || this._resizeMouseDown || (this.resizeArea = !0, a <= this.resizeIndicatorSize && a >= 0 && b <= this.resizeIndicatorSize && b > 0 ? (this._resizeWrapper.style.cursor = "nw-resize", this._resizeDirection = "topleft") : b <= this.resizeIndicatorSize && b > 0 && a >= this.resizeTarget.width() - this.resizeIndicatorSize ? (this._resizeWrapper.style.cursor = "ne-resize", this._resizeDirection = "topright") : b >= this.resizeTarget.height() - this.resizeIndicatorSize && b < this.resizeTarget.height() && a <= this.resizeIndicatorSize && a >= 0 ? (this._resizeWrapper.style.cursor = "sw-resize", this._resizeDirection = "bottomleft") : b >= this.resizeTarget.height() - this.resizeIndicatorSize && b < this.resizeTarget.height() && a >= this.resizeTarget.width() - this.resizeIndicatorSize && a < this.resizeTarget.width() ? (this._resizeWrapper.style.cursor = "se-resize", this._resizeDirection = "bottomright") : a <= this.resizeIndicatorSize && a >= 0 ? (this._resizeWrapper.style.cursor = "e-resize", this._resizeDirection = "left") : b <= this.resizeIndicatorSize && b > 0 ? (this._resizeWrapper.style.cursor = "n-resize", this._resizeDirection = "top") : b >= this.resizeTarget.height() - this.resizeIndicatorSize && b < this.resizeTarget.height() ? (this._resizeWrapper.style.cursor = "n-resize", this._resizeDirection = "bottom") : a >= this.resizeTarget.width() - this.resizeIndicatorSize && a < this.resizeTarget.width() ? (this._resizeWrapper.style.cursor = "e-resize", this._resizeDirection = "right") : (this._resizeWrapper.style.cursor = this._cursorBackup, this._resizeDirection = null, this.resizeArea = !1))
            },
            _prepareResizeMethods: function (a) {
                this._resizeMethods = [], a.indexOf("left") >= 0 && this._resizeMethods.push(this._resizeLeft), a.indexOf("top") >= 0 && this._resizeMethods.push(this._resizeTop), a.indexOf("right") >= 0 && this._resizeMethods.push(this._resizeRight), a.indexOf("bottom") >= 0 && this._resizeMethods.push(this._resizeBottom)
            },
            _validateResize: function (a, b, c, d, e) {
                return "horizontal" === c || "both" === c ? this._validateWidth(a, d, e) : "vertical" === c || "both" === c ? this._validateHeight(b, d, e) : {
                    result: !1,
                    fix: 0
                }
            },
            _getParent: function () {
                return null !== this.resizeParent && "undefined" !== this.resizeParent && this.resizeParent.height && this.resizeParent.width && this.resizeParent.top && this.resizeParent.left ? this.resizeParent : {
                    left: 0,
                    top: 0,
                    width: a(document).width(),
                    height: a(document).height()
                }
            },
            _validateHeight: function (b, c, d) {
                var e = 0,
                    f = 2,
                    g = this._getParent();
                return a(window).width() > a(document).width() && a.jqx.browser.msie && g.height === a(document).height() && (e = this._SCROLL_WIDTH), "bottom" === d && b + c.position().top + e + f > g.height + g.top ? {
                    fix: g.height - c.position().top - e - f + g.top,
                    result: !1
                } : "top" === d && c.lastHeight - b + c.y < g.top ? {
                    fix: b + (c.lastHeight - b + c.y) - g.top,
                    result: !1
                } : b < c.minHeight ? {
                    fix: c.minHeight,
                    result: !1
                } : b > c.maxHeight ? {
                    fix: c.maxHeight,
                    result: !1
                } : {
                    result: !0,
                    fix: b
                }
            },
            _validateWidth: function (b, c, d) {
                var e = 0,
                    f = 2,
                    g = this._getParent();
                return a(window).height() < a(document).height() && a.jqx.browser.msie && document.documentElement.clientWidth >= document.documentElement.scrollWidth && g.width === a(document).width() && (e = this._SCROLL_WIDTH), "right" === d && b + c.position().left + e + f > g.width + g.left ? {
                    fix: g.width - c.position().left - e - f + g.left,
                    result: !1
                } : "left" === d && c.lastWidth - b + c.x < g.left ? {
                    fix: b + (c.lastWidth - b + c.x) - g.left,
                    result: !1
                } : b < c.minWidth ? {
                    fix: c.minWidth,
                    result: !1
                } : b > c.maxWidth ? {
                    fix: c.maxWidth,
                    result: !1
                } : {
                    result: !0,
                    fix: b
                }
            },
            _resize: function (a, b, c) {
                for (var d = this._resizeMethods.length, e = 0; e < d; e++)
                    if (this._resizeMethods[e] instanceof Function) {
                        var f = {
                            element: a,
                            x: b,
                            y: c,
                            self: this
                        };
                        this._resizeMethods[e](f)
                    }
                this._performResizeLayout()
            },
            resize: function (a, b) {
                if (this.resizable) {
                    var c = a - this.host.width(),
                        d = b - this.host.height(),
                        e = "right";
                    0 !== d && (e = "bottom"), this._resizeDirection = e, this._prepareResizeMethods(this._resizeDirection), this._resizeBackupData(), this.isResizing = !0, this._resize(this.resizeTarget, c, d), this.isResizing = !1
                }
            },
            _setResizeChildrenSize: function (a, b) {
                for (var c = this.resizeTargetChildren.length; c; )
                    if (c--, "width" === b) {
                        var d = this.resizeTargetChildren[c].lastWidth - (this.resizeTarget.lastWidth - a);
                        d < this.resizeTarget.maxWidth && d > 0 && this.resizeTargetChildren[c].width(d)
                    } else {
                        var e = this.resizeTargetChildren[c].lastHeight - (this.resizeTarget.lastHeight - a);
                        e < this.resizeTarget.maxHeight && e > 0 && this.resizeTargetChildren[c].height(e)
                    }
            },
            _resizeRight: function (a) {
                var b = a.element.lastWidth + a.x,
                    c = a.self._validateResize(b, 0, "horizontal", a.element, "right");
                return c.result || (b = c.fix), a.element.width() !== b && (a.self._setResizeChildrenSize(b, "width"), a.element.width(b), a.self._raiseResizeEvent(0)), b
            },
            _resizeLeft: function (a) {
                var b = a.element.lastWidth - a.x,
                    c = a.self._validateResize(b, 0, "horizontal", a.element, "left"),
                    d = a.element.x + a.x;
                return c.result ? (a.element.width() !== b && (a.self._setResizeChildrenSize(b, "width"), a.element.width(b), a.element[0].style.left = a.self._toPx(d), a.self._raiseResizeEvent(0)), b) : (d = a.element.x + (a.element.lastWidth - c.fix), void (b = c.fix))
            },
            _resizeBottom: function (a) {
                var b = a.element.lastHeight + a.y,
                    c = a.self._validateResize(0, b, "vertical", a.element, "bottom");
                return c.result || (b = c.fix), a.element.height() !== b && (a.self._setResizeChildrenSize(b, "height"), a.element.height(b), a.self._raiseResizeEvent(0)), b
            },
            _resizeTop: function (a) {
                var b = a.element.lastHeight - a.y,
                    c = a.self._validateResize(0, b, "vertical", a.element, "top"),
                    d = a.element.y + a.y;
                return c.result ? (a.element.height() !== b && (a.self._setResizeChildrenSize(b, "height"), a.element.height(b), a.element[0].style.top = a.self._toPx(d), a.self._raiseResizeEvent(0)), b) : (d = a.element.y + (a.element.lastHeight - c.fix), void (b = c.fix))
            },
            _raiseResizeEvent: function (b) {
                var c = this._resizeEvents[b],
                    d = a.Event(c),
                    e = {};
                if (e.width = parseInt(this.resizeTarget[0].style.width, 10), e.height = parseInt(this.resizeTarget[0].style.height, 10), d.args = e, 0 === b) {
                    c = this._resizeEvents[2];
                    var f = a.Event(c);
                    f.args = e, this.resizeTarget.trigger(f)
                }
                return this.resizeTarget.trigger(d)
            }
        }
    } (jqxBaseFramework);
    a.extend(a.jqx._jqxWindow.prototype, b)
} (jqxBaseFramework);