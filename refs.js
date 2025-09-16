import 'folder-picker/📁⛏️.js';
import 'be-enhancing/emc.js';

import 'data-props/emc.js';

//import 'do-inc/➕.js';
import 'do-invoke/🕹️.js';

import 'be-observing/🔭.js';

import 'per-each/emc.js';
import { regIsh } from 'mount-observer/refid/regIsh.js';
import 'be-switched/🎚️.js';

import { CompDirInfo } from '/Model/CompDirInfo/CompDirInfo.js';
regIsh(document.body, 'CompDirInfo', CompDirInfo);

import { CompFileInfo } from '/Model/CompFileInfo/CompFileInfo.js';
regIsh(document.body, 'CompFileInfo', CompFileInfo);

import { LRSync } from '/Model/LRSync/LRSync.js';
regIsh(document.body, 'LRSync', LRSync);

import { Scope } from 'trans-render/froop/Scope.js';
regIsh(document.body, 'Scope', Scope);

import '@material/web/icon/icon.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import '@material/web/menu/sub-menu.js';
import '@material/web/button/filled-button.js';

import {styles as typescaleStyles} from '@material/web/typography/md-typescale-styles.js';

document.adoptedStyleSheets.push(typescaleStyles.styleSheet);