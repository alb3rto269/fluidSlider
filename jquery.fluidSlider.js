/**
 * Plugin Name: fluidSlider
 * Plugin URI: https://github.com/alb3rto/fluidSlider
 * Description: A simple slider based in fluid boxes and percentage widths.
 * Version: 0.1
 * Author: Alberto Sanchez
 * Author https://twitter.com/alb3rto269
 * License: The MIT License (MIT)
 */


/* global jQuery: true */
;(function($, window, document, undefined) {
    'use strict';

    var defaults = {
        delay: 5000,            // time between slides in milliseconds
        autoPlay: false,        // start the on initialization
        nav:  ''                // selector or object with nav link
    };

    function FluidSlider(element, options) {
        this.element = element;
        this.$el = $(element);
        this._defaults = defaults;
        this._name = 'fluidSlider';

        this.options = $.extend({}, defaults, {
            'delay': this.$el.data('delay'),
            'autoPlay': this.$el.data('autoPlay')
        }, options);

        this.init();
    }

    FluidSlider.prototype = {
        init: function() {
            this.$list = this.$el.find('ul');
            this.$items = this.$list.children();
            this.size = this.$items.length;

            if(!this.size)
                return;

            // set elements dimentions according the list size
            this.$el.addClass('fluidSlider');
            this.$list.css({
                'visibilily': 'visible', // ? why
                'width': 100 * this.size + '%'
            });
            this.$items.css('width', 100/this.size + '%');

            // init slider nav links
            this.initNav();

            if(this.options.autoPlay)
                this.start();

        },
        start: function(){
            // begins the slides "loop"
            if(typeof this.current == 'undefined')
                this.current = 0;

            this.play = true;
            this._schedule();
        },
        stop: function(){
            // stop the slides "loop"
            this.play = false;
            this._clearSchedule();
        },
        index: function(newIndex){
            // Getter & setter for ``current`` property
            if(typeof newIndex === 'undefined')
                return this.current;

            if(this.current == newIndex)
                return;

            // normalize the index before assignement
            this.current = newIndex % (this.size + 1);
            this._slide();
        },
        prev: function(){
            // Decrease the current index
            var current = this.index() || this.size;
            this.index(current - 1);
        },
        next: function(){
            // Increase the current index
            var current = this.index();
            this.index(current + 1);
        },
        destroy: function(){
            // Remove elements, remove data, unregister listerners, etc
            this._clearSchedule();
            this.$el.off('.fluidSlider');
            this.$el.removeData();
        },

        _slide: function(){
            // 1. prevent multiple slides
            this._clearSchedule();

            // 2. preform the slide animation
            this._animate(this.current);

            // 3. Schedule the next transition (only if required).
            if(this.play && this.current != this.size){
                this._schedule();
            }
        },
        _schedule: function(){
            // 3. Get the exposure time of the current item and
            //    set the appropiate timeout
            var delay = $(this.$items[this.current]).data('delay') || this.options.delay;
            this._sliderProgram = setTimeout($.proxy(this.next, this), delay);
        },
        _clearSchedule: function(){
            // Clear scheduled transitions
            clearTimeout(this._sliderProgram);
        },
        _animate: function(index){
            // Performs the transition between the current slide and the next one.
            var self = this,
                callback;

            // if the end of the list is reached, restart the slides loop
            if(index == this.size){
                callback = function(){
                    self._reset();
                    self.index(0);
                };
            }

            // Performs the slide (animating the margin left of the list).
            this.$list.animate({'margin-left': -100 * index + '%'}, {
                duration: 'slow',
                // progress: self._slideStep,
                complete: callback,
                done: function(){
                    self._updateNav(index);
                    self.$el.trigger('updated.fluidSlider', { value: index});
                }
            });
        },

        _slideStep: function(promise, progress){
            $(promise.elem).css('opacity', Math.abs(0.5-progress)*2);
        },
        _reset: function(){
            // Prepare the slider to show the first slide again
            this.$list
                .css('visibility', 'hidden')
                .css('margin-left', '100%')
                .css('visibility', 'visible');
        },

        /* Nav control functions */
        initNav: function(){
            if(typeof this.options.nav == 'string' || this.options.nav instanceof Element)
                this.$navItems = $(this.options.nav).children();
            else if(this.options.nav instanceof jQuery)
                this.$navItems = this.options.nav.children();


            if(!(this.$navSize = this.$navItems.length))
                return;

            $.each(this.$navItems, function(i, item){
                $(item).data('fluidSlider.Nav-index', i);
            });

            this.$navItems.on('click', $.proxy(this._clickNav, this));
        },
        _clickNav: function(e){
            e.preventDefault();

            // prevent next slide event
            this._clearSchedule();

            // navigate to the desired index
            var index = $(e.currentTarget).data('fluidSlider.Nav-index');
            this.index(index);
        },
        _updateNav: function(index){
            // highlight the navItem related to teh current slide
            if(index < this.$navSize){
                this.$navItems.find('a.is-active').removeClass('is-active');
                $(this.$navItems[index]).find('a').addClass('is-active');
            }
        }

    };


    $.fn.fluidSlider = function(option) {
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this),
                data = $.data(this, 'plugin_fluidSlider'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('plugin_fluidSlider', (data = new FluidSlider(this, options)));
            }

            if (typeof option === 'string' && options.length && options[0] != '_') {
                result = data[option].apply(data, Array.prototype.slice.call(args, 1));
            }
        });

        return typeof result === 'undefined' ? this : result;
    };
})(jQuery, window, document);
