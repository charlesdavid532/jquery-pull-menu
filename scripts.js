$(function () {
    /**
    * Main view of the Jquery image gallery. Mainly appends and destroys the big image apart from binding various events
    * @class JqueryImageGalleryView
    * @constructor
    * @public
    */
    var JqueryImageGalleryView = (function () {
        return {
            /**
            * Stores which image was previously clicked. (To remove the big image)
            * @property previousImage
            * @type Number
            * @default null
            */
            previousImage: null,
            /**
            * Stores which image no was currently clicked. (To add the big image)
            * @property currentImageNo
            * @type Number
            * @default null
            */
            currentImageNo: null,
            /**
            * Stores which image was currently clicked. (To add the big image)
            * @property currentImage
            * @type Number
            * @default null
            */
            currentImage: null,
            /**
            * Renders the view. Should be main entry point Can be replaced by a constructorhttp://localhost:59845/jquery-pull-menu
            * @method render
            * @public
            */
            render: function render() {
                this._bindEvents();
            },
            /**
            * Binds the events on the main images (Not the big image)
            * @method _bindEvents
            * @private
            */
            _bindEvents: function _bindEvents() {
                $('.image-container').on('click', $.proxy(this._onImageClick, this));
                // $(document).on(JqueryImageGalleryView.REMOVE_ANIMATION_COMPLETE, $.proxy(this._onRemoveAnimationComplete, this));
            },
            /**
            * Handles the click event of the image
            * @method _onImageClick
            * @param event{Object} The event object
            * @private
            */
            _onImageClick: function _onImageClick(event) {
                console.log('image clicked');

                this._appendBigImageDiv(event);
            },
            /**
            * Appends the big image div at appropriate location
            * @method _appendBigImageDiv
            * @private
            */
            _appendBigImageDiv: function _appendBigImageDiv(event) {
                var $currentTarget = $(event.currentTarget),
                    currentImageNo;

                currentImageNo = parseInt($currentTarget.attr('id').slice(16, 17));
                this.currentImage = $currentTarget;
                console.log('current image is:' + currentImageNo);

                // removing the previous big container
                if (this.previousImage !== currentImageNo) {
                    this._removeBigImage();
                    this._onRemoveAnimationComplete();
                }
            },
            /**
            * Returns the big image div
            * @method _getBigImageDiv
            * @public
            */
            _getBigImageDiv: function _getBigImageDiv() {
                var $bigImage = $('<div  id="big-image-container" class="big-image-container"></div>');
                return $bigImage;
            },
            /**
            * Appends the big div after the specified div no
            * @method _appendImageAfter
            * @param imageDiv {Object} The div to append
            * @param imageNo {Number} The image no after which the specified div is to be appended
            * @public
            */
            _appendImageAfter: function _appendImageAfter(imageDiv, imageNo) {
                var screenHeight = screen.height,
                    currentScrollTop = $(document).scrollTop(),
                    $currentTarget = this.currentImage,
                    imageTop = $currentTarget.position().top,
                    imageHeight = $currentTarget.height(),
                    bigImageHeight = JqueryImageGalleryView.BIG_IMAGE_HEIGHT;


                imageDiv.insertAfter($('.image-container-' + imageNo));
                if ((imageTop + imageHeight + bigImageHeight + 10) > (currentScrollTop + screenHeight)) {
                    $('.big-image-container').css('height', '660px')
                    $('html, body').animate({
                        scrollTop: imageTop - 40 + imageHeight
                    }, 1000);
                } else {
                    $('.big-image-container').css('height', '0px').animate({ 'height': '660px' }, 1000, function () {
                        //  $(window).scrollTop($(this).offset().top);

                    });
                }
                // Is scrolling to that div necessary....yes
                // Animation needs to be smoother...also refer the urls

            },
            /**
            * Removes the big image
            * @method _removeBigImage
            * @private
            */
            _removeBigImage: function _removeBigImage() {
                var $bigImageContainer = $('.big-image-container');
                /*
                if ($bigImageContainer.length !== 0) {
                $bigImageContainer.animate({ 'height': '0px' }, 1000, function () {
                $(document).trigger(JqueryImageGalleryView.REMOVE_ANIMATION_COMPLETE);
                $(this).remove();
                });
                } else {
                $(document).trigger(JqueryImageGalleryView.REMOVE_ANIMATION_COMPLETE);
                }
                */
                //$bigImageContainer.animate({ 'height': '0px' }, 1000, function () {
                //  $(this).remove();
                //});
                $bigImageContainer.remove();
            },
            /**
            * Handles the event of remove animation complete
            * @method _onRemoveAnimationComplete
            * @private
            */
            _onRemoveAnimationComplete: function _onRemoveAnimationComplete(event) {
                var $bigImageDiv = this._getBigImageDiv(),
                    $currentTarget = this.currentImage,
                    currentImageNo, imageWidth = $currentTarget.width(),
                    parentContainerWidth = $currentTarget.parent().width(),
                    imagesInARow = parentContainerWidth / imageWidth;

                currentImageNo = parseInt($currentTarget.attr('id').slice(16, 17));
                this._appendImageAfter($bigImageDiv, (currentImageNo + imagesInARow - (currentImageNo % imagesInARow) - 1));
                this.previousImage = currentImageNo;
                // bind events on the big image
            }
        }
    })();
    JqueryImageGalleryView.REMOVE_ANIMATION_COMPLETE = 'remove-animation-complete';
    JqueryImageGalleryView.BIG_IMAGE_HEIGHT = 660;
    JqueryImageGalleryView.render();
});