README
======

To Run:
-------
Open the index.html file in this directory

To Deploy/Migrate:
------------------
For portability, can copy just these files:

index.html => index.html
mysprites.js => mysprites.js
assets/daffy.png => assets/daffy.png

For reviewing code, use the mysprites-forReadingOnly.js as it is not
compiled or compressed and is formatting using the Javascript coding
guidelines.



SpriteSheet Source(s):
----------------------
Daffy SpriteSheet downloaded from Spriters-resource at:
http://www.spriters-resource.com/genesis/ddinhollywood/daffy.png

Downloaded Sprite-Clipper from:
http://fluffynukeit.com/software/sprite-clipper

and used Sprite-Clipper to choose the first standing position AND 
all of the walking frames in the given direction (right-facing).  Then,
flipped the image and added the same frames (left-facing now).  All frames
were resized to align the bottom center of each sprite to ensure similar
sizes.  Saved all these frames as individual png images.

Downloaded Texture-Packer from:
http://code-and-web.de/downloads/texturepacker/2.3.5/TexturePacker-2.3.5.2907.dmg

and used Texture-Packer to take all the individual png images from Sprite-
Clipper to create a final sprite sheet of 36 sprites and its corresponding
JSON file.

From there, ran the lime.js method of generating the js file for the sprite
sheet:

bin/lime.py gensoy mysprites/assets/daffy.json

Files were then included in the assets directory & appropriate JS files
for use by the program.

Code was inspired by the example provided in the lime.js demos for "frame4.js".
