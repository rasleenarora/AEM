var BCLSPSCRIPT = ( function (window, brightcove) {
    var p1,p2;
if (window.location.protocol === 'https:') {
    p1 = document.createElement('param');
    p1.setAttribute('name', 'secureConnections');
    p1.setAttribute('value', 'true');
    p2 = document.createElement('param');
    p2.setAttribute('name', 'secureHTMLConnections');
    p2.setAttribute('value', 'true');
    var players = document.querySelectorAll('object.BrightcoveExperience');
    Array.prototype.forEach.call(players, function(player) {
        player.appendChild(p1);
        player.appendChild(p2);
    });
    brightcove.createExperiences();
}
return;
})(window, brightcove);
