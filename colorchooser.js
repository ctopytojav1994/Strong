var red = 127
var green = 15
var blue = 99
// Primary state
var hue = 0
var sat = 100
var light = 50
// Derived state
var red = null
var green = null
var blue = null

function updateSwatch() {
    $("#swatch")[0].style["background-color"] =
        "rgb(" + red + "," + green + "," + blue + ")"
    const rgbVec = hslToRgb(hue, sat, light)
    red   = rgbVec[0]
    green = rgbVec[1]
    blue  = rgbVec[2]
    const rgb = "rgb(" + red + "," + green + "," + blue + ")"
    $("#swatch")[0].style["background-color"] = rgb
    $("#rgboutput").text(rgb)
    $("#red").val(red) // update text box
    $("#redslider").val(red)  // update slider
    $("#hueslider").val(hue)
    $("#green").val(green)
    $("#greenslider").val(green)
    $("#green").val(blue)
    $("#blueslider").val(blue)

}

$(function(){
    console.log("READY")
    updateSwatch() // Initialize everything to global state
    $("#redslider").bind('input', function(){
        console.log("SLIDER to", $(this).val())
        red = $(this).val()
        // Switch to primary repr
        hsl = rgbToHsl(red, green, blue)
        console.log("SLIDER", hsl)
        hue = hsl[0]
        sat = hsl[1]
        light = hsl[2]
        updateSwatch()
    })

       $("#greenslider").bind('input', function(){
        console.log("SLIDER to", $(this).val())
        green = $(this).val()
        // Switch to primary repr
        hsl = rgbToHsl(red, green, blue)
        console.log("SLIDER", hsl)
        hue = hsl[0]
        sat = hsl[1]
        light = hsl[2]
        updateSwatch()
    })
           $("#blueslider").bind('input', function(){
        console.log("SLIDER to", $(this).val())
        blue = $(this).val()
        // Switch to primary repr
        hsl = rgbToHsl(red, green, blue)
        console.log("SLIDER", hsl)
        hue = hsl[0]
        sat = hsl[1]
        light = hsl[2]
        updateSwatch()
    })



    $("#red").keyup(function() {
        red = $(this).val()
        updateSwatch()
    })
    $("#hueslider").bind('input', function(){
        hue = $(this).val()
        updateSwatch()
     })
    $("#satslider").bind('input', function(){
        sat = $(this).val()
        updateSwatch()
         })
    $("#lightslider").bind('input', function(){
        light = $(this).val()
        updateSwatch()
    })

    $("#green").keyup(function() {
        green = $(this).val()
        updateSwatch()
        })
    $("#blue").keyup(function() {
        blue = $(this).val()
        updateSwatch()
         })
     })

// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
// but I modified it to expect the range 0-360 for hue, and 0-100 for
// sat and lightness.
function hslToRgb(h, s, l){
    var r, g, b;

    h /= 360    // Convert to decimals
    s /= 100
    l /= 100

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
// Assumes 0-255 range, returns vector of 0-1.
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}
