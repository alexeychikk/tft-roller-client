import { LocationProvider } from 'preact-iso';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Decorator } from '@storybook/preact';

import '@src/App.scss';
import { useHtmlFontSize } from '@src/components/hooks/useHtmlFontSize';
import { TftProvider } from '@src/state';

export const WithTftStore: Decorator = (Story) => {
  useHtmlFontSize();

  return (
    <div id="root">
      <LocationProvider>
        <DndProvider backend={HTML5Backend}>
          <TftProvider>{Story()}</TftProvider>
        </DndProvider>
      </LocationProvider>
    </div>
  );
};
