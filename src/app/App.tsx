import React from 'react';
import sentry from 'proton-shared/lib/helpers/sentry';
import { ProtonApp } from 'react-components';

import * as config from './config';
import Setup from './Setup';

import './app.scss';

const enhancedConfig = {
    APP_VERSION_DISPLAY: '4.0.0-beta.2',
    ...config,
};

sentry(enhancedConfig);

const App = () => {
    return (
        <ProtonApp config={enhancedConfig}>
            <Setup />
        </ProtonApp>
    );
};

export default App;
