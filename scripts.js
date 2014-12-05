$(function () {
    

    function render() {
        _bindEvents();
    }

    function _bindEvents() {
        $('.image-container').on('click', _onImageClick);
    }

    function _onImageClick(event) {
        console.log('image clicked');
        var $a = _getBigImageDiv();
    }

    function _getBigImageDiv() {
        var $bigImage = $('<div  id="big-image-container" class="big-image-container"></div>');
        return $bigImage;
    }

    render();
});