/* photobooth-plugin.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define([
        'aloha',
        'jquery',
        'aloha/plugin',
        'ui/ui',
        'ui/toggleButton',
        'ui/button',
        'ui/scopes',
        'photobooth/photobooth_min'
], function (
    Aloha,
    jQuery,
    Plugin,
    Ui,
    ToggleButton,
    Button,
    Scopes) {
    'use strict';
    var GENTICS = window.GENTICS;

    /**
     * register the plugin with unique name
     */
    return Plugin.create('photobooth', {
        /**
         * default button configuration
         */
        config: ['photobooth'],

        /**
         * Initialize the plugin and set initialize flag on true
         */
        init: function () {
            this.createButtons();
            this.subscribeEvents();
            this.bindInteractions();
        },

        /**
         * Initialize the buttons
         */
        createButtons: function () {
            var me = this;

            this._photoboothButton = Ui.adopt("photobooth", Button, {
                tooltip: "Add an image via webcam",
                icon: "aloha-icon aloha-icon-photobooth",
                scope: 'Aloha.continuoustext',
                click: function () {
                    me.photobooth();
                }
            });
        },

        /**
         * Parse a all editables for abbreviations
         * Add the abbr shortcut to all edtiables
         */
        bindInteractions: function () {
            var me = this;
        },

        subscribeEvents: function () {
            var me = this;
            var editableConfig = {};

            Aloha.bind('aloha-editable-activated', function () {
                if (!Aloha.activeEditable || !Aloha.activeEditable.obj) {
                    return;
                }

                var config = me.getEditableConfig(Aloha.activeEditable.obj);
                editableConfig[
                    Aloha.activeEditable.getId()] = jQuery.inArray('photobooth', config) !== -1;
            });
        },

        /**
         * Open the photobooth modal
         */
        photobooth: function () {
            if (Aloha.activeEditable) {
                this.insertPhotoboothImage();
            }
        },

        /**
         * Insert a image via webcam
         */
        insertPhotoboothImage: function (extendToWord) {

            // hack for now; jquery ui messes up photobooth container
            if ($('#photobooth-camera').hasClass('ui-dialog-content')) {
                $('#photobooth-camera').closest('.ui-dialog').remove();
                $('#photobooth-camera').remove();
            }

            if (!$('#photobooth-camera').html()) {
                var photoboothCamera = jQuery('<div id="photobooth-camera"></div>');
                $('body').append(photoboothCamera);
            }

            var range = Aloha.Selection.getRangeObject();
            var newPhotoboothImage = jQuery('<div class="photobooth-image"></div>');
            GENTICS.Utils.Dom.insertIntoDOM(newPhotoboothImage, range, jQuery(Aloha.activeEditable.obj));

            $('.aloha-ui-toolbar').hide();

            $('#photobooth-camera').photobooth().on("image", function (event, dataUrl) {
                newPhotoboothImage.show().html('<img src="' + dataUrl + '" >');
                //$('.photobooth-image').alohaBlock();
                $('#photobooth-camera').dialog("close");
            }).dialog({
                height: 545,
                width: 760,
                close: function (event, ui) {
                    $('.aloha-ui-toolbar').show();
                }
            });

        },

        /**
         * Make the given jQuery object (representing an editable) clean for saving
         * Find all abbrs and remove editing objects
         * @param obj jQuery object to make clean
         * @return void
         */
        makeClean: function (obj) {
            // nothing to do...
        },

        /**
         * toString method
         * @return string
         */
        toString: function () {
            return 'photobooth';
        }

    });

});