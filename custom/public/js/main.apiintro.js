import myw from 'myWorld-client';
import '../../../comms/public/js/main.mywcom';
import '../../../comms/public/js/api/commsDsApi';

import ApiPalettePlugin from './ApiPalettePlugin/apiPalettePlugin';
import { ApiIntroPlugin } from './ApiIntro/apiIntroPlugin';

myw.localisation.loadModuleLocale('custom');

const desktopLayoutDef = myw.applicationDefinition.layouts.desktop;
const desktopToolbarButtons = desktopLayoutDef.controls.toolbar[1].buttons;
const plugins = myw.applicationDefinition.plugins;
plugins['apiPalette'] = [
    ApiPalettePlugin,
    {
        toolButtons: ['apiIntro.dialog']
    }
];

plugins['apiIntro'] = [
    ApiIntroPlugin,
    {
        toolButtons: []
    }
];
desktopToolbarButtons.push('apiPalette.toggle');
