import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Decorator } from '@storybook/react';

import '@src/App.scss';
import { useHtmlFontSize } from '@src/components/hooks/useHtmlFontSize';
import { TftProvider } from '@src/state';

export const WithTftStore: Decorator = (Story) => {
  useHtmlFontSize();

  return (
    <div id="root">
      <DndProvider backend={HTML5Backend}>
        <TftProvider>{Story()}</TftProvider>
      </DndProvider>
    </div>
  );
};
