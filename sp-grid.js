(function(document) {
    var columnCount = 12, // Columns count int
        columnCoefficient = 100 / columnCount, // Columns coefficient float
        spaceSizes = [0, 2, 5, 10, 20, 30, 40, 50, 60, 80], // Margin & padding sizes
        mediaSizes = [0, 1279, 1023, 959, 767, 479, 319], // Screen media sizes
        mediaCount = (mediaSizes.length - 1); // Screen media count

    function css(selector, options, important) {
        var str = selector + '{';
        for (var k in options) {
            str += k + ':' + options[k] + ((important) ? ' !important' : '') + ';';
        }
        str += '}';

        return str;
    }

    function cssSpaceModeProperty(k, p, q, l) {
        var o = {}, v = spaceSizes[k];

        if (l) {
            for (var j in l) {
                o[q + '-' + l[j]] = v + 'px';
            }
        } else {
            o[q] = v + 'px';
        }

        return css('.' + p + v, o, !0);
    }

    function cssSpaceProperty(p, q) {
        var r = '';
        for (var k in spaceSizes) {
            r += cssSpaceModeProperty(k, p, q) +

                cssSpaceModeProperty(k, p + 'h', q, ['left', 'right']) +
                cssSpaceModeProperty(k, p + 'v', q, ['top', 'bottom']) +

                cssSpaceModeProperty(k, p + 't', q, ['top']) +
                cssSpaceModeProperty(k, p + 'r', q, ['right']) +
                cssSpaceModeProperty(k, p + 'b', q, ['bottom']) +
                cssSpaceModeProperty(k, p + 'l', q, ['left']);
        }
        return r;
    }

    function sizeToString(s) {
        s = parseInt(s);

        return (s) ? 's' + s : '';
    }

    function cssGrids(s) {
        var r = '', i;

        s = sizeToString(s);

        for (i = 1; i <= columnCount; i++) {
            r += css('.' + s + 'g' + i, {width: i * columnCoefficient + '%'});
        }
        return r;
    }

    function cssFloat(s) {
        s = sizeToString(s);

        return css('.' + s + 'fN', {float: 'left'}) +
            css('.' + s + 'fL', {float: 'left'}) +
            css('.' + s + 'fL', {float: 'left'});
    }

    function cssTextAlign(s) {
        s = sizeToString(s);

        return css('.' + s + 'tC', {'text-align': 'center'}) +
            css('.' + s + 'tJ', {'text-align': 'justify'}) +
            css('.' + s + 'tL', {'text-align': 'left'}) +
            css('.' + s + 'tR', {'text-align': 'right'});
    }

    function cssSpace(s) {
        s = sizeToString(s);

        return cssSpaceProperty(s + 'p', 'padding') +
            cssSpaceProperty(s + 'm', 'margin');
    }

    function selectorGrids() {
        var r = '', p = '', i;

        for (i = 1; i <= columnCount; i++) {
            r += p + '.g' + i;
            p = ',';
        }

        return r;
    }

    function selectorMediaSizes() {
        var r = '', p = '', i;

        for (i = 1; i <= mediaCount; i++) {
            r += p + '.s' + i;
            p = ',';
        }

        return r;
    }

    var s = css(selectorGrids(), {
            display: 'block',
            float: 'left',
            position: 'relative'
        }) +
        css(selectorMediaSizes(), {display: 'none'}) +
        cssGrids() +
        cssFloat() +
        cssTextAlign() +
        cssSpace();

    for (var i = 1; i <= mediaCount; i++) {
        s += '@media screen and (max-width:' + mediaSizes[i] + 'px) {' +
            css('.s' + i, {display: 'inherit'}) +
            css('.s' + i + 'H', {display: 'none'}) +
            cssGrids(i) +
            cssFloat(i) +
            cssTextAlign(i) +

            cssSpace(i) +
            '}';
    }

    var f = document.createElement('link');
    f.href = 'data:text/css;base64,' + btoa(s);
    f.rel = 'stylesheet';
    f.type = 'text/css';
    f.media = 'screen';

    var w = document.getElementById('sp-grids');
    w.parentNode.insertBefore(f, w);
})(document);