module.exports = {createAvatarHead}

function createAvatarHead (avatarData, uuid) {
  // Get autogenerated Vue scoped style 'data-v-' attribute
  var scopedStyleAttribute = "";
  var attributes = document.getElementsByClassName("character-sprites")[0].attributes
  for (var i = attributes.length - 1; i >= 0; i--) {
    if (attributes[i].name.startsWith("data-v-")) {
      scopedStyleAttribute = attributes[i].name;
      break;
    }
  }
  
  if (!avatarData || !avatarData["items"] || !avatarData["preferences"]) {
    uuid = DOMPurify.sanitize(uuid)
    return '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox user-not-found">' +
              '<div class="character-sprites">' +
              '</div>' +
            '</div></a>';
  }
  if (avatarData['stats']['buffs']) {
    if (avatarData['stats']['buffs']['seafoam']) {
      return '' +
      '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox">' +
        '<div class="character-sprites">' +
          '<span class="seafoam_star" ' + scopedStyleAttribute + '>' +
        '</div>' +
      '</div></a>';
    } else if (avatarData['stats']['buffs']['shinySeed']) {
      return '' +
      '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox">' +
        '<div class="character-sprites">' +
          '<span class="avatar_floral_' + DOMPurify.sanitize(avatarData['stats']['class']) + '" ' + scopedStyleAttribute + '>' +
        '</div>' +
      '</div></a>';
    } else if (avatarData['stats']['buffs']['snowball']) {
      return '' +
      '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox">' +
        '<div class="character-sprites">' +
          '<span class="snowman" ' + scopedStyleAttribute + '>' +
        '</div>' +
      '</div></a>';
    } else if (avatarData['stats']['buffs']['spookySparkles']) {
      return '' +
      '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox">' +
        '<div class="character-sprites">' +
          '<span class="ghost" ' + scopedStyleAttribute + '>' +
        '</div>' +
      '</div></a>';
    }
  }
  var gearType = avatarData["preferences"]["costume"] ? 'costume' : 'equipped';
  var gear = avatarData["items"]["gear"][gearType];
  var hairColor = '_' + avatarData["preferences"]["hair"]["color"];
  var sleepClass = avatarData["preferences"]["sleep"] ? 'skin_' + avatarData["preferences"]["skin"] + '_sleep' : 'skin_' + avatarData["preferences"]["skin"];
  return '' +
  '<a href="/profile/' + DOMPurify.sanitize(uuid ) + '" target="_blank"><div class="herobox">' +
      '<div class="character-sprites">' +
        '<span class="chair_' + DOMPurify.sanitize(avatarData["preferences"].chair ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(gear.back ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(sleepClass ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(avatarData["preferences"].size ) + '_shirt_' + DOMPurify.sanitize(avatarData["preferences"].shirt ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(avatarData["preferences"].size ) + '_' + DOMPurify.sanitize(gear.armor) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(gear.back ) + '_collar' + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(gear.body ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="head_' + DOMPurify.sanitize(avatarData["preferences"].head ) +'" ' + scopedStyleAttribute + '></span>' +
        '<span class="hair_base_' + DOMPurify.sanitize(avatarData["preferences"].hair.base + hairColor ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="hair_bangs_' + DOMPurify.sanitize(avatarData["preferences"].hair.bangs + hairColor ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="hair_mustache_' + DOMPurify.sanitize(avatarData["preferences"].hair.mustache + hairColor ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="hair_beard_' + DOMPurify.sanitize(avatarData["preferences"].hair.beard + hairColor ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(gear.eyewear ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(gear.head ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(gear.headAccessory ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="hair_flower_' + DOMPurify.sanitize(avatarData['preferences']['hair']['flower'] ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(gear.shield ) + '" ' + scopedStyleAttribute + '></span>' +
        '<span class="' + DOMPurify.sanitize(gear.weapon ) + '" ' + scopedStyleAttribute + '></span>' +
      '</div>' +
    '</div></a>';
}