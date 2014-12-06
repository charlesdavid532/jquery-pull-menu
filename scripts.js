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
                    this._removeBigImage(this._isDifferentRow(this.previousImage, currentImageNo, $currentTarget));
                    this._onRemoveAnimationComplete();
                } else {
                    this._closeCurrentImage();
                }
            },
            /**
            * Returns the big image div
            * @method _getBigImageDiv
            * @public
            */
            _getBigImageDiv: function _getBigImageDiv() {
                var $bigImage = $('<div  id="big-image-container" class="big-image-container"><div id="arrow-container" class="arrow-container"></div><div id="big-image-header" class="big-image-header color-0"><div id="big-image-close-button" class="big-image-close-button"></div><div id="big-image-title" class="big-image-title">TITLE</div><div id="big-image-sub-heading" class="big-image-sub-heading">SUB HEADING</div></div><div id="big-image-footer" class="big-image-footer"><div id="big-image-footer-text-container" class="big-image-footer-text-container"><div id="big-image-footer-text-0" class="big-image-footer-text-0">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div><div id="big-image-footer-text-1" class="big-image-footer-text-1">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div><div id="big-image-footer-text-2" class="big-image-footer-text-2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div><div id="big-image-footer-text-3" class="big-image-footer-text-3">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div></div><div id="big-image-footer-thumbnail-container" class="big-image-footer-thumbnail-container"><div id="big-image-footer-thumbnail-0" class="big-image-footer-thumbnail-0 thumbnail">A</div><div id="big-image-footer-thumbnail-1" class="big-image-footer-thumbnail-1 thumbnail">B</div><div id="big-image-footer-thumbnail-2" class="big-image-footer-thumbnail-2 thumbnail">C</div><div id="big-image-footer-thumbnail-3" class="big-image-footer-thumbnail-3 thumbnail">D</div></div></div></div>');
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
                var screenHeight = window.innerHeight,
                    currentScrollTop = $(document).scrollTop(),
                    $currentTarget = this.currentImage,
                    imageTop = $currentTarget.position().top,
                    imageHeight = $currentTarget.height(),
                    bigImageHeight = JqueryImageGalleryView.BIG_IMAGE_HEIGHT,
                    previousImageScrollTop = 0,
                    isDifferentRow = this._isDifferentRow(this.previousImage, imageNo, this.currentImage);

                // Check to see if there was a previous image and then reduce that from the scroll top
                if (this.previousImage !== null && this.previousImage !== undefined &&
                    this.previousImage < imageNo && isDifferentRow) {
                    previousImageScrollTop = 660;
                }

                // Checking if same row then animate remove and then add
                if (isDifferentRow === false && this.previousImage !== null && this.previousImage !== undefined) {
                    $('html, body').animate({
                        scrollTop: imageTop - 40 + imageHeight - previousImageScrollTop
                    }, 1000);

                    $('.big-image-container').remove();

                    imageDiv.insertAfter($('.image-container-' + imageNo));
                } else {

                    imageDiv.insertAfter($('.image-container-' + imageNo));
                    // Animating the scroll
                    $('html, body').animate({
                        scrollTop: imageTop - 40 + imageHeight - previousImageScrollTop
                    }, 1000);
                }
                console.log('started adding');
                if ((((imageTop + imageHeight + bigImageHeight + 10) > (currentScrollTop + screenHeight)) ||
                    this._isDifferentRow(this.previousImage, imageNo, this.currentImage) === false)
                    && (this.previousImage !== null && this.previousImage !== undefined)) {
                    // Not animating the div
                    $('.big-image-container').css('height', '660px');
                    // TODO:: Should add a check here to see if the previous image is not visible I can animate
                } else {
                    // Animating the div
                    $('.big-image-container').css({ 'height': '0px' }).animate({ 'height': '660px' }, 1000, function () {
                        //  $(window).scrollTop($(this).offset().top);
                        console.log('added');

                    });
                }
                // Is scrolling to that div necessary....yes
                // Animation needs to be smoother...also refer the urls

            },
            /**
            * Removes the big image
            * @method _removeBigImage
            * @param bNeedAnimation{Boolean} If animation is required
            * @private
            */
            _removeBigImage: function _removeBigImage(bNeedAnimation) {
                var $bigImageContainer = $('.big-image-container');

                if (bNeedAnimation === true) {
                    $bigImageContainer.animate({ 'height': '0px' }, 1000, function () {
                        console.log('removed');
                        $(this).remove();
                    });
                } else {
                    // This removal is taking place inside the add function
                    //$bigImageContainer.remove();
                }
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
                    imagesInARow = Math.round(parentContainerWidth / imageWidth);

                currentImageNo = parseInt($currentTarget.attr('id').slice(16, 17));
                this._appendImageAfter($bigImageDiv, (currentImageNo + imagesInARow - (currentImageNo % imagesInARow) - 1));
                this._setArrowPosition(currentImageNo % imagesInARow);
                this.previousImage = currentImageNo;
                // bind events on the big image
                this._bindBigImageEvents();
            },
            /**
            * Binds the events on the big image
            * @method _bindBigImageEvents
            * @private
            */
            _bindBigImageEvents: function _bindBigImageEvents() {
                $('.big-image-close-button').on('click', $.proxy(this._closeCurrentImage, this));
                $('.thumbnail').on('click', $.proxy(this._onThumbnailClicked, this));
            },
            /**
            * Changes the background image of the header based on which thumbnail was clicked
            * @method _onThumbnailClicked
            * @private
            */
            _onThumbnailClicked: function _onThumbnailClicked(event) {
                var $currentTarget = $(event.currentTarget),
                    currentThumbnailNo;

                currentThumbnailNo = parseInt($currentTarget.attr('id').slice(27, 28));
                this._removeThumbnailClasses();
                $('.big-image-header').addClass('color-' + currentThumbnailNo);
            },
            /**
            * Removes all the thumbail classes from the big image header
            * @method _closeCurrentImage
            * @private
            */
            _removeThumbnailClasses: function _removeThumbnailClasses() {
                $('.big-image-header').removeClass('color-0')
                                      .removeClass('color-1')
                                      .removeClass('color-2')
                                      .removeClass('color-3');
            },
            /**
            * Closes the current image
            * @method _closeCurrentImage
            * @private
            */
            _closeCurrentImage: function _closeCurrentImage() {
                this._removeBigImage(true);
                this.previousImage = null;
            },
            /**
            * Sets the appropriate position of the arrow
            * @method _setArrowPosition
            * @param classNo{Number} The class no
            * @private
            */
            _setArrowPosition: function _setArrowPosition(classNo) {
                this._removeArrowPositionClasses();
                $('.arrow-container').addClass('left-' + classNo);
            },
            /**
            * Removes all the position classes from the arrow
            * @method _removeArrowPositionClasses
            * @private
            */
            _removeArrowPositionClasses: function _removeArrowPositionClasses() {
                $('.arrow-container').removeClass('left-0')
                                      .removeClass('left-1')
                                      .removeClass('left-2');
            },
            /**
            * Returns whether the 2 images are on different rows or not
            * @method _isDifferentRow
            * @private
            */
            _isDifferentRow: function _isDifferentRow(image1, image2, $currentTarget) {
                var imageWidth = $currentTarget.width(),
                    parentContainerWidth = $currentTarget.parent().width(),
                    imagesInARow = Math.round(parentContainerWidth / imageWidth);

                if (Math.floor(image1 / imagesInARow) === Math.floor(image2 / imagesInARow)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    })();
    JqueryImageGalleryView.REMOVE_ANIMATION_COMPLETE = 'remove-animation-complete';
    JqueryImageGalleryView.BIG_IMAGE_HEIGHT = 660;
    JqueryImageGalleryView.render();
});