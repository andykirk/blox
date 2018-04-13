Blox
====

This is an idea for a sort super-editor. 'Super' as in 'Super-set' not 'Super-duper'.

Warning
-------

This is intended to be a prototype / proof-of-concept. It's **NOT READY FOR PRODUCTION!**
My modern JS skills are very poor - it's an area where there's so much to learn, but I don't have time to commit to learning it, so this prototype will be very old-school. Who knows, if it ever took off, others would be able to modernise it.

Premise
-------

The basic premise of this code is that, like other editors, it should attach to a specified textarea, hiding that textarea and providing a solid interface for creating and editing blocks of content. The whole concept is not unlike WordPress's new Gutenberg editor, and I daresay like others out there, so what I'm aiming for isn't totally original or anything.

Blox
----

Content blocks (or 'blox') could be anything. Most common would be a text block which would load a WYSIWYG editor and act much like you'd expect an editor to act. If you all have is one text block, then there's really no difference to the plethora of editors out there. The difference comes when you add another block. Ok, so if you add another text block, nothing's really changed, but why would you do that?
The next block could be an image, a YouTUbe video, a CodePen, and graph or chart or anything that's been written and made available as a plugin.

The main point of this is that we're not relying on our poor, overstretched WYSIWYG editor to provide _all_ the functionality we need; let the WYSIWYG's handle text, that's what they're good at, and let other, self-contained plugins handle to other stuff.
The other advantage, of course, is you can choose all the bits of functionality you need without bloating your code or making compromises.

Panels and Containers
---------------------

Right, so you don't actually add blocks directly to each other - each block must live in a panel which lives in a container.
The advantage of this approach is that you can configure the sorts of containers you want available, reducing clutter.

Containers are always full-width and contain a number of panels. There's a 100 wide panel, and then there's a 50/50 one, and 33/33/33 etc. The plan, ultimately, is to allow panels to be merged (and unmerged) to allow for things like 33/66 splits.

There are also two special panels that don't live inside containers that float left or right and you can set the default width of those.

This is just a layout tool, but it's not built into any WYSIWYG - that's the beauty of it.

So, you place a block a panel. That's it. The panels don't care about the blocks, and the blocks don't care about the panels. They're handled separately, which should make this much easier to maintain and grow.

User Generate Content (UGC)
---------------------------

By the way, I should mention that this editor is meant for UGC. That is, content submitted by users, like in Content Management System (CMS). It's not meant to provide infinite tools to create things like product pages, landing pages, hero banners or any of that stuff. This about what tools you provide to your users for the content they have responsibility for.
The idea is that is editor will be integrated into a CMS and not a complete solution all by itself.

Output
------

So this editor doesn't take much responsibility for how your content looks when loaded into one of your pages. I'll be providing simple, clean stylesheet you can use a starting point or as guidance, but you can style anything how you like.

For example, take a container with 4 panels. In order to be responsive, at some breakpoint they should drop to a single column, but that breakpoint should be yours to choose, based on a whole range of considerations.
Also, you may decide it's appropriate for there to be an interim stage of 2x2 panels. Again, that's up to you.
