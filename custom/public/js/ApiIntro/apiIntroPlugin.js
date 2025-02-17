import { Plugin, PluginButton } from 'myWorld-client';
import { renderReactNode } from 'myWorld-client/react';
import apiIntroImage from '../../images/apiIntro.svg';
import { ApiIntroModal } from './apiIntroModal';
import StructureManagerPlugin from '../../../../comms/public/js/api/structureManagerPlugin';
import EquipmentManagerPlugin from '../../../../comms/public/js/api/equipmentManagerPlugin';

export class ApiIntroPlugin extends Plugin {
    static {
        this.prototype.messageGroup = 'apiIntroPlugin';
        this.prototype.buttons = {
            dialog: class extends PluginButton {
                static {
                    this.prototype.id = 'api-intro-button';
                    this.prototype.titleMsg = 'apiIntro';
                    this.prototype.imgSrc = apiIntroImage;
                }
                action() {
                    this.owner.showModal();
                }
            }
        };
    }
    constructor(owner, options) {
        super(owner, options);
        this.structurePlugin = new StructureManagerPlugin(owner, options);
        this.equipmentPlugin = new EquipmentManagerPlugin(owner, options);
    }
    showModal() {
        this.renderRoot = renderReactNode(
            null,
            ApiIntroModal,
            {
                open: true,
                structurePlugin: this.structurePlugin,
                equipmentPlugin: this.equipmentPlugin
            },
            this.renderRoot
        );
    }
}
