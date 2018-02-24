import React from 'react';
import '../reset.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../index.css';

storiesOf('Test', module).add('Test 1', () => <div>Hello</div>);
