// Check the need to initiate backflyer
var _bfos = navigator.userAgent.toLowerCase().match(/(android|iphone|ipad|ipod)/);
var _bfrefptrn = new RegExp(document.location.hostname);
var _bfIsGoogle = /www\.google/.test(document.referrer);
var _bfOtherRef = !_bfrefptrn.test(document.referrer);
var _bfHasRef = (document.referrer != "");
function loadScript(url, callback) {
    var s = document.createElement("script"); s.async = true; s.src = url;
    var fs = document.getElementsByTagName("script")[0]; fs.parentNode.insertBefore(s, fs);
    s.onload = callback;
}
function extendjQuery() {
    +function ($) {
        "use strict";

        // MODAL CLASS DEFINITION
        // ======================

        var Backflyer = function (element, options) {
            this.options = options
            this.$element = $(element).on('click.dismiss.backflyer', '[data-dismiss="backflyer"]', $.proxy(this.hide, this))
            this.$backdrop =
            this.isShown = null

            if (this.options.remote) this.$element.find('.backflyer-body').load(this.options.remote)
        }

        Backflyer.DEFAULTS = {
            backdrop: true
          , keyboard: true
          , show: true
        }

        Backflyer.prototype.toggle = function () {
            return this[!this.isShown ? 'show' : 'hide']()
        }

        Backflyer.prototype.show = function () {
            var that = this
            var e = $.Event('show.bs.backflyer')

            this.$element.trigger(e)

            if (this.isShown || e.isDefaultPrevented()) return

            this.isShown = true

            this.escape()

            this.backdrop(function () {
                var transition = $.support.transition && that.$element.hasClass('fade')

                if (!that.$element.parent().length) {
                    that.$element.appendTo(document.body) // don't move modals dom position
                }

                that.$element.show()

                if (transition) {
                    that.$element[0].offsetWidth // force reflow
                }

                that.$element
                  .addClass('in')
                  .attr('aria-hidden', false)

                that.enforceFocus()

                transition ?
                  that.$element
                    .one($.support.transition.end, function () {
                        that.$element.focus().trigger('shown.bs.backflyer')
                    })
                    .emulateTransitionEnd(300) :
                  that.$element.focus().trigger('shown.bs.backflyer')
            })
        }

        Backflyer.prototype.hide = function (e) {
            if (e) e.preventDefault()

            e = $.Event('hide.bs.backflyer')

            this.$element.trigger(e)

            if (!this.isShown || e.isDefaultPrevented()) return

            this.isShown = false

            this.escape()

            $(document).off('focusin.bs.backflyer')

            this.$element
              .removeClass('in')
              .attr('aria-hidden', true)

            $.support.transition && this.$element.hasClass('fade') ?
              this.$element
                .one($.support.transition.end, $.proxy(this.hideBackflyer, this))
                .emulateTransitionEnd(300) :
              this.hideBackflyer()
        }

        Backflyer.prototype.enforceFocus = function () {
            $(document)
              .off('focusin.bs.backflyer') // guard against infinite focus loop
              .on('focusin.bs.backflyer', $.proxy(function (e) {
                  if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                      this.$element.focus()
                  }
              }, this))
        }

        Backflyer.prototype.escape = function () {
            if (this.isShown && this.options.keyboard) {
                this.$element.on('keyup.dismiss.bs.backflyer', $.proxy(function (e) {
                    e.which == 27 && this.hide()
                }, this))
            } else if (!this.isShown) {
                this.$element.off('keyup.dismiss.bs.backflyer')
            }
        }

        Backflyer.prototype.hideBackflyer = function () {
            var that = this
            this.$element.hide()
            this.backdrop(function () {
                that.removeBackdrop()
                that.$element.trigger('hidden.bs.backflyer')
            })
        }

        Backflyer.prototype.removeBackdrop = function () {
            this.$backdrop && this.$backdrop.remove()
            this.$backdrop = null
        }

        Backflyer.prototype.backdrop = function (callback) {
            var that = this
            var animate = this.$element.hasClass('fade') ? 'fade' : ''

            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate

                this.$backdrop = $('<div class="backflyer-backdrop ' + animate + '" />')
                  .appendTo(document.body)

                this.$element.on('click', $.proxy(function (e) {
                    if (e.target !== e.currentTarget) return
                    this.options.backdrop == 'static'
                      ? this.$element[0].focus.call(this.$element[0])
                      : this.hide.call(this)
                }, this))

                if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

                this.$backdrop.addClass('in')

                if (!callback) return

                doAnimate ?
                  this.$backdrop
                    .one($.support.transition.end, callback)
                    .emulateTransitionEnd(150) :
                  callback()

            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in')

                $.support.transition && this.$element.hasClass('fade') ?
                  this.$backdrop
                    .one($.support.transition.end, callback)
                    .emulateTransitionEnd(150) :
                  callback()

            } else if (callback) {
                callback()
            }
        }

        $.fn.backflyer = function (option) {
            return this.each(function () {
                var $this = $(this)
                var data = $this.data('bs.backflyer')
                var options = $.extend({}, Backflyer.DEFAULTS, $this.data(), typeof option == 'object' && option)

                if (!data) $this.data('bs.backflyer', (data = new Backflyer(this, options)))
                if (typeof option == 'string') data[option]()
                else if (options.show) data.show()
            })
        }

        $.fn.backflyer.Constructor = Backflyer

        // MODAL DATA-API
        // ==============

        $(document).on('click.bs.backflyer.data-api', '[data-toggle="backflyer"]', function (e) {
            var $this = $(this)
            var href = $this.attr('href')
            var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
            var option = $target.data('backflyer') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

            e.preventDefault()

            $target
              .backflyer(option)
              .one('hide', function () {
                  $this.is(':visible') && $this.focus()
              })
        })

        var $body = $(document.body)
          .on('shown.bs.backflyer', '.backflyer', function () { $body.addClass('backflyer-open') })
          .on('hidden.bs.backflyer', '.backflyer', function () { $body.removeClass('backflyer-open') })

    }(window.jQuery);
}
function getDateString() {
    var dd = new Date().getUTCDate();
    var mm = new Date().getUTCMonth() + 1;
    var yyyy = new Date().getUTCFullYear();
    return (dd < 10 ? "0" + dd : dd.toString()) + (mm < 10 ? "0" + mm : mm.toString()) + yyyy.toString();
}
function attachBackflyer() {
    extendjQuery();
    $("body").append("<div class=\"backflyer fade\"><div class=\"header " + _bfos[0] + "\">מומלצים עבורך</div></div>");
    history.pushState({ backflyer: true }, document.title);
    setTimeout(function () {
        window.addEventListener('popstate', function (evt) {
            if (evt.state != null) return;
            // Add line to parse using _bfos[0]
            var BFOSnRefTracking = Parse.Object.extend("BFOSnRefTracking");
            var _bfTracking = new BFOSnRefTracking();  
            _bfTracking.save({ OS: _bfos[0], Referrer: document.referrer, Date: getDateString() });

            var _bfurl = "http://www.davai.com.br/backflyer/links/";
            _bfurl += (_bfos[0] == "android" ? "android.json" : "ios.json");
            $.ajax({
                url: _bfurl, crossDomain: true, contentType: "application/json", jsonpCallback: "_bfShowLinks", dataType: "jsonp",
                success: function (data) {
                    var _bfcontainer = $("<div style=\"overflow-y: scroll; -webkit-overflow-scrolling: touch; height: " + ($(window).height() - 64) + "px\"></div>");
                    $(".backflyer").append(_bfcontainer);
                    var _bfimgw = $(document).width() / 4;
                    $.each(data.links, function (idx, item) {
                        _bfcontainer.append("<div class=\"app\"><a target=\"_blank\" href=\"" + item.url + "\"><div><img src=\"" + item.image + "\" /></div><div class=\"title\">" + item.title + "</div><div class=\"price\">Free</div></a></div>");
                    });
                    _bfcontainer.find("a").on("click", function () {
                        var BFClicksTracking = Parse.Object.extend("BFClicksTracking");
                        var _bfTracking = new BFClicksTracking();
                        _bfTracking.save({ Url: $(this).attr("href"), Name: $(this).find("div.title").html(), OS: _bfos[0], Date: getDateString() });
                    });
                    $(".backflyer").backflyer('show').on('hidden.bs.backflyer', function () { history.back(); });
                }
            });
        });
    }, 100);
}
if (_bfos != null && history && (_bfIsGoogle || _bfOtherRef || !_bfHasRef)) {
    if (typeof jQuery !== "undefined" && typeof Parse !== "undefined") {
        attachBackflyer();
    } else if (typeof Parse === "undefined") {
        loadScript("http://www.davai.com.br/backflyer/js/parse-1.2.8.min.js", function () {
            // Initialize Parse
            Parse.initialize("UTX0Xj82WZK0VmwvZAakKajCKK6PnygF2VTcviwF", "BhwbUzLFpKUiqF9BWwLvbbGFbXTmCqZnBcuQy7Px");
            loadScript("http://www.davai.com.br/backflyer/js/jquery.js", attachBackflyer);
        });
    } else {
        Parse.initialize("UTX0Xj82WZK0VmwvZAakKajCKK6PnygF2VTcviwF", "BhwbUzLFpKUiqF9BWwLvbbGFbXTmCqZnBcuQy7Px");
        loadScript("http://www.davai.com.br/backflyer/js/jquery.js", attachBackflyer);
    }
}